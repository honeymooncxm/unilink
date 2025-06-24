"use client";

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { user as initialUser, type User } from '@/lib/data';
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

const profileSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  description: z.string().min(10, "Description is too short"),
  email: z.string().email(),
  university: z.string().min(3, "University name is too short"),
  faculty: z.string().min(3, "Faculty name is too short"),
  course: z.coerce.number().min(1).max(7),
  group: z.string().min(2, "Group name is too short"),
});

const ProfileDetail = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
    </div>
);

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User>(initialUser);
  const { toast } = useToast();
  const { t } = useLanguage();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: user,
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
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
        {!isEditing && (
            <Button onClick={() => {
                form.reset(user);
                setIsEditing(true);
            }}>{t('profile.edit_button')}</Button>
        )}
      </div>

      <Card>
        {!isEditing ? (
            <div className="animate-in fade-in duration-300">
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
        ) : (
          <div className="animate-in fade-in duration-300">
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
          </div>
        )}
      </Card>
    </div>
  );
}
