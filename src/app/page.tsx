"use client";

import { user, appointments } from '@/lib/data';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Newspaper } from 'lucide-react';
import { HomePageAppointmentCard } from '@/components/home-page-appointment-card';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';

export default function Home() {
  const { t } = useLanguage();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = daysOfWeek[new Date().getDay()];
  const todayAppointments = appointments.filter(app => app.day === currentDayName);

  return (
    <div className="container flex flex-col gap-8 animate-in fade-in duration-500 py-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t('home.greeting')}{' '}
          <span className="font-bold">{user.name.split(' ')[0]}</span>
        </h1>
        <p className="text-muted-foreground">
          {t('home.user.description')}
        </p>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Calendar className="size-5 text-primary" />
            {t('home.schedule.title')}
          </h2>
          <Button variant="link" asChild className="text-primary">
            <Link href="/schedule">{t('home.schedule.view_all')}</Link>
          </Button>
        </div>
        <div className="space-y-4">
          {todayAppointments.length > 0 ? (
            todayAppointments.map(app => (
              <HomePageAppointmentCard key={app.id} appointment={app} />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                <Calendar className="size-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold">{t('home.schedule.empty_title')}</h3>
                <p className="text-muted-foreground">{t('home.schedule.empty_text')}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          <Newspaper className="size-5 text-primary" />
          {t('home.news.title')}
        </h2>
        <Card className="overflow-hidden rounded-lg">
          <Image 
            src="https://placehold.co/600x250.png"
            alt="University campus"
            width={600}
            height={250}
            className="w-full h-auto object-cover"
            data-ai-hint="university campus building"
          />
        </Card>
      </section>
    </div>
  );
}
