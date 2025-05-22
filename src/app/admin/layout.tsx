"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LucideIcon,
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  adminOnly?: boolean;
  superAdminOnly?: boolean;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Хэрэглэгчийн мэдээллийг авах
  useEffect(() => {
    // Логин хуудас дээр байгаа бол шалгахгүй
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    // Энд хэрэглэгчийн мэдээллийг API-аас авах код орно
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
          // Хэрэв нэвтрээгүй бол хандахгүй
          setUserRole(null);
          setLoading(false);
          return;
        }

        const data = await response.json();
        setUserRole(data.user.role);
      } catch (error) {
        console.error("Аутентикейшн шалгах үед алдаа гарлаа:", error);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname]);

  // Навигацийн элементүүд
  const navItems: NavItem[] = [
    {
      title: "Хянах самбар",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Бүтээгдэхүүн",
      href: "/admin/products",
      icon: ShoppingBag,
    },
    {
      title: "Хэрэглэгчид",
      href: "/admin/users",
      icon: Users,
      adminOnly: true,
    },
    {
      title: "Тохиргоо",
      href: "/admin/settings",
      icon: Settings,
    },
    {
      title: "Админ удирдлага",
      href: "/admin/superadmin",
      icon: Settings,
      superAdminOnly: true,
    },
  ];

  // Гарах функц
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/admin/login");
    } catch (error) {
      console.error("Гарах үед алдаа гарлаа:", error);
    }
  };

  // Хэрэв login хуудас дээр байвал sidebar харуулахгүй
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Ачаалж байна...</p>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="grid grid-cols-[auto_1fr] min-h-screen">
        <Sidebar>
          <SidebarHeader className="py-6 px-6">
            <Link
              href="/admin"
              className="flex items-center gap-2 font-semibold"
            >
              <span className="text-xl font-bold">Mongolz Shop</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => {
                // Superadmin зөвхөн superadmin эрхтэй хэрэглэгчид харагдана
                if (item.superAdminOnly && userRole !== "superadmin") {
                  return null;
                }

                // Admin only зөвхөн admin, superadmin эрхтэй хэрэглэгчид харагдана
                if (
                  item.adminOnly &&
                  userRole !== "admin" &&
                  userRole !== "superadmin"
                ) {
                  return null;
                }

                return (
                  <SidebarMenuButton
                    key={item.href}
                    asChild
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href} className="flex items-center">
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <Separator />
            <div className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Гарах
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="p-6 overflow-auto">{children}</div>
      </div>
    </SidebarProvider>
  );
}
