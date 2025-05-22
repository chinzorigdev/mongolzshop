import { connectToDatabase } from "@/lib/mongodb";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // MongoDB-тэй холбогдох
    await connectToDatabase();

    // Супер админ хэрэглэгч бүртгэлтэй эсэхийг шалгах
    const existingSuperAdmin = await User.findOne({ role: "superadmin" });

    return NextResponse.json({
      exists: !!existingSuperAdmin,
    });
  } catch (error) {
    console.error("Супер админ шалгах үед алдаа гарлаа:", error);
    return NextResponse.json(
      { message: "Системийн алдаа гарлаа", exists: false },
      { status: 500 }
    );
  }
}
