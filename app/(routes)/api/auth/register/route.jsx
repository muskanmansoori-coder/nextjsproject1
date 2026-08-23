import connectDb from "@/app/lib/db";
import User from "@/model/user.model";
import {registerSchema} from "@/validation/auth.validation";
import { NextResponse } from "next/server";


//register logic
export async function POST(req){
    try {
        await connectDb()

     const body =  await req.json();

     const {data, error} = registerSchema.safeParse(body);
     if(error){
        const firsterr=error.issues[0].message
        return NextResponse.json({ message: "Validation failed, filled the input properly",
            error: firsterr},{status:422})
     }
     const{username, email, phone, password}=data;
     const userExist=await User.findOne({email:email})
     if(userExist){
        return NextResponse.json({message:"user is already exist"},{status: 409 })
     }
     {/*//secure password 
     ///const saltRound=10;
     //const hash_password=await bcrypt.hash(password, saltRound)
     //const newUser=await User.create({username, email, phone, password:hash_password})*/}
     {/*
const generateToken = () => {
     try {
    return jwt.sign(
      {
      userId:this._id.toString(),
      email:this.email,
      isAdmin:this.isAdmin

    }, 
    process.env.JWT_SECRET,
    {
      expiresIn:"30d",
    })
  } catch (error) {
    console.log(error);
    
  }
    }
        const tokennn=generateToken();
        */}
     const newUser=await User.create({username, email, phone, password})
     //console.log("generateToken:", typeof newUser.generateToken);
     //return NextResponse.json({message:"registration successfully", data:newUser, token:tokennnn},{status:200})
     return NextResponse.json({message:"registration successfully", data:newUser,token:await newUser.generateToken(), userId:newUser._id.toString() },{status:200})
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message:error.message},{status:500})
    }
}