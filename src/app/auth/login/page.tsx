"use client"
import { LoginButton } from "@/modules/auth/components/login-button";
import { Card, Button, CardBody, CardHeader } from "@heroui/react";
import { CloudLightning } from "lucide-react";

export default function LoginPage(){
    return(
        <div>
            <div className="flex justify-center items-center">
            <div className="">
                <Card className="shadow-lg">
                    <CardHeader className="flex justify-center text-center pb-4">
                    <div className="flex flex-col items-center gap-4 h">
                        <div className="p-4 bg-primary-100 rounded-full">
                        <CloudLightning className="w-12 h-12 text-primary-600" />
                        </div>
                        <div>
                        <h1 className="text-3xl font-bold text-primary-600">
                            {/* {siteConfig.name} */}
                            Cloc One
                        </h1>
                        <p className="text-default-600 mt-2">
                            Accede con tu cuenta empresarial
                        </p>
                        </div>
                    </div>
                    </CardHeader>
                    
                    <CardBody className="space-y-6">
                        <LoginButton />
                    </CardBody>
                </Card>
                
                <div className="text-center mt-8">
                    <p className="text-sm text-default-400">
                    {/* {siteConfig.description} */}
                    Accede con tu cuenta empresarial
                    </p>
                </div>
                </div>
            </div>
        </div>
    )
}