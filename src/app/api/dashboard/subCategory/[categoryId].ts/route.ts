import { NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const url = new URL(request.url);
    const categoryId = url.searchParams.get('categoryId');

    // Validate and parse categoryId
    const parsedCategoryId = categoryId ? parseInt(categoryId, 10) : NaN;
    if (categoryId && isNaN(parsedCategoryId)) {
        return NextResponse.json(
            { error: 'Invalid categoryId' },
            { status: 400 }
        );
    }

    // Build the where clause based on the provided conditions
    const whereClause: Prisma.QuizSubcategoryWhereInput = {
        isEnabled: true,
        ...(parsedCategoryId !== null && {
            AND: [{ categoryId: parsedCategoryId }],
        }),
    };

    try {
        const categories = await prisma.quizSubcategory.findMany({
            where: whereClause,
        });

        return NextResponse.json({ categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching categories' },
            { status: 500 }
        );
    }
}
