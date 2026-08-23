import { NextResponse } from "next/server";

///home logic
export async function GET(req){
try {
    return NextResponse.json({message:"welcome to the homepage"}, {status:200})
} catch (error) {
   return NextResponse.json({message:"something went wrong"},{status:500})
}
}

