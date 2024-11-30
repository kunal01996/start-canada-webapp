/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    // Check if 'SingleChoice' question type exists
    const singleChoiceQuestion = await prisma.questionType.findFirst({
        where: { name: 'SingleChoice' }
    })

    if (!singleChoiceQuestion) {
        // If it doesn't exist, create it
        await prisma.questionType.create({
            data: {
                name: 'SingleChoice',
                description: 'Single answer questions',
                isEnabled: true
            }
        })
        console.log('Created question type: SingleChoice')
    } else {
        console.log('Question type "SingleChoice" already exists.')
    }

    // Check if 'MultipleChoice' question type exists
    const multipleChoiceQuestion = await prisma.questionType.findFirst({
        where: { name: 'MultipleChoice' }
    })

    if (!multipleChoiceQuestion) {
        // If it doesn't exist, create it
        await prisma.questionType.create({
            data: {
                name: 'MultipleChoice',
                description: 'Multiple answer questions',
                isEnabled: true
            }
        })
        console.log('Created question type: MultipleChoice')
    } else {
        console.log('Question type "MultipleChoice" already exists.')
    }

    // Check if 'Admin' user type exists
    const adminUserType = await prisma.userType.findFirst({
        where: { name: 'Admin' }
    })

    if (!adminUserType) {
        // If it doesn't exist, create it
        await prisma.userType.create({
            data: {
                name: 'Admin'
            }
        })
        console.log('Created user type: Admin')
    } else {
        console.log('User type "Admin" already exists.')
    }

    // Check if 'AppUser' user type exists
    const appUserType = await prisma.userType.findFirst({
        where: { name: 'AppUser' }
    })

    if (!appUserType) {
        // If it doesn't exist, create it
        await prisma.userType.create({
            data: {
                name: 'AppUser'
            }
        })
        console.log('Created user type: AppUser')
    } else {
        console.log('User type "AppUser" already exists.')
    }
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e); // Log any errors
        await prisma.$disconnect(); // Ensure disconnection even if an error occurs
        process.exit(1); 
    })
