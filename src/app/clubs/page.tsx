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
import { ClubCard } from "@/components/club-card";
import { type Club } from "@/lib/types";
import { getClubs, addClub } from "@/lib/services";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/language-context";
import { Skeleton } from "@/components/ui/skeleton";

const getClubSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, { message: t('zod.club.name.min') }),
  description: z.string().min(10, { message: t('zod.club.description.min') }),
});

const ClubCardSkeleton = () => (
  <div className="p-4 border rounded-lg space-y-3">
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-6 w-32" />
    </div>
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
)

export default function ClubsPage() {
  const { t } = useLanguage();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function loadClubs() {
      setLoading(true);
      const clubsData = await getClubs();
      setClubs(clubsData);
      setLoading(false);
    }
    loadClubs();
  }, []);

  const clubSchema = useMemo(() => getClubSchema(t), [t]);

  const form = useForm<z.infer<typeof clubSchema>>({
    resolver: zodResolver(clubSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof clubSchema>) {
    const newClubData = {
      ...values,
      avatarUrl: `https://placehold.co/150x150.png`,
    };
    const newId = await addClub(newClubData);
    setClubs((prevClubs) => [...prevClubs, {id: newId, ...newClubData}]);
    form.reset();
    setIsDialogOpen(false);
  }

  return (
    <div className="container py-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('clubs.page_title')}</h1>
          <p className="text-muted-foreground">
            {t('clubs.page_description')}
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t('clubs.add_club')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('dialog.club.add_title')}</DialogTitle>
              <DialogDescription>
                {t('dialog.club.add_description')}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('dialog.club.name_label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('dialog.club.name_placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('dialog.club.description_label')}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t('dialog.club.description_placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">{t('dialog.club.save_button')}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({length: 3}).map((_, i) => <ClubCardSkeleton key={i} />)}
        </div>
      ) : clubs.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-8">
            <div className="flex flex-col items-center gap-2 text-center py-20">
                <Users className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-2xl font-bold tracking-tight">
                    {t('clubs.no_clubs_title')}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {t('clubs.no_clubs_description')}
                </p>
            </div>
        </div>
      )}
    </div>
  );
}
