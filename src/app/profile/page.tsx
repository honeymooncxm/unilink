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

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: user,
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    setUser(values);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your information has been successfully saved.",
    });
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">Your personal and academic information.</p>
        </div>
        {!isEditing && (
            <Button onClick={() => {
                form.reset(user);
                setIsEditing(true);
            }}>Edit Profile</Button>
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
                        <ProfileDetail label="Email Address" value={user.email} />
                        <ProfileDetail label="University" value={user.university} />
                        <ProfileDetail label="Faculty" value={user.faculty} />
                        <ProfileDetail label="Course" value={user.course} />
                        <ProfileDetail label="Group" value={user.group} />
                    </div>
                </CardContent>
            </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardHeader>
                      <CardTitle>Edit Profile</CardTitle>
                      <CardDescription>Update your personal and academic information.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
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
                          <FormLabel>Email Address</FormLabel>
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
                          <FormLabel>Description</FormLabel>
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
                            <FormLabel>University</FormLabel>
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
                            <FormLabel>Faculty</FormLabel>
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
                            <FormLabel>Course</FormLabel>
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
                            <FormLabel>Group</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end gap-2">
                      <Button variant="ghost" type="button" onClick={() => setIsEditing(false)}>Cancel</Button>
                      <Button type="submit">Save Changes</Button>
                  </CardFooter>
              </form>
            </Form>
          </div>
        )}
      </Card>
    </div>
  );
}
