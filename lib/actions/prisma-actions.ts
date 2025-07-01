'use server'

import prisma from "../prisma"
import { revalidatePath } from "next/cache"

// export async function getUsers() {
//     try {
//         const users = await prisma.user.findMany({
//             include: {
//                 recipes: true, 
//             },
//             orderBy: {
//                 createdAt: 'desc'
//             }
//         })
//         return users
//     } catch (error) {
//         console.error("Error fetching users:", error)
//         throw new Error("Failed to fetch users")
//     }
// }

export async function createUser({email, name}: {email: string, name: string}) {
    if(!email){
        throw new Error("Email is required")
    }
    try {
        const user = await prisma.user.create({
            data: {
                name, 
                email
            }
        });
        //revaliedate the home page to show the new user  
        revalidatePath('/')
    } catch (error) {
        console.error("Error creating user:", error)
        throw new Error("Failed to create user")
    }
}