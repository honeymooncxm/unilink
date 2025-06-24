import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Client } from "@/lib/data";
import { Mail, School } from "lucide-react";

type ClientCardProps = {
  client: Client;
};

export function ClientCard({ client }: ClientCardProps) {
  return (
    <Card className="hover:border-primary/50 transition-colors duration-300 animate-in fade-in zoom-in-95">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={client.avatarUrl} alt={client.name} />
          <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{client.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Mail className="size-4" />
          <span>{client.email}</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <School className="size-4" />
          <span>{client.university}</span>
        </div>
      </CardContent>
    </Card>
  );
}
