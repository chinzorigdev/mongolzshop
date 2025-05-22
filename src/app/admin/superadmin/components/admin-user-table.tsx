"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

// Админ хэрэглэгчийн интерфейс
interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: "admin" | "superadmin";
  createdAt: string;
}

interface AdminUserTableProps {
  users: AdminUser[];
}

export function AdminUserTable({ users }: AdminUserTableProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async (userId: string) => {
    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Хэрэглэгч устгах үед алдаа гарлаа");
      }

      // Амжилттай устгасны дараа хуудсыг дахин ачаалах
      router.refresh();
    } catch (error: any) {
      setError(error.message);
      console.error("Хэрэглэгч устгах үед алдаа гарлаа:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Хэрэглэгчийн нэр</TableHead>
          <TableHead>Имэйл</TableHead>
          <TableHead>Эрх</TableHead>
          <TableHead>Бүртгүүлсэн огноо</TableHead>
          <TableHead className="text-right">Үйлдэл</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  user.role === "superadmin"
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary/50 text-secondary-foreground"
                }`}
              >
                {user.role === "superadmin" ? "Супер админ" : "Админ"}
              </span>
            </TableCell>
            <TableCell>{user.createdAt}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    router.push(`/admin/superadmin/edit-admin/${user.id}`)
                  }
                >
                  Засах
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      Устгах
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Админ хэрэглэгч устгах
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Та {user.username} нэртэй админ хэрэглэгчийг устгахдаа
                        итгэлтэй байна уу? Энэ үйлдлийг буцаах боломжгүй.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    {error && (
                      <div className="p-3 text-sm text-white bg-destructive rounded-md mb-4">
                        {error}
                      </div>
                    )}
                    <AlertDialogFooter>
                      <AlertDialogCancel>Цуцлах</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground"
                        onClick={() => handleDelete(user.id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Устгаж байна..." : "Устгах"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
