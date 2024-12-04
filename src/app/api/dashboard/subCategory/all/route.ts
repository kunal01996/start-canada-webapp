import { NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {

    // Build the where clause based on the provided conditions
    const whereClause: Prisma.QuizSubcategoryWhereInput = {
        isEnabled: true
    };

    const categories = await prisma.quizSubcategory.findMany({
        where: whereClause
    });

    return NextResponse.json({
        categories
    });
}