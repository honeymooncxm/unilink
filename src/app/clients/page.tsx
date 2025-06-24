import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function ClientsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <p className="text-muted-foreground">
          Manage client profiles and information.
        </p>
      </div>
      <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-2 text-center py-20">
            <Users className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight">
                Client Management Coming Soon
            </h3>
            <p className="text-sm text-muted-foreground">
                This section is under construction.
            </p>
        </div>
      </Card>
    </div>
  );
}
