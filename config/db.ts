import { PrismaPg } from '@prisma/adapter-pg'
import { Prisma, PrismaClient } from '../generated/prisma/client'
const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL
})
const prisma = new PrismaClient({
	log: ['query', 'info', 'warn', 'error'],adapter
})

const globalForPrisma = global as unknown as {prisma: typeof prisma}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
export { prisma, Prisma }
