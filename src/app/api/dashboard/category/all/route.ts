import { NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {

    // Build the where clause based on the provided conditions
    const whereClause: Prisma.QuizCategoryWhereInput = {
        isEnabled: true
    };

    const categories = await prisma.quizCategory.findMany({
        where: whereClause,
        include: {
            subcategories: {
              select: {
                id: true,
                name: true, // Include the category name
              },
            },
          },
    });

    return NextResponse.json({
        categories
    });
}