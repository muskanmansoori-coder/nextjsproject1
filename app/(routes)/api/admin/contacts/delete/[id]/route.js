import connectDb from "@/app/lib/db";
import Contact from "@/model/contact.model";
import User from "@/model/user.model";

import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function DELETE (req,{params}) {
    await connectDb()
    const paramsId= await params;
    const id=paramsId.id
    console.log("delete id:", id);
    
 
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
       const deletecontact=await Contact.deleteOne({_id:id}) 
       if(!deletecontact.deletedCount === 0){
        return NextResponse.json({message:"contact is  not find"},{status:404})
       }
       return NextResponse.json({message:"contactis deleted successfull", data:deletecontact},{status:200})
       
    } catch (error) {
        console.log("delete error", error);
        return NextResponse.json({message:"contact are not delete"},{status:404})
        
    }
}