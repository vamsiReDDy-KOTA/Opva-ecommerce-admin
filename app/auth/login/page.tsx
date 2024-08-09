"use client"

import { LoginForm } from "@/components/auth/login-form";
import { useRouter } from "next/navigation";

interface LoginButtonProps{
    children: React.ReactNode;
    mode? : "modal" | "redirect",
    asChild? : boolean;
}

const LoginPage = ( {
    children,
    mode = "redirect",
    asChild
}: LoginButtonProps ) => {

    const router = useRouter();

    const onClick =  ()=>{
        router.push("/auth/login")
    }
  return (
    <LoginForm/>
  )
}

export default LoginPage