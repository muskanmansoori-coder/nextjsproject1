import connectDb from "@/app/lib/db";
import Contact from "@/model/contact.model";
import User from "@/model/user.model";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET (req) {
    const token = req.headers.get("Authorization");
if(!token){
    return NextResponse.json({message:"users are not found"},{status:404})
}
const jwtToken = token.replace("Bearer ", "");

const decoded = jwt.verify(
  jwtToken,
  process.env.JWT_SECRET
);
const user=await User.findOne({email:decoded.email})
if(!user){
  return NextResponse.json(
    { message: "user is not found." },
    { status: 404 }
  );
}
if (!user.isAdmin) {
  return NextResponse.json(
    { message: "Access denied. Admin only." },
    { status: 403 }
  );
}
try {
  await connectDb()
    const contacts=await Contact.find();
    if(!contacts){
        return NextResponse.json({message:"contacts are not found"},{status:404})
    }
    return NextResponse.json({message:"contacts are found and you are admin", data:contacts},{status:200})
} catch (error) {
    console.log(error);
    return NextResponse.json({message:"contacts are not found"},{status:404})
}
}