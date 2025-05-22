"use client";

import { useState } from "react";
// Removed unused Card imports
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ChangePasswordCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Шинэ нууц үг шалгалт
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Шинэ нууц үг таарахгүй байна");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Нууц үг солих үед алдаа гарлаа");
      }

      // Амжилттай солисон
      setSuccess("Нууц үг амжилттай солигдлоо");
      // Form цэвэрлэх
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Цонх хаах
      setTimeout(() => {
        setIsOpen(false);
        setSuccess("");
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Нууц үг солих үед алдаа гарлаа");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-md p-4">
      <h3 className="font-medium">Нууц үг солих</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Системд нэвтрэх өөрийн нууц үгийг солих
      </p>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4">
            Нууц үг солих
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Нууц үг солих</DialogTitle>
              <DialogDescription>
                Аюулгүй байдлын үүднээс нууц үгээ тогтмол солиж байхыг зөвлөж
                байна.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {error && (
                <div className="p-3 text-sm text-white bg-destructive rounded-md">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 text-sm text-white bg-green-600 rounded-md">
                  {success}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="currentPassword">Одоогийн нууц үг</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Шинэ нууц үг</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Шинэ нууц үг давтах</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Солиж байна..." : "Нууц үг солих"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
