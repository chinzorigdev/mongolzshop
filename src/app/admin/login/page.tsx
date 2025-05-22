"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Нэвтрэх үед алдаа гарлаа");
      }

      // Амжилттай нэвтэрсэн бол admin dashboard руу шилжих
      router.push("/admin");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex items-center justify-center w-full mb-4">
            <Image
              src="/mongolz-logo.svg"
              alt="Mongolz Shop Logo"
              width={180}
              height={50}
              className="dark:invert"
              onError={(e) => {
                // Fallback if logo doesn't exist
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "/next.svg";
              }}
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Админ нэвтрэх
          </CardTitle>
          <CardDescription className="text-center">
            Админ эрхээр нэвтэрч системд хандана уу
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-white bg-destructive rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Имэйл</Label>
              <Input
                id="email"
                type="email"
                placeholder="имэйл хаяг"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Нууц үг</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Нууц үг мартсан?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="нууц үг"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Нэвтрэх..." : "Нэвтрэх"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
