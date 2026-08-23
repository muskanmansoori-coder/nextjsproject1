import connectDb from "@/app/lib/db";
import Service from "@/model/service.model";
import { NextResponse } from "next/server";

export async function GET (req){
   
try {
    await connectDb()
   const servData=await Service.find();
   if(!servData){
    return NextResponse.json({message:"service is not found"},{status:404})
   }
   return NextResponse.json({message:"service is  found", data:servData},{status:200})
} catch (error) {
    console.log(error);
    return NextResponse.json({message:"service is not found"},{status:500})
}
}