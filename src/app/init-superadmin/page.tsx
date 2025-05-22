"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InitSuperAdminPage() {
  const [secretKey, setSecretKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [superAdminExists, setSuperAdminExists] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    user?: { username: string; email: string; role: string };
  } | null>(null);
  const router = useRouter();

  // Шалгах нь супер админ бүртгэлтэй эсэх
  useEffect(() => {
    async function checkSuperAdmin() {
      try {
        const response = await fetch("/api/seed/superadmin/check", {
          method: "GET",
        });

        const data = await response.json();

        if (response.ok && data.exists) {
          setSuperAdminExists(true);
        }
      } catch (error) {
        console.error("Супер админ шалгах үед алдаа гарлаа:", error);
      }
    }

    checkSuperAdmin();
  }, []);

  const handleCreateSuperAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/seed/superadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secretKey }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message,
          user: data.user,
        });
      } else {
        setResult({
          success: false,
          message: data.message || "Супер админ үүсгэх үед алдаа гарлаа",
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Системийн алдаа гарлаа. Дахин оролдоно уу.",
      });
      console.error("Супер админ үүсгэх үед алдаа гарлаа:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto py-10 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Анхны Супер Админ Үүсгэх</CardTitle>
          <CardDescription>
            Системд анхны супер админ эрхтэй хэрэглэгч үүсгэх. Энэ хуудас зөвхөн
            нэг удаа ашиглагдана.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {superAdminExists ? (
            <div className="p-4 mb-4 rounded-md bg-yellow-100 text-yellow-800">
              <p className="font-medium">
                Супер админ хэрэглэгч аль хэдийн үүссэн байна!
              </p>{" "}
              <p className="mt-2 text-sm">
                Аюулгүй байдлын үүднээс энэ хуудсыг дахин ашиглах боломжгүй.
                Хэрэв та нууц үгээ мартсан бол системийн хөгжүүлэгчтэй
                холбогдоно уу.
              </p>
              <Button
                className="mt-4"
                onClick={() => router.push("/admin/login")}
              >
                Нэвтрэх хуудас руу шилжих
              </Button>
            </div>
          ) : result ? (
            <div
              className={`p-4 mb-4 rounded-md ${
                result.success
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <p className="font-medium">{result.message}</p>{" "}
              {result.success && result.user && (
                <div className="mt-2 text-sm">
                  <p>
                    <strong>Хэрэглэгчийн нэр:</strong> {result.user.username}
                  </p>
                  <p>
                    <strong>Имэйл:</strong> {result.user.email}
                  </p>
                  <p>
                    <strong>Эрх:</strong> {result.user.role}
                  </p>
                  <p className="mt-2 text-red-700 font-bold">
                    Анхааруулга: Нууц үгийг аюулгүй байдлын үүднээс нэн даруй
                    солино уу!
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => router.push("/admin/login")}
                  >
                    Нэвтрэх хуудас руу шилжих
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleCreateSuperAdmin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="secretKey">Нууц түлхүүр</Label>
                  <Input
                    id="secretKey"
                    type="password"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    required
                    placeholder="Үүсгэх нууц түлхүүрийг оруулна уу"
                  />
                  <p className="text-xs text-muted-foreground">
                    Энэ нууц түлхүүр нь .env файлд тохируулагдсан байх ёстой
                  </p>
                </div>
              </div>
              <Button
                className="w-full mt-4"
                type="submit"
                disabled={loading || superAdminExists}
              >
                {loading ? "Үүсгэж байна..." : "Супер Админ Үүсгэх"}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-xs text-muted-foreground">
            Аюулгүй байдлын үүднээс энэ хуудсыг супер админ үүссэний дараа
            устгах шаардлагатай.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
