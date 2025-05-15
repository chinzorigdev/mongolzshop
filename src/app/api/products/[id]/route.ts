import { NextRequest, NextResponse } from "next/server";
import mongoose, { MongoServerError } from "mongoose";
import Product from "@/app/models/Product";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const id = params.id;

    //Check if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID format" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT метод нэмэх
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const id = params.id;

    // Хүсэлтийн биеийг JSON болгон задлах
    const body = await request.json();

    // 'id' талбарыг шууд устгах
    delete body.id;

    // Бараа байгаа эсэхийг шалгах
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID format" },
        { status: 400 }
      );
    }

    // Баазаас хайх, шинэчлэх, шинэ баримтыг буцаах
    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true, // Шинэчилсэн баримтыг буцаах
      runValidators: true, // Mongoose валидациг ажиллуулах
    });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);

    // Duplicate key error шалгах (SKU талбар давхцах үед)
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { error: "Validation error", details: error.message },
        { status: 400 }
      );
    }

    if (
      error instanceof Error &&
      error.name === "MongoServerError" &&
      (error as MongoServerError).code === 11000
    ) {
      return NextResponse.json(
        { error: "A product with this SKU already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE метод нэмэх
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const id = params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID format" },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
