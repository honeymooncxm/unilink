import { user } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileDetail = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
    </div>
);

export default function ProfilePage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">Your personal and academic information.</p>
        </div>

        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                 <Avatar className="h-24 w-24">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-2xl">{user.name}</CardTitle>
                    <CardDescription>{user.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                    <ProfileDetail label="Email Address" value={user.email} />
                    <ProfileDetail label="University" value={user.university} />
                    <ProfileDetail label="Faculty" value={user.faculty} />
                    <ProfileDetail label="Course" value={user.course} />
                    <ProfileDetail label="Group" value={user.group} />
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
