import connectDb from "@/app/lib/db";
import User from "@/model/user.model";
import { updateUserSchema } from "@/validation/auth.validation";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET (req, {params}){
    await connectDb()
    const paramsId=await params;
const id=paramsId.id
console.log("editID:",id);

//check authorized user 
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
    //admin
    if (!user.isAdmin) {
      return NextResponse.json(
        { message: "Access denied. Admin only." },
        { status: 403 }
      );
    }

try {
  const singleUser=await User.findOne({_id:id},{password:0})
   if(!singleUser){
    return NextResponse.json({message:"user is not present"}, {status:401}) 
   }
   return NextResponse.json({message:"user data find successfully ", data:singleUser}, {status:200}) 
} catch (error) {
    return NextResponse.json({message:"user is not present"}, {status:401}) 
}


}
//post
export async function PATCH (req,{params}) {
    await connectDb()
    const paramsId=await params;
    const id=paramsId.id
    console.log("editID:",id);
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
    const userUpdate=await req.json();
    const {error, data}=updateUserSchema.safeParse(userUpdate)
    if(error){
        const firseErr=error.issues[0].message;
        return NextResponse.json({message:"user is not updated",error:firseErr}, {status:404}) 
    }
    const updateUsrData=data;
 const userUpdateData=await User.updateOne({_id:id},{$set:updateUsrData})
 return NextResponse.json({message:"user updated successfully || fill input properly",data:userUpdateData}, {status:200}) 
 } catch (error) {
    console.log(error);
     
 }
  
  }