import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Club } from "@/lib/data";

type ClubCardProps = {
  club: Club;
};

export function ClubCard({ club }: ClubCardProps) {
  return (
    <Card className="hover:border-primary/50 transition-colors duration-300 animate-in fade-in zoom-in-95">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={club.avatarUrl} alt={club.name} data-ai-hint="club logo" />
          <AvatarFallback>{club.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{club.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
          <CardDescription>{club.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
