import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { PublicRoute } from "./Decorators/public.decorator";
import { SignInService } from "./auth.service";

@ApiTags("Authentication")
@Controller("auth")
class SignInController {
  constructor(private readonly service: SignInService) {}

  @ApiOperation({ summary: "Autenticação do admin." })
  @ApiResponse({ status: 200, description: "Logado com sucesso." })
  @ApiResponse({ status: 400, description: "Campos inválidos ou em falta." })
  @ApiResponse({ status: 401, description: "Credenciais inválidas." })
  @ApiResponse({ status: 500, description: "Erro interno do servidor." })
  @ApiBody({
    schema:{
      type:"object",
      properties:{
        email: {type: "string", example:"systemaadmin@gmail.com"},
        password:{type:"string", example:"system_admin@2025!#####"}
      }
    }
  })
  @PublicRoute()
  @Post("/signin")
  async login(
    @Body() datas: {email: string, password: string}
  ) {
    return await this.service.signIn(datas.email, datas.password);
}
}
export{SignInController}