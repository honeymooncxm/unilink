import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Appointment } from "@/lib/data";
import { Clock, BookOpen, User, MapPin } from "lucide-react";

type AppointmentCardProps = {
  appointment: Appointment;
};

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <Card className="flex flex-col h-full hover:border-primary/50 transition-colors duration-300 animate-in fade-in zoom-in-95">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                 <CardTitle className="text-lg">{appointment.course}</CardTitle>
                 <CardDescription className="flex items-center gap-2 pt-1">
                    <Clock className="size-4" /> {appointment.timeRange}
                </CardDescription>
            </div>
            <Badge variant={appointment.type === 'Lecture' ? 'default' : 'secondary'}>
                {appointment.type}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end gap-3 text-sm">
        <div className="flex items-center gap-3 text-muted-foreground">
          <User className="size-4" />
          <span>{appointment.professor}</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <MapPin className="size-4" />
          <span>{appointment.room}</span>
        </div>
      </CardContent>
    </Card>
  );
}
