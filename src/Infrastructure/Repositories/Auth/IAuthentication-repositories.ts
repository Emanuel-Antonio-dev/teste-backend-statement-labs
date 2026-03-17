abstract class IAuthenticationRepositories
{
    abstract login(email: string):Promise<any>
}
export{IAuthenticationRepositories}