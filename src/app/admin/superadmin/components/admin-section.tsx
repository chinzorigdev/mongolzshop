"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminUserTable } from "./admin-user-table";
import { ChangePasswordCard } from "./change-password-card";
import Link from "next/link";

// Админ хэрэглэгчийн интерфейс
interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: "admin" | "superadmin";
  createdAt: string;
}

interface AdminUserSectionProps {
  initialUsers: AdminUser[];
}

export function AdminSection({ initialUsers }: AdminUserSectionProps) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);

  return (
    <div className="space-y-6">
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
          <AdminUserTable users={users} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Систем тохиргоо</CardTitle>
          <CardDescription>Систем хэмжээний тохиргоонууд</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
