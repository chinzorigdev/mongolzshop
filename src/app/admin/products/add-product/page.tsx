"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, ImagePlus } from "lucide-react";
import Image from "next/image";
import { brands, colors, categories, sizes } from "@/lib/product-options";

// Бүтээгдэхүүний схем
const formSchema = z.object({
  title: z.string().min(3, { message: "Нэр 3-с дээш тэмдэгттэй байх ёстой" }),
  description: z
    .string()
    .min(10, { message: "Тайлбар 10-с дээш тэмдэгттэй байх ёстой" }),
  price: z.coerce.number().min(100, { message: "Үнэ 100-с их байх ёстой" }),
  price_on_sale: z.coerce.number().optional().nullable(),
  category: z.string().min(1, { message: "Ангилал заавал сонгоно уу" }),
  brand: z.string().default("Mongolz"),
  color: z.string().default("black"),
  image: z.string().min(1, { message: "Зураг заавал оруулна уу" }),
  sizes: z
    .array(z.string())
    .min(1, { message: "Дор хаяж нэг хэмжээ сонгоно уу" }),
  quantity: z.coerce.number().min(0, {
    message: "Тоо ширхэг хамгийн багадаа 0 байх ёстой",
  }),
  inStock: z.boolean(),
  sku: z.string().optional(),
});

export default function AddProductPage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  // React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      price_on_sale: null,
      category: "",
      brand: "Mongolz",
      color: "black",
      image: "",
      sizes: [],
      quantity: 0, // Default: 0 ширхэг
      inStock: true,
      sku: "",
    },
  });

  // Бүтээгдэхүүн нэмэх
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Бүтээгдэхүүн нэмэхэд алдаа гарлаа");
      }

      toast.success("Бүтээгдэхүүн амжилттай нэмэгдлээ");
      router.push("/admin/products");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Бүтээгдэхүүн нэмэхэд алдаа гарлаа"
      );
    }
  };

  // Cloudinary зураг оруулах
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Environment variable байгаа эсэхийг шалгах
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!uploadPreset) {
      toast.error("Cloudinary тохиргоо буруу байна. Админтай холбогдоно уу.");
      return;
    }

    try {
      setIsUploading(true);

      // Cloudinary preset ашиглан зураг оруулах
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset); // Энд шалгасан утгаа оруулах

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "didygfbnd"
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Зураг оруулахад алдаа гарлаа");
      }

      const data = await response.json();
      form.setValue("image", data.secure_url, { shouldValidate: true });
      toast.success("Зураг амжилттай орууллаа");
    } catch (error) {
      toast.error(
        `Зураг оруулахад алдаа гарлаа: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products">
          {/* Буцах товч */}
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Буцах
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Шинэ бүтээгдэхүүн нэмэх</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Бүтээгдэхүүний мэдээлэл</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Нэр */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Нэр</FormLabel>
                      <FormControl>
                        <Input placeholder="Бүтээгдэхүүний нэр" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Үнэ */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Үнэ (₮)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Хямдралтай үнэ */}
                <FormField
                  control={form.control}
                  name="price_on_sale"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Хямдралтай үнэ (₮)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Хямдралтай бол бөглөнө үү"
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value ? Number(e.target.value) : null
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>Заавал биш</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Тоо ширхэг */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тоо ширхэг</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Барааны тоо ширхэг"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      0-с их бол бараа автоматаар "Нөөцөд байгаа" гэсэн төлөвтэй болно
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Ангилал */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ангилал</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Ангилал сонгоно уу" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Брэнд */}
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Брэнд</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Брэнд сонгоно уу" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Өнгө */}
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Өнгө</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Өнгө сонгоно уу" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color.id} value={color.id}>
                            {color.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Хэмжээнүүд */}
              <FormField
                control={form.control}
                name="sizes"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Хэмжээ</FormLabel>
                      <FormDescription>
                        Байгаа хэмжээнүүдийг сонгоно уу
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                      {sizes.map((size) => (
                        <FormField
                          key={size.id}
                          control={form.control}
                          name="sizes"
                          render={({ field }) => (
                            <FormItem
                              key={size.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(size.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, size.id]);
                                    } else {
                                      field.onChange(
                                        field.value.filter(
                                          (v: string) => v !== size.id
                                        )
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {size.label}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Тайлбар */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тайлбар</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Бүтээгдэхүүний дэлгэрэнгүй тайлбар"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Зураг */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Зураг</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="grid gap-4">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                          />
                          {isUploading && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Зураг оруулж байна...</span>
                            </div>
                          )}
                        </div>
                        {field.value ? (
                          <div className="relative aspect-square w-40 overflow-hidden rounded-md border">
                            <Image
                              src={field.value}
                              alt="Зураг"
                              className="object-cover"
                              width={160}
                              height={160}
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center border border-dashed rounded-md h-40 w-40">
                            <ImagePlus className="h-10 w-10 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground mt-2">
                              Зураг сонгоно уу
                            </p>
                          </div>
                        )}
                        <Input type="hidden" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Нөөцөд байгаа эсэх */}
              <FormField
                control={form.control}
                name="inStock"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Нөөцөд байгаа</FormLabel>
                      <FormDescription>
                        Тоо ширхэг 0-с их үед автоматаар чагтлагдана
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting || isUploading}
                  className="min-w-[150px]"
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Бүтээгдэхүүн нэмэх
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
