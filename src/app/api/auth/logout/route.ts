import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Cookie-г хоосолж хариу илгээх
    const response = NextResponse.json({ message: "Амжилттай гарлаа" });

    // auth_token cookie-г устгах
    response.cookies.set({
      name: "auth_token",
      value: "",
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 0, // Нэн даруй устгах
    });

    return response;
  } catch (error) {
    console.error("Системээс гарах үед алдаа гарлаа:", error);
    return NextResponse.json(
      { message: "Системийн алдаа гарлаа" },
      { status: 500 }
    );
  }
}
