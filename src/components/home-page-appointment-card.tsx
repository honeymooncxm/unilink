import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Appointment } from "@/lib/data";
import { Clock, MapPin, User } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useMemo } from "react";

type HomePageAppointmentCardProps = {
  appointment: Appointment;
};

export function HomePageAppointmentCard({ appointment }: HomePageAppointmentCardProps) {
  const [startTime, endTime] = appointment.timeRange.split(' - ');
  const { t } = useLanguage();

  const typeMap: { [key: string]: string } = useMemo(() => ({
    Lecture: t('schedule.type.lecture'),
    Seminar: t('schedule.type.seminar'),
    Lab: t('schedule.type.lab'),
  }), [t]);

  return (
    <Card className="hover:border-primary/50 transition-colors duration-300">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="flex flex-col items-center justify-center text-center w-16 shrink-0">
          <p className="font-semibold text-sm">{startTime}</p>
          <div className="h-1 w-px bg-border my-1"></div>
          <p className="font-semibold text-sm">{endTime}</p>
        </div>
        <div className="w-px self-stretch bg-border mx-2"></div>
        <div className="flex-grow space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-bold">{appointment.course}</h3>
            <Badge variant={appointment.type === 'Lecture' ? 'default' : 'secondary'} className="bg-primary/80 text-primary-foreground">
                {typeMap[appointment.type]}
            </Badge>
          </div>
          <div className="text-muted-foreground text-xs space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="size-3" />
              <span>{appointment.room}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-3" />
              <span>{appointment.timeRange}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="size-3" />
              <span>{appointment.professor}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
