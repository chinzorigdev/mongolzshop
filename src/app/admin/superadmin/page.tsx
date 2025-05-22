import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdminUserTable } from "./components/admin-user-table";
import { ChangePasswordCard } from "./components/change-password-card";

export const metadata: Metadata = {
  title: "Супер Админ",
  description: "Mongolz Shop супер админ удирдлага",
};

// Админ хэрэглэгчийн интерфейс
interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: "admin" | "superadmin";
  createdAt: string;
}

export default async function SuperAdminPage() {
  // Сервер талд API хүсэлт илгээх
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/users`,
    {
      cache: "no-store", // SSR-д dynamic data авахын тулд
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  let adminUsers: AdminUser[] = [];

  if (response.ok) {
    const data = await response.json();
    adminUsers = data.users.map(
      (user: {
        id: string;
        _id: string;
        username: string;
        email: string;
        role: "admin" | "superadmin";
        createdAt: string;
      }) => ({
        id: user.id || user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: new Date(user.createdAt).toLocaleDateString("mn-MN"),
      })
    );
  } else {
    console.error("Админ хэрэглэгчдийн жагсаалт авах үед алдаа гарлаа");
    // Алдаа гарсан тохиолдолд хоосон массив үлдээх
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Супер Админ</h1>
        <p className="text-muted-foreground">
          Админ хэрэглэгчдийг удирдах хэсэг
        </p>
      </div>{" "}
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/admin/superadmin/add-admin">Шинэ админ нэмэх</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Админ хэрэглэгчид</CardTitle>
          <CardDescription>
            Системд бүртгэлтэй бүх админ эрхтэй хэрэглэгчид
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Client-side component ашиглах */}
          <AdminUserTable users={adminUsers} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Систем тохиргоо</CardTitle>
          <CardDescription>Систем хэмжээний тохиргоонууд</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {" "}
          <ChangePasswordCard />
          <div className="border rounded-md p-4">
            <h3 className="font-medium">Системийн лог</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Системийн үйл ажиллагааны бүртгэл
            </p>
            <Button variant="outline" className="mt-4">
              Логийг харах
            </Button>
          </div>
          <div className="border rounded-md p-4">
            <h3 className="font-medium">Өгөгдлийн санг нөөцлөх</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Өгөгдлийн санг нөөцлөх, сэргээх
            </p>
            <div className="flex gap-2 mt-4">
              <Button variant="outline">Нөөцлөх</Button>
              <Button variant="outline">Сэргээх</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
