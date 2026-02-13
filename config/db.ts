import {PrismaPg} from '@prisma/adapter-pg'
import {Prisma, PrismaClient} from '../generated/prisma/client'

const globalForPrisma = global as unknown as {prisma: PrismaClient}

const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		log: ['query', 'info', 'warn', 'error'],
		adapter: new PrismaPg({
			connectionString: process.env.DATABASE_URL
		})
	})

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma
}

export {prisma, Prisma}
