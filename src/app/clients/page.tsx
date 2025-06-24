"use client";

import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlusCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { ClientCard } from "@/components/client-card";
import { type Client } from "@/lib/types";
import { getClients, addClient } from "@/lib/services";
import { useLanguage } from "@/context/language-context";
import { Skeleton } from "@/components/ui/skeleton";

const getClientSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, { message: t('zod.client.name.min') }),
  email: z.string().email({ message: t('zod.client.email.invalid') }),
  university: z.string().min(3, { message: t('zod.client.university.min') }),
});

const ClientCardSkeleton = () => (
  <div className="p-4 border rounded-lg space-y-3">
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-6 w-32" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  </div>
);

export default function ClientsPage() {
  const { t } = useLanguage();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function loadClients() {
      setLoading(true);
      const clientData = await getClients();
      setClients(clientData);
      setLoading(false);
    }
    loadClients();
  }, []);

  const clientSchema = useMemo(() => getClientSchema(t), [t]);

  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      email: "",
      university: "",
    },
  });

  async function onSubmit(values: z.infer<typeof clientSchema>) {
    const newClientData = {
      ...values,
      avatarUrl: `https://i.pravatar.cc/150?u=${values.email}`,
    };
    const newId = await addClient(newClientData);
    setClients((prevClients) => [...prevClients, { id: newId, ...newClientData }]);
    form.reset();
    setIsDialogOpen(false);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('clients.page_title')}</h1>
          <p className="text-muted-foreground">
            {t('clients.page_description')}
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t('clients.add_client')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('dialog.client.add_title')}</DialogTitle>
              <DialogDescription>
                {t('dialog.client.add_description')}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('dialog.client.name_label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('dialog.client.name_placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('dialog.client.email_label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('dialog.client.email_placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="university"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('dialog.client.university_label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('dialog.client.university_placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">{t('dialog.client.save_button')}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({length: 3}).map((_, i) => <ClientCardSkeleton key={i} />)}
        </div>
      ) : clients.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-8">
            <div className="flex flex-col items-center gap-2 text-center py-20">
                <Users className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-2xl font-bold tracking-tight">
                    {t('clients.no_clients_title')}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {t('clients.no_clients_description')}
                </p>
            </div>
        </div>
      )}
    </div>
  );
}
