import { user } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.name}!</h1>
          <p className="text-muted-foreground">
            Have a productive day. Here's what's on your schedule.
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>About Me</CardTitle>
          <CardDescription>A brief introduction.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80">{user.description}</p>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quick Overview</h2>
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>Faculty</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{user.faculty}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Course</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{user.course}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Group</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{user.group}</p>
                </CardContent>
            </Card>
        </div>
      </div>

    </div>
  );
}
