import { connectToDatabase } from "@/lib/mongodb";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Имэйл болон нууц үг оруулна уу" },
        { status: 400 }
      );
    }

    // MongoDB-тэй холбогдох
    await connectToDatabase();

    // Хэрэглэгчийг хайх
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Имэйл эсвэл нууц үг буруу байна" },
        { status: 401 }
      );
    }

    // Нууц үг шалгах
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Имэйл эсвэл нууц үг буруу байна" },
        { status: 401 }
      );
    }

    // Админ эрх шалгах (admin эсвэл superadmin)
    if (user.role !== "admin" && user.role !== "superadmin") {
      return NextResponse.json(
        { message: "Админ эрх байхгүй байна" },
        { status: 403 }
      );
    }

    // JWT токен үүсгэх
    const token = sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "default-secret-key-change-in-production",
      { expiresIn: "7d" }
    );

    // Cookie-д токен хадгалах
    const response = NextResponse.json({
      message: "Амжилттай нэвтэрлээ",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

    // Cookie-д токен хадгалах
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 өдөр
    });

    return response;
  } catch (error) {
    console.error("Нэвтрэх үед алдаа гарлаа:", error);
    return NextResponse.json(
      { message: "Системийн алдаа гарлаа" },
      { status: 500 }
    );
  }
}
