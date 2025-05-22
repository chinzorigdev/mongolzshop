import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AdminUserTable } from "../superadmin/components/admin-user-table";

export const metadata: Metadata = {
  title: "Админ хэрэглэгчид",
  description: "Mongolz Shop админ хэрэглэгчдийн жагсаалт",
};

// Админ хэрэглэгчийн интерфейс
interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: "admin" | "superadmin";
  createdAt: string;
}

export default async function AdminUsersPage() {
  // Сервер талд API хүсэлт илгээх
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/users`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  let adminUsers: AdminUser[] = [];
  if (response.ok) {
    const data = await response.json();
    adminUsers = data.users.map((user: any) => ({
      id: user.id || user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: new Date(user.createdAt).toLocaleDateString("mn-MN"),
    }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Админ хэрэглэгчид</h1>
        <p className="text-muted-foreground">
          Системд бүртгэлтэй бүх админ эрхтэй хэрэглэгчид
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Админ хэрэглэгчид</CardTitle>
          <CardDescription>Жагсаалт</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminUserTable users={adminUsers} />
        </CardContent>
      </Card>
    </div>
  );
}
