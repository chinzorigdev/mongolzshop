import Link from "next/link";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Админ хянах самбар",
  description: "Mongolz Shop админ хянах самбар",
};

// Жишээ статистик мэдээлэл
const stats = [
  {
    title: "Нийт борлуулалт",
    value: "4,250,000₮",
    description: "Сүүлийн 30 хоног",
    icon: DollarSign,
    color: "bg-green-500",
  },
  {
    title: "Захиалгын тоо",
    value: "125",
    description: "Сүүлийн 30 хоног",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    title: "Хэрэглэгчид",
    value: "1,250",
    description: "Нийт бүртгэлтэй",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    title: "Бүтээгдэхүүний тоо",
    value: "54",
    description: "Нийт бүртгэлтэй",
    icon: ShoppingBag,
    color: "bg-amber-500",
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Хянах самбар</h1>
        <p className="text-muted-foreground mt-2">
          Mongolz Shop системийн үндсэн хянах самбар
        </p>
      </div>

      {/* Статистик хэсэг */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-md ${stat.color}`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Үндсэн хэсгүүдрүү хандах */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Бүтээгдэхүүн удирдлага</CardTitle>
            <CardDescription>Бүтээгдэхүүн нэмэх, засах, устгах</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-4">
            <ShoppingBag className="h-16 w-16 text-neutral-300" />
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/products">Бүтээгдэхүүн удирдах</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Хэрэглэгч удирдлага</CardTitle>
            <CardDescription>
              Хэрэглэгчийн бүртгэл, захиалга, эрх
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-4">
            <Users className="h-16 w-16 text-neutral-300" />
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/users">Хэрэглэгч удирдах</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Систем тохиргоо</CardTitle>
            <CardDescription>Системийн үндсэн тохиргоонууд</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-4">
            <Settings className="h-16 w-16 text-neutral-300" />
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/settings">Тохиргоо</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Сүүлийн үйл ажиллагаа */}
      <Card>
        <CardHeader>
          <CardTitle>Сүүлийн үйл ажиллагаа</CardTitle>
          <CardDescription>Системд хийгдсэн сүүлийн үйлдлүүд</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 border-b pb-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <ShoppingBag className="h-4 w-4 text-blue-700" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Шинэ бүтээгдэхүүн нэмэгдлээ</p>
                <p className="text-sm text-muted-foreground">
                  Ноосон цамц - XXL
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                10 минутын өмнө
              </div>
            </div>

            <div className="flex items-center gap-4 border-b pb-4">
              <div className="bg-green-100 p-2 rounded-full">
                <DollarSign className="h-4 w-4 text-green-700" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Шинэ захиалга</p>
                <p className="text-sm text-muted-foreground">
                  Захиалга #12345 - 75,000₮
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                25 минутын өмнө
              </div>
            </div>

            <div className="flex items-center gap-4 border-b pb-4">
              <div className="bg-purple-100 p-2 rounded-full">
                <Users className="h-4 w-4 text-purple-700" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Шинэ хэрэглэгч</p>
                <p className="text-sm text-muted-foreground">
                  bold@example.com
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                45 минутын өмнө
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Бүх үйл ажиллагааг харах
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
