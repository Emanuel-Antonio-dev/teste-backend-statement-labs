import { PrismaService } from "./prisma-service";
import bcrypt from "bcrypt"

const prisma = new PrismaService()
async function adminSeed() {
    const password = process.env.ADMIN_PASSWORD || "system_admin@2025!#"
    const email = process.env.ADMIN_EMAIL || "systemaadmin@gmail.com"

    const datas = {
        email,
        password_hash: await bcrypt.hash(password, 10),
        username: process.env.ADMIN_USERNAME || "@@system_admin.2026"
    }

    await prisma.admin.upsert({
        where: { email: datas.email },
        update: { password_hash: datas.password_hash },
        create: { ...datas }
    })

    console.log("Admin seed concluído")
}
async function spotsSeed()
{
    const spotsCreated:any = []
    for(let i = 1; i<=50; i++)
    {
        spotsCreated.push({
            spot_number: i,
            spot_status: "LIVRE"
        })
    }
    await prisma.parkingSpot.createMany({
        skipDuplicates: true,
        data:spotsCreated
    })

    console.log("Seed terminado.")

}
async function mainSeed()
{
    await adminSeed()
    await spotsSeed()
}
if (require.main === module) {
    mainSeed()
        .catch((error) => {
            console.log(error)
        })
        .finally(async () => {
            await prisma.$disconnect()
        })
}
export{adminSeed, spotsSeed, mainSeed}