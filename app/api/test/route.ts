import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    console.log("okay0");
    return NextResponse.json({ message: "MongoDB connected successfully!" });
  } catch (error) {
    console.log("not okay0");

    return NextResponse.json(
      { message: "MongoDB connection failed", error },
      { status: 500 }
    );
  }
}
