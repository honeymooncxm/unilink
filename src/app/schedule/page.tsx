"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { AppointmentCard } from '@/components/appointment-card';
import { appointments as allAppointments } from '@/lib/data';
import { Search } from 'lucide-react';

export default function SchedulePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAppointments = useMemo(() => {
    if (!searchTerm) {
      return allAppointments;
    }
    return allAppointments.filter(
      (appointment) =>
        appointment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.professor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="container py-6 flex flex-col gap-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Schedule</h1>
        <p className="text-muted-foreground">
          View and manage your upcoming appointments.
        </p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by course or professor..."
          className="w-full pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment, index) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No appointments found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
