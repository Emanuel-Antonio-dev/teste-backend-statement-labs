import { PrismaService } from "../../Database/prisma-service";
import { Injectable } from "@nestjs/common";
import { IAuthenticationRepositories } from "./IAuthentication-repositories";

@Injectable()
class PrismaAuthenticationRepositories implements IAuthenticationRepositories
{
    constructor(private readonly prisma: PrismaService){}
    async login(email: string): Promise<any> {
        return await this.prisma.admin.findFirst({where:{email: email}})
    }
}
export{PrismaAuthenticationRepositories}