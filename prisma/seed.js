const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {

    const singleChoiceQuestion = await prisma.questionType.create({
        data: {
            name: 'SingleChoice',
            description: 'Single answer questions',
            isEnabled: true
        }
    })

    const multipleChoiceQuestion = await prisma.questionType.create({
        data: {
            name: 'MultipleChoice',
            description: 'Multiple answer questions',
            isEnabled: true
        }
    })

    console.log(`Created question type: ${singleChoiceQuestion.name}`);
    console.log(`Created question type: ${multipleChoiceQuestion.name}`);

    // couple of UserTypes

    const adminUserType = await prisma.userType.create({
        data: {
            name: 'Admin'
        }
    })

    const appUserType = await prisma.userType.create({
        data: {
            name: 'AppUser'
        }
    })

    console.log(`Created user type: ${adminUserType.name}`)
    console.log(`Created user type: ${appUserType.name}`)

}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e); // Log any errors
		await prisma.$disconnect(); // Ensure disconnection even if an error occurs
		process.exit(1); 
    })