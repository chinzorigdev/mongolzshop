import { NextRequest, NextResponse } from "next/server";
import Product from "@/app/models/Product";
import { connectToDatabase } from "@/lib/mongodb";

// Бүх бүтээгдэхүүнийг авах (админ панелд харуулахад)
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Бүх бүтээгдэхүүнийг авах
    const products = await Product.find({}).sort({ createdAt: -1 }); // Сүүлд нэмэгдсэн нь эхэндээ

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
