import { connectToDatabase } from "@/lib/mongodb";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function POST(request: NextRequest) {
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

    // Request body авах
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // Өгөгдлийн шалгалт
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Бүх талбарыг бөглөнө үү" },
        { status: 400 }
      );
    }

    // MongoDB-тэй холбогдох
    await connectToDatabase();

    // Хэрэглэгчийг ID-гээр олох
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json(
        { message: "Хэрэглэгч олдсонгүй" },
        { status: 404 }
      );
    }

    // Одоогийн нууц үгийг шалгах
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Одоогийн нууц үг буруу байна" },
        { status: 400 }
      );
    }

    // Шинэ нууц үг хадгалах
    user.password = newPassword;
    await user.save();

    return NextResponse.json({
      message: "Нууц үг амжилттай солигдлоо",
    });
  } catch (error) {
    console.error("Нууц үг солих үед алдаа гарлаа:", error);
    return NextResponse.json(
      { message: "Системийн алдаа гарлаа" },
      { status: 500 }
    );
  }
}
