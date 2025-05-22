import { connectToDatabase } from "@/lib/mongodb";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    // Auth токен авах
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Нэвтрээгүй байна" },
        { status: 401 }
      );
    }

    // Токен шалгах
    const decoded: any = verify(
      token,
      process.env.JWT_SECRET || "default-secret-key-change-in-production"
    );

    // MongoDB-тэй холбогдох
    await connectToDatabase();

    // Хэрэглэгчийн мэдээллийг авах
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "Хэрэглэгч олдсонгүй" },
        { status: 404 }
      );
    }

    // Хэрэглэгчийн мэдээллийг буцаах
    return NextResponse.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Хэрэглэгчийн мэдээлэл авах үед алдаа гарлаа:", error);
    return NextResponse.json(
      { message: "Системийн алдаа гарлаа" },
      { status: 500 }
    );
  }
}
