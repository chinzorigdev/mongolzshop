import { NextRequest, NextResponse } from "next/server";
import Product from "@/app/models/Product";
import { connectToDatabase } from "@/lib/mongodb";

// MongoDB алдааны интерфейс нэмэх
interface MongoError extends Error {
  code?: number;
  keyPattern?: Record<string, any>;
  keyValue?: Record<string, any>;
}

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
    console.log("Received product data:", body);

    // 'id' талбарыг шууд устгах
    delete body.id;

    // Хоосон SKU-г null болгох
    if (body.sku === "") {
      body.sku = null;
    }

    // SKU автоматаар үүсэх болно (model-д тохируулсан)
    const newProduct = await Product.create(body);
    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);

    // SKU давтагдсан эсэхийг шалгах
    if (
      error instanceof Error &&
      error.name === "MongoServerError" &&
      (error as MongoError).code === 11000 &&
      (error as MongoError).keyPattern &&
      (error as MongoError).keyPattern.sku
    ) {
      return NextResponse.json(
        { error: "Энэ SKU кодтой өөр бараа бүртгэгдсэн байна." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Бараа үүсгэхэд алдаа гарлаа",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
