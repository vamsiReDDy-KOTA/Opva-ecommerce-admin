import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LoginPage from "./auth/login/page";
import LoginButton from "@/components/auth/login-button";

export default function SetupPage() {
  return (

      <main className="flex h-full flex-col items-center justify-center">
        <div className="space-y-6 text-center" >
            <h1 className={cn("text-6xl font-semibold")} >
              Auth
            </h1>
            <p className="text-lg" >
              A simple authentication service
            </p>
            <div>
              <LoginButton>
              <Button variant="secondary" size="lg" >
                Sign in
              </Button>
              </LoginButton>
            </div>
        </div>
      </main>
    
  );
}
