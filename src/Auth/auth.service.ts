import { Inject, Injectable, NotFoundException, InternalServerErrorException, HttpException, BadRequestException, UnauthorizedException} from "@nestjs/common";
import { IAuthenticationRepositories } from "../Infrastructure/Repositories/Auth/IAuthentication-repositories";
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

@Injectable()
class SignInService
{
    constructor(@Inject(IAuthenticationRepositories) private readonly reposiory:IAuthenticationRepositories){}
    async signIn(email: string, password: string)
    {
        try
        {
            if(!email && !password)
            {
                throw new BadRequestException("Informe todos os dados")
            }
            const result = await this.reposiory.login(email)
            if(!result)
            {
                throw new UnauthorizedException("Credenciais inválidas.")
            }
            const isValidPassword = await bcrypt.compare(password, result.password_hash)
            if(!isValidPassword)
            {
                throw new UnauthorizedException("Credenciais inválidas.")
            }
            const payload = {sub: result.id, email: result.email}
            const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: "24h"})

            return {success: true, statusCode: 200, message: "Logado com sucesso", accessToken}
        } catch (error:any)
        {
            throw error instanceof HttpException
            ? error
            : new InternalServerErrorException("Ocorreu um erro interno, tente novamente");
        }
    }
}
export{SignInService}