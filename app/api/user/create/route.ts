import { createUser} from "@/lib/actions/prisma-actions";
import { NextRequest} from "next/server";
import { redirect } from "next/navigation";
import { auth } from "@/auth"; 
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(req: NextRequest){
//User Login Authentication
 const session = await auth();
  if (!session) {
    return redirect("/"); 
  }

  const {formData} = await req.json();
  const {name, email} = formData; 

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    
  try {
    
  } catch (error) {
        
  }
}