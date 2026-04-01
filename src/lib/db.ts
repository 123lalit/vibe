// import { PrismaClient } from "@generated/prisma";  Import path galat hai — @generated/prisma kaam nahi karega, full path chahiye:
import { PrismaClient } from "../generated/prisma"  // ya jo tumhare tsconfig mein path alias set ho
import { PrismaPg } from "@prisma/adapter-pg"       // PrismaPg import missing hai
import "dotenv/config"                          // dotenv import missing — DATABASE_URL load nahi hoga:

const globalForPrisma = global as unknown as {
  prisma: PrismaClient; 
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!, 
}); 

//DATABASE_URL! mein ! isliye lagaya ki TypeScript ko batao yeh value zaroor hogi — warna type error aata hai.
export const prisma =globalForPrisma.prisma || new PrismaClient({ adapter, }); 

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 
