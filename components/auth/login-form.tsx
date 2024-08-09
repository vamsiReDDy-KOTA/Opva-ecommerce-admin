import { CardWrapper } from "./card-wrapperr"

export const LoginForm= () =>{
    return(
        
        <CardWrapper
        headerLabel="Welcome back"
        backButtonHref="/auth/signup"
        backButtonLabel="Don't have an account?"
        showSocial
         >
            Login Form!
         </CardWrapper>
        
        
    )
}