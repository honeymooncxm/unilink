import { user, appointments } from '@/lib/data';
import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Newspaper } from 'lucide-react';
import { HomePageAppointmentCard } from '@/components/home-page-appointment-card';
import Image from 'next/image';

export default function Home() {
  const todayAppointments = appointments.slice(0, 3);

  return (
    <div className="container flex flex-col gap-8 animate-in fade-in duration-500 py-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Hello, <span className="font-bold">{user.name.split(' ')[0]}</span>
        </h1>
        <p className="text-muted-foreground">
          {user.description}
        </p>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Calendar className="size-5 text-primary" />
            Today's Schedule
          </h2>
          <Button variant="link" asChild className="text-primary">
            <Link href="/schedule">View All</Link>
          </Button>
        </div>
        <div className="space-y-4">
          {todayAppointments.map(app => (
            <HomePageAppointmentCard key={app.id} appointment={app} />
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          <Newspaper className="size-5 text-primary" />
          Latest News
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
