import { Metadata } from "next";
import { AdminSection } from "./components/admin-section";

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
      </div>

      <AdminSection initialUsers={adminUsers} />
    </div>
  );
}
