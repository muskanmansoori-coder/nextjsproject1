import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
    isAdmin:{
      type:Boolean,
      default:false
    },
  },
  {
    timestamps: true,
  }
);

//secure
userSchema.pre("save", async function(){
  console.log("pre method", this);
  console.log("Password before:", this.password);
  const user=this;
  if(!user.isModified("password")){
    return;
  }

  try {
    const saltRound=10;
  const hash_password=await bcrypt.hash(user.password,saltRound)
  user.password=hash_password
  console.log("Password after:", user.password);

  } catch (error) {
    console.log(error);
    
  }
})
//jwt token generate
userSchema.methods.generateToken=function(){
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
const User= mongoose.models.User || mongoose.model("User", userSchema);
 

export default User;