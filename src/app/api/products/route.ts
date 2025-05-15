import { NextRequest, NextResponse } from "next/server";
import Product from "@/app/models/Product";
import { connectToDatabase } from "@/lib/mongodb";

// Бүх бүтээгдэхүүнийг авах (админ панелд харуулахад)
export async function GET(request: NextRequest) {
  try {
    if (!request) {
      return NextResponse.json(
        { error: "Request is not defined" },
        { status: 400 }
      );
    }
    await connectToDatabase();

    // Бүх бүтээгдэхүүнийг авах
    const products = await Product.find({}).sort({ createdAt: -1 }); // Сүүлд нэмэгдсэн нь эхэндээ

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" + error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const newProduct = await Product.create(body);
    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" + error },
      { status: 500 }
    );
  }
}
