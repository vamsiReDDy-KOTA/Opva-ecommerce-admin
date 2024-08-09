import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"

export async function post(req:Request) {
    try {
      const body: any = req.json();

      const { email, firstName, lastName } = body
      
      if(!email){
        return new NextResponse("email is required")
      }

      const store = await prismadb.users.create({
        data:{
            email,
            firstName,
            lastName
        }
      })
      return NextResponse.json(store)
    } catch (error) {
       console.log("store", error)
       return new NextResponse("interal error",{status:500}) 
    }
}