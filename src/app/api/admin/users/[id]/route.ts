import { connectToDatabase } from "@/lib/mongodb";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

// Админ хэрэглэгчийн мэдээлэл авах
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;

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

    // Хэрэглэгчийн мэдээллийг авах
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "Хэрэглэгч олдсонгүй" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Хэрэглэгчийн мэдээлэл авах үед алдаа гарлаа:", error);
    return NextResponse.json(
      { message: "Системийн алдаа гарлаа" },
      { status: 500 }
    );
  }
}

// Админ хэрэглэгчийн мэдээлэл шинэчлэх
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;

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
    const { username, email, role, password } = body;

    // MongoDB-тэй холбогдох
    await connectToDatabase();

    // Хэрэглэгч байгаа эсэхийг шалгах
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "Хэрэглэгч олдсонгүй" },
        { status: 404 }
      );
    }

    // Өөр хэрэглэгч имэйл ашиглаж байгаа эсэхийг шалгах
    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { message: "Энэ имэйлтэй хэрэглэгч бүртгэлтэй байна" },
          { status: 400 }
        );
      }
    }

    // Мэдээлэл шинэчлэх
    if (username) user.username = username;
    if (email) user.email = email;
    if (role && (role === "admin" || role === "superadmin")) user.role = role;

    // Хэрэв password илгээсэн бол шинэчлэх
    if (password) user.password = password;

    await user.save();

    return NextResponse.json({
      message: "Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Хэрэглэгчийн мэдээлэл шинэчлэх үед алдаа гарлаа:", error);
    return NextResponse.json(
      { message: "Системийн алдаа гарлаа" },
      { status: 500 }
    );
  }
}

// Админ хэрэглэгчийг устгах
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;

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

    // Өөрийгөө устгахыг хориглох
    if (userId === decoded.id) {
      return NextResponse.json(
        { message: "Өөрийн бүртгэлийг устгах боломжгүй" },
        { status: 400 }
      );
    }

    // MongoDB-тэй холбогдох
    await connectToDatabase();

    // Хэрэглэгчийг устгах
    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      return NextResponse.json(
        { message: "Хэрэглэгч олдсонгүй" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Хэрэглэгч амжилттай устгагдлаа",
    });
  } catch (error) {
    console.error("Хэрэглэгч устгах үед алдаа гарлаа:", error);
    return NextResponse.json(
      { message: "Системийн алдаа гарлаа" },
      { status: 500 }
    );
  }
}
