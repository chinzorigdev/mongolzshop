"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditAdminPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Хэрэглэгчийн мэдээлэл авах
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/admin/users/${id}`);
        if (!response.ok) {
          throw new Error("Хэрэглэгчийн мэдээлэл авах үед алдаа гарлаа");
        }

        const data = await response.json();
        setFormData({
          ...formData,
          username: data.user.username,
          email: data.user.email,
          role: data.user.role,
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        setError("Хэрэглэгчийн мэдээлэл авах үед алдаа гарлаа");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  // Form өөрчлөлтийг хянах
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Select өөрчлөлтийг хянах
  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  // Form илгээх
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Нууц үг шалгалт (хэрэв нууц үг оруулсан бол)
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Нууц үг таарахгүй байна");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          role: formData.role,
          ...(formData.password ? { password: formData.password } : {}),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Админ шинэчлэх үед алдаа гарлаа");
      }

      // Амжилттай бол жагсаалт руу буцах
      router.push("/admin/superadmin");
      router.refresh(); // UI шинэчлэх
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Мэдээлэл ачаалж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Админ засах</h1>
        <p className="text-muted-foreground">
          Админ эрхтэй хэрэглэгчийн мэдээллийг шинэчлэх
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Админ мэдээлэл</CardTitle>
            <CardDescription>
              Админ хэрэглэгчийн мэдээллийг шинэчлэнэ үү
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-white bg-destructive rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Хэрэглэгчийн нэр</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Имэйл</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Шинэ нууц үг (заавал биш)</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              <p className="text-xs text-muted-foreground">
                Хоосон үлдээвэл хуучин нууц үг хэвээр үлдэнэ
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Нууц үг давтах</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Эрх</Label>
              <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Эрх сонгох" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Админ</SelectItem>
                  <SelectItem value="superadmin">Супер админ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/superadmin")}
            >
              Буцах
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Хадгалж байна..." : "Хадгалах"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
