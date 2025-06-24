"use client";

import { useState, useMemo } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge";
import { appointments as initialAppointments, type Appointment } from '@/lib/data';
import { Calendar, Clock, MapPin, Plus, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const appointmentSchema = z.object({
  course: z.string().min(2, "Course name is too short"),
  professor: z.string().min(2, "Professor name is too short"),
  room: z.string().min(1, "Room is required"),
  day: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
  type: z.enum(["Lecture", "Seminar", "Lab"]),
});

export default function SchedulePage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      course: "",
      professor: "",
      room: "",
      day: "Monday",
      startTime: "09:00",
      endTime: "10:30",
      type: "Lecture",
    },
  });

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((appointment) => appointment.day === selectedDay)
      .sort((a, b) => a.timeRange.localeCompare(b.timeRange));
  }, [appointments, selectedDay]);

  function onSubmit(values: z.infer<typeof appointmentSchema>) {
    const newAppointment: Appointment = {
      id: appointments.length + 1,
      day: values.day,
      timeRange: `${values.startTime} - ${values.endTime}`,
      course: values.course,
      professor: values.professor,
      room: values.room,
      type: values.type,
    };
    setAppointments((prev) => [...prev, newAppointment]);
    form.reset({ ...values, course: '', professor: '', room: '' });
    setIsDialogOpen(false);
  }

  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Schedule</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Appointment</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new appointment to your schedule.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <FormControl><Input placeholder="e.g. Introduction to AI" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="professor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professor</FormLabel>
                      <FormControl><Input placeholder="e.g. Dr. Alan Turing" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="room"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room / Lab</FormLabel>
                      <FormControl><Input placeholder="e.g. Room 305" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl><Input type="time" className="text-center" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl><Input type="time" className="text-center" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                   <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Day</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select a day" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {daysOfWeek.map(day => <SelectItem key={day} value={day}>{day}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select a type" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Lecture">Lecture</SelectItem>
                            <SelectItem value="Seminar">Seminar</SelectItem>
                            <SelectItem value="Lab">Lab</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Add Appointment</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
        {daysOfWeek.map(day => (
          <Button 
            key={day} 
            variant={selectedDay === day ? "default" : "ghost"}
            onClick={() => setSelectedDay(day)}
            className="shrink-0"
          >
            {day}
          </Button>
        ))}
      </div>
      
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          <Calendar className="size-5" /> {selectedDay}
        </h2>
        <div className="space-y-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(appointment => {
              const [startTime, endTime] = appointment.timeRange.split(' - ');
              return (
                <Card key={appointment.id} className="transition-colors duration-300">
                  <CardContent className="p-3 flex gap-3">
                    <div className="flex flex-col items-center justify-center text-center w-20 shrink-0">
                      <p className="font-semibold text-sm">{startTime}</p>
                      <p className="text-muted-foreground my-1">-</p>
                      <p className="font-semibold text-sm">{endTime}</p>
                    </div>
                    <div className="border-l border-border/80 h-auto"></div>
                    <div className="flex-grow flex justify-between items-center">
                        <div className="space-y-1">
                            <h3 className="font-bold text-base leading-tight">{appointment.course}</h3>
                            <div className="text-muted-foreground text-xs flex items-center gap-4">
                                <span className="flex items-center gap-1.5"><MapPin size={14} />{appointment.room}</span>
                                <span className="flex items-center gap-1.5"><Clock size={14} />{appointment.timeRange}</span>
                            </div>
                            <div className="text-sm flex items-center gap-1.5 pt-1">
                                <User size={14} className="text-muted-foreground"/>
                                <span>{appointment.professor}</span>
                            </div>
                        </div>
                        <Badge className={cn(
                          "text-xs font-bold self-start",
                          { "bg-primary/90 text-primary-foreground": appointment.type === 'Lecture' },
                          { "bg-amber-400 text-amber-950 hover:bg-amber-400/80": appointment.type === 'Lab' },
                          { "bg-sky-400 text-sky-950 hover:bg-sky-400/80": appointment.type === 'Seminar' }
                        )}>
                          {appointment.type}
                        </Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          ) : (
             <div className="text-center py-20 rounded-lg border border-dashed">
                <p className="text-muted-foreground">No appointments for {selectedDay}.</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
