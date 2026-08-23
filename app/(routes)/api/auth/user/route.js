import User from "@/model/user.model";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        //step1
        const token= req.headers.get("Authorization");
        console.log("token", token);

    //step2
        if (!token) {
            return NextResponse.json(
              { message: "Authorization token not found" },
              { status: 401 }
            );
          }
//step3
          const jwtToken= token.replace("Bearer ", "")

          console.log("jwtToken", jwtToken);
          
//step4
const decoded = jwt.verify(
    jwtToken,
    process.env.JWT_SECRET
  );
  
  console.log("decoded", decoded);
  //step5
  const userData= await User.findOne({email:decoded.email},{password:0})
  console.log(userData);
      // step 6
      if (!userData) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      //step7
      return NextResponse.json({
        message: "Authentication successful",
        user: userData,
      });
  
    } catch (error) {
        console.log(error);

        return NextResponse.json(
          { message: "Invalid or expired token" },
          { status: 401 }
        );
    }
}