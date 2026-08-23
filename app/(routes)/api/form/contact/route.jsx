import connectDb from "@/app/lib/db";
import Contact from "@/model/contact.model";
import { contactsSchema } from "@/validation/contact.validation";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDb()
      const body=await req.json();
      const {error, data}=contactsSchema.safeParse(body);
      if(error){
        const firstmsg=error.issues[0].message;
        return NextResponse.json({message:"message is not sent", error:firstmsg},{status:422})
      }
      const {username, email, message}=data

      const newMsg=await Contact.create({username, email, message})
      return NextResponse.json({message:"message is  sent successfully", data:newMsg},{status:200})
    } catch (error) {
        console.log(error);
      return NextResponse.json({message:"message is not sent please try again!!"},{status:500})
    }
}