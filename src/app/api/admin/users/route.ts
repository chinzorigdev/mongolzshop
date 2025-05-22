import { connectToDatabase } from "@/lib/mongodb";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export const runtime = "nodejs";

// Админ хэрэглэгчдийн жагсаалт авах
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

    // SuperAdmin эрх шалгах
    if (decoded.role !== "superadmin") {
      return NextResponse.json(
        { message: "Супер админ эрх байхгүй байна" },
        { status: 403 }
      );
    }

    // MongoDB-тэй холбогдох
    await connectToDatabase();

    // Админ эрхтэй хэрэглэгчдийг авах
    const adminUsers = await User.find({
      role: { $in: ["admin", "superadmin"] },
    }).select("-password");

    return NextResponse.json({ users: adminUsers });
  } catch (error) {
    console.error("Админ хэрэглэгчдийн жагсаалт авах үед алдаа гарлаа:", error);
    return NextResponse.json(
      { message: "Системийн алдаа гарлаа" },
      { status: 500 }
    );
  }
}

// Шинэ админ хэрэглэгч үүсгэх
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

    // SuperAdmin эрх шалгах
    if (decoded.role !== "superadmin") {
      return NextResponse.json(
        { message: "Супер админ эрх байхгүй байна" },
        { status: 403 }
      );
    }

    // Request body авах
    const body = await request.json();
    const { username, email, password, role } = body;

    // Өгөгдлийн шалгалт
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Бүх талбарыг бөглөнө үү" },
        { status: 400 }
      );
    }

    // Зөвхөн admin эсвэл superadmin эрх үүсгэх боломжтой
    if (role !== "admin" && role !== "superadmin") {
      return NextResponse.json(
        { message: "Зөвхөн admin эсвэл superadmin эрх үүсгэх боломжтой" },
        { status: 400 }
      );
    }

    // MongoDB-тэй холбогдох
    await connectToDatabase();

    // Имэйл шалгах
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Энэ имэйлтэй хэрэглэгч бүртгэлтэй байна" },
        { status: 400 }
      );
    }

    // Шинэ хэрэглэгч үүсгэх
    const newUser = new User({
      username,
      email,
      password,
      role,
    });

    await newUser.save();

    return NextResponse.json(
      {
        message: "Админ хэрэглэгч амжилттай үүслээ",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Админ хэрэглэгч үүсгэх үед алдаа гарлаа:", error);
    return NextResponse.json(
      { message: "Системийн алдаа гарлаа" },
      { status: 500 }
    );
  }
}
