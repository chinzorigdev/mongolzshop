import { connectToDatabase } from "@/lib/mongodb";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

// Анхны супер админ хэрэглэгч үүсгэх API
// Энэ API-г зөвхөн нэг удаа ажиллуулах зориулалттай, дараа нь хаах шаардлагатай!
export async function POST(request: NextRequest) {
  try {
    // Нууц KEY шалгалт (хүсэлтийн body-с авах)
    const { secretKey } = await request.json();

    // Нууц түлхүүр шалгах - энэ бол аюулгүй байдлын шалгалт
    // Энэ түлхүүрийг .env файлд хадгалах шаардлагатай
    if (secretKey !== process.env.SEED_SECRET_KEY) {
      return NextResponse.json(
        { message: "Хүсэлт илгээх эрх байхгүй байна" },
        { status: 403 }
      );
    }

    // MongoDB-тэй холбогдох
    await connectToDatabase();

    // Супер админ хэрэглэгч бүртгэлтэй эсэхийг шалгах
    const existingSuperAdmin = await User.findOne({ role: "superadmin" });

    if (existingSuperAdmin) {
      return NextResponse.json(
        { message: "Супер админ хэрэглэгч аль хэдийн бүртгэлтэй байна" },
        { status: 400 }
      );
    }

    // Анхны супер админ хэрэглэгч үүсгэх
    const superAdmin = new User({
      username: "superadmin",
      email: process.env.DEFAULT_SUPERADMIN_EMAIL || "superadmin@mongolz.shop",
      password:
        process.env.DEFAULT_SUPERADMIN_PASSWORD || "ChangeThisPassword123!", // Энэ нууц үгийг үүсгэсний дараа нэн даруй солих шаардлагатай!
      role: "superadmin",
    });

    await superAdmin.save();

    return NextResponse.json(
      {
        message: "Анхны супер админ хэрэглэгч амжилттай үүслээ",
        user: {
          id: superAdmin._id,
          username: superAdmin.username,
          email: superAdmin.email,
          role: superAdmin.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Супер админ үүсгэх үед алдаа гарлаа:", error);
    return NextResponse.json(
      { message: "Системийн алдаа гарлаа" },
      { status: 500 }
    );
  }
}
