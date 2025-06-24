"use client";

import { useState, useMemo, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type User } from '@/lib/types';
import { getUserProfile, updateUserProfile } from '@/lib/services';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/language-context';
import { Skeleton } from '@/components/ui/skeleton';

const getProfileSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, { message: t('zod.profile.name.min') }),
  description: z.string().min(10, { message: t('zod.profile.description.min') }),
  email: z.string().email({ message: t('zod.profile.email.invalid') }),
  university: z.string().min(3, { message: t('zod.profile.university.min') }),
  faculty: z.string().min(3, { message: t('zod.profile.faculty.min') }),
  course: z.coerce.number().min(1, { message: t('zod.profile.course.min') }).max(7, { message: t('zod.profile.course.max') }),
  group: z.string().min(2, { message: t('zod.profile.group.min') }),
});


const ProfileDetail = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
    </div>
);

const ProfilePageSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center gap-4">
      <Skeleton className="h-24 w-24 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-5 w-64" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-7 w-40" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const profileSchema = useMemo(() => getProfileSchema(t), [t]);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    async function loadUser() {
      const userData = await getUserProfile();
      setUser(userData);
      form.reset(userData);
    }
    loadUser();
  }, [form]);

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    await updateUserProfile(values);
    setUser(values);
    setIsEditing(false);
    toast({
      title: t('profile.update_toast_title'),
      description: t('profile.update_toast_description'),
    });
  }

  return (
    <div className="container py-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('profile.page_title')}</h1>
            <p className="text-muted-foreground">{t('profile.page_description')}</p>
        </div>
        {!isEditing && user && (
            <Button onClick={() => {
                form.reset(user);
                setIsEditing(true);
            }}>{t('profile.edit_button')}</Button>
        )}
      </div>

      {!user ? (
        <ProfilePageSkeleton />
      ) : !isEditing ? (
        <Card className="animate-in fade-in duration-300">
            <div>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-2xl">{user.name}</CardTitle>
                        <CardDescription>{user.description}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        <ProfileDetail label={t('profile.email_label')} value={user.email} />
                        <ProfileDetail label={t('profile.university_label')} value={user.university} />
                        <ProfileDetail label={t('profile.faculty_label')} value={user.faculty} />
                        <ProfileDetail label={t('profile.course_label')} value={user.course} />
                        <ProfileDetail label={t('profile.group_label')} value={user.group} />
                    </div>
                </CardContent>
            </div>
        </Card>
        ) : (
          <Card className="animate-in fade-in duration-300">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardHeader>
                      <CardTitle>{t('profile.edit_title')}</CardTitle>
                      <CardDescription>{t('profile.edit_description')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('profile.name_label')}</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('profile.email_label')}</FormLabel>
                          <FormControl><Input type="email" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('profile.description_label')}</FormLabel>
                          <FormControl><Textarea {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="university"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('profile.university_label')}</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="faculty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('profile.faculty_label')}</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="course"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('profile.course_label')}</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="group"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('profile.group_label')}</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end gap-2">
                      <Button variant="ghost" type="button" onClick={() => setIsEditing(false)}>{t('profile.cancel_button')}</Button>
                      <Button type="submit">{t('profile.save_button')}</Button>
                  </CardFooter>
              </form>
            </Form>
          </Card>
        )}
    </div>
  );
}
