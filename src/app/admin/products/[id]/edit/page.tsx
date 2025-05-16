"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, ImagePlus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Product } from "@/types";
import { brands, colors, categories, sizes } from "@/lib/product-options"; // Шинэ импорт

// Бүтээгдэхүүний схем
const formSchema = z.object({
  title: z.string().min(3, { message: "Нэр 3-с дээш тэмдэгттэй байх ёстой" }),
  description: z
    .string()
    .min(10, { message: "Тайлбар 10-с дээш тэмдэгттэй байх ёстой" }),
  price: z.coerce.number().min(100, { message: "Үнэ 100-с их байх ёстой" }),
  price_on_sale: z.coerce.number().optional().nullable(),
  category: z.string().min(1, { message: "Ангилал заавал сонгоно уу" }),
  brand: z.string().min(1, { message: "Брэнд заавал сонгоно уу" }), // Шинэ талбар
  color: z.string().min(1, { message: "Өнгө заавал сонгоно уу" }), // Шинэ талбар
  image: z.string().min(1, { message: "Зураг заавал оруулна уу" }),
  sizes: z
    .array(z.string())
    .min(1, { message: "Дор хаяж нэг хэмжээ сонгоно уу" }),
  inStock: z.boolean(),
  sku: z.string().optional(),
  quantity: z.coerce.number().min(0, { message: "Тоо хэмжээ 0-с багагүй байх ёстой" }), // Шинэ талбар
});

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const productId = params.id as string;

  // React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      price_on_sale: null,
      category: "",
      brand: "Mongolz", // Шинэ талбар
      color: "black", // Шинэ талбар
      image: "",
      sizes: [],
      inStock: true,
      sku: "",
      quantity: 0, // Шинэ талбар
    },
  });

  // Бараа татах
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/products/${productId}`);

        if (!response.ok) {
          throw new Error("Бараа татахад алдаа гарлаа");
        }

        const product: Product = await response.json();

        // Формын утгыг шинэчлэх
        form.reset({
          title: product.title,
          description: product.description,
          price: product.price,
          price_on_sale: product.price_on_sale,
          category: product.category,
          brand: product.brand || "Mongolz", // Шинэ талбар
          color: product.color || "black", // Шинэ талбар
          image: product.image,
          sizes: product.sizes,
          inStock: product.inStock,
          sku: product.sku || "",
          quantity: product.quantity || 0, // Шинэ талбар
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Бараа татахад алдаа гарлаа");
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, form]);

  // Бараа засварлах
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Бүтээгдэхүүн засварлахад алдаа гарлаа"
        );
      }

      toast.success("Бүтээгдэхүүн амжилттай засварлагдлаа");
      router.push("/admin/products");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Бүтээгдэхүүн засварлахад алдаа гарлаа"
      );
    }
  };

  // Зураг оруулах
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Зураг оруулах API руу хүсэлт илгээх
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Зураг оруулахад алдаа гарлаа");
      }

      const data = await response.json();
      form.setValue("image", data.url, { shouldValidate: true });
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

  // Өгөгдөл татаж байх үед loading харуулах
  if (isLoading) {
    return (
      <div className="container py-10 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2">Өгөгдөл татаж байна...</p>
      </div>
    );
  }

  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products">
          {/* Буцах товч */}
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Буцах
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Бүтээгдэхүүн засварлах</h1>
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

                {/* SKU */}
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="PROD-001" {...field} />
                      </FormControl>
                      <FormDescription>
                        Бүтээгдэхүүний дотоод кодыг оруулна уу (Заавал биш)
                      </FormDescription>
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
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Нөөцөд байгаа</FormLabel>
                      <FormDescription>
                        Бүтээгдэхүүн худалдаж авах боломжтой эсэх
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
                  Бүтээгдэхүүн засварлах
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
