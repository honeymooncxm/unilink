"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { type Appointment } from '@/lib/types';
import { getAppointments, addAppointment, updateAppointment, deleteAppointment } from '@/lib/services';
import { Calendar, Clock, MapPin, Plus, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/language-context';
import { Skeleton } from '@/components/ui/skeleton';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const getAppointmentSchema = (t: (key: string) => string) => z.object({
  course: z.string().min(2, { message: t('zod.course.min') }),
  professor: z.string().min(2, { message: t('zod.professor.min') }),
  room: z.string().min(1, { message: t('zod.room.min') }),
  day: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: t('zod.time.invalid') }),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: t('zod.time.invalid') }),
  type: z.enum(["Lecture", "Seminar", "Lab"]),
});

const defaultFormValues = {
  course: "",
  professor: "",
  room: "",
  day: "Monday" as const,
  startTime: "09:00",
  endTime: "10:30",
  type: "Lecture" as const,
};

export default function SchedulePage() {
  const { t } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [deletingAppointmentId, setDeletingAppointmentId] = useState<string | null>(null);

  const dayNameMap: { [key: string]: string } = useMemo(() => ({
    Monday: t('schedule.day.monday'), Tuesday: t('schedule.day.tuesday'), Wednesday: t('schedule.day.wednesday'),
    Thursday: t('schedule.day.thursday'), Friday: t('schedule.day.friday'), Saturday: t('schedule.day.saturday'), Sunday: t('schedule.day.sunday'),
  }), [t]);
  const dayAbbrMap: { [key: string]: string } = useMemo(() => ({
    Monday: t('schedule.day.monday_abbr'), Tuesday: t('schedule.day.tuesday_abbr'), Wednesday: t('schedule.day.wednesday_abbr'),
    Thursday: t('schedule.day.thursday_abbr'), Friday: t('schedule.day.friday_abbr'), Saturday: t('schedule.day.saturday_abbr'), Sunday: t('schedule.day.sunday_abbr'),
  }), [t]);
  const typeMap: { [key: string]: string } = useMemo(() => ({ Lecture: t('schedule.type.lecture'), Seminar: t('schedule.type.seminar'), Lab: t('schedule.type.lab') }), [t]);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    const data = await getAppointments();
    setAppointments(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  useEffect(() => {
    const jsDayIndex = new Date().getDay();
    const appDayIndex = jsDayIndex === 0 ? 6 : jsDayIndex - 1;
    if (appDayIndex < daysOfWeek.length) {
      setSelectedDay(daysOfWeek[appDayIndex]);
    }
  }, []);

  const isEditing = !!editingAppointment;
  const appointmentSchema = useMemo(() => getAppointmentSchema(t), [t]);
  const form = useForm<z.infer<typeof appointmentSchema>>({ resolver: zodResolver(appointmentSchema), defaultValues: defaultFormValues });

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((appointment) => appointment.day === selectedDay)
      .sort((a, b) => a.timeRange.localeCompare(b.timeRange));
  }, [appointments, selectedDay]);

  function handleEditClick(appointment: Appointment) {
    setEditingAppointment(appointment);
    const [startTime = "09:00", endTime = "10:30"] = appointment.timeRange.split(" - ");
    form.reset({
      ...appointment,
      startTime: appointment.startTime || startTime,
      endTime: appointment.endTime || endTime,
    } as z.infer<typeof appointmentSchema>);
    setIsDialogOpen(true);
  }

  function handleDeleteClick(appointment: Appointment) {
    setDeletingAppointmentId(appointment.id);
    setIsDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (deletingAppointmentId) {
      await deleteAppointment(deletingAppointmentId);
      await fetchAppointments();
      setDeletingAppointmentId(null);
    }
    setIsDeleteDialogOpen(false);
  }

  async function onSubmit(values: z.infer<typeof appointmentSchema>) {
    const appointmentData: Appointment = {
      id: editingAppointment ? editingAppointment.id : crypto.randomUUID(),
      course: values.course,
      professor: values.professor,
      room: values.room,
      day: values.day,
      startTime: values.startTime,
      endTime: values.endTime,
      timeRange: `${values.startTime} - ${values.endTime}`,
      type: values.type,
    };

    if (editingAppointment) {
      await updateAppointment(editingAppointment.id, appointmentData);
    } else {
      const { id, ...addData } = appointmentData;
      await addAppointment(addData);
    }

    await fetchAppointments();
    setIsDialogOpen(false);
    setEditingAppointment(null);
    form.reset(defaultFormValues);
  }

  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('schedule.page_title')}</h1>
        <Button onClick={() => { setEditingAppointment(null); form.reset(defaultFormValues); setIsDialogOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" /> {t('schedule.add_appointment')}
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) { setEditingAppointment(null); form.reset(defaultFormValues); } }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? t('dialog.appointment.edit_title') : t('dialog.appointment.add_title')}</DialogTitle>
            <DialogDescription>{isEditing ? t('dialog.appointment.edit_description') : t('dialog.appointment.add_description')}</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField control={form.control} name="course" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('dialog.appointment.course_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('dialog.appointment.course_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="professor" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('dialog.appointment.professor_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('dialog.appointment.professor_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="room" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('dialog.appointment.room_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('dialog.appointment.room_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="startTime" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('dialog.appointment.start_time_label')}</FormLabel>
                    <FormControl>
                      <Input type="time" className="text-center" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="endTime" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('dialog.appointment.end_time_label')}</FormLabel>
                    <FormControl>
                      <Input type="time" className="text-center" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="day" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('dialog.appointment.day_label')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('dialog.appointment.day_placeholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {daysOfWeek.map(day => (
                          <SelectItem key={day} value={day}>{dayNameMap[day]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="type" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('dialog.appointment.type_label')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('dialog.appointment.type_placeholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Lecture">{typeMap['Lecture']}</SelectItem>
                        <SelectItem value="Seminar">{typeMap['Seminar']}</SelectItem>
                        <SelectItem value="Lab">{typeMap['Lab']}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <DialogFooter>
                <Button type="submit">{isEditing ? t('dialog.appointment.save_button') : t('dialog.appointment.add_button')}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={cn(
              "rounded-full py-2 text-center text-xs font-semibold transition-colors",
              selectedDay === day ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {dayAbbrMap[day]}
          </button>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          <Calendar className="size-5" /> {dayNameMap[selectedDay]}
        </h2>
        <div className="space-y-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-lg" />
            ))
          ) : filteredAppointments.length > 0 ? (
            filteredAppointments.map(appointment => (
              <Card key={appointment.id} className="transition-colors duration-300">
                <CardContent className="p-3 flex gap-3">
                  <div className="flex flex-col items-center justify-center text-center w-16 shrink-0">
                    <p className="font-semibold text-sm">{appointment.timeRange.split(' - ')[0]}</p>
                    <div className="h-px w-4 bg-border my-1"></div>
                    <p className="font-semibold text-sm">{appointment.timeRange.split(' - ')[1]}</p>
                  </div>
                  <div className="border-l border-border/80 h-auto self-stretch"></div>
                  <div className="flex-grow flex justify-between items-start gap-2">
                    <div className="space-y-1.5 flex-grow overflow-hidden">
                      <h3 className="font-bold text-base leading-tight truncate">{appointment.course}</h3>
                      <div className="text-muted-foreground text-xs flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} />{appointment.room}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} />{appointment.timeRange}
                        </span>
                      </div>
                      <div className="text-sm pt-1">
                        <span>{appointment.professor}</span>
                      </div>
                    </div>
                    <div className='flex items-center shrink-0'>
                      <Badge
                        className={cn(
                          "text-xs font-semibold",
                          {
                            "bg-primary/90 text-primary-foreground": appointment.type === 'Lecture',
                            "bg-amber-400 text-amber-950 hover:bg-amber-400/80": appointment.type === 'Lab',
                            "bg-sky-400 text-sky-950 hover:bg-sky-400/80": appointment.type === 'Seminar',
                          }
                        )}
                      >
                        {typeMap[appointment.type]}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 -mr-2">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditClick(appointment)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>{t('schedule.edit')}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClick(appointment)} className="text-destructive focus:text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>{t('schedule.delete')}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-20 rounded-lg border border-dashed">
              <p className="text-muted-foreground">{t('schedule.empty_text')} {dayNameMap[selectedDay]?.toLowerCase()}.</p>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('dialog.delete.title')}</AlertDialogTitle>
            <AlertDialogDescription>{t('dialog.delete.description')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('dialog.delete.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className={buttonVariants({ variant: "destructive" })}>
              {t('dialog.delete.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
