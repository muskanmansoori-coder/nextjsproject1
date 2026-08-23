import connectDb from "@/app/lib/db";
import User from "@/model/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import  {loginSchema } from "@/validation/auth.validation";

//login logic
export async function POST(req){
    try {
        await connectDb()
     ///const{email, password} =  await req.json();
     const body=await req.json();
     const{data, error}=loginSchema.safeParse(body)

     if(error){
      const firsterr=error.issues[0].message;
      return NextResponse.json({message:"validation faild, fill input properly", error:firsterr},{status:422})
     }
     const{email, password}=data;
     const userExist=await User.findOne({email:email});

     if(!userExist){
        return NextResponse.json({message:"user is not found, please try again"},{status:400})
     }
     //compare password
     const isValidPass= await bcrypt.compare(password, userExist.password);

     if(isValidPass){
        return NextResponse.json({message:"login successfully",token:await userExist.generateToken(), userId:userExist._id.toString()},{status:200})
     }
     else{
        return NextResponse.json({message:"invalid email or password"},{status:401})
     }

    
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message:error.message},{status:500})
    }
}