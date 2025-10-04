"use client"
import * as React from "react";

import {HeroUIProvider as HeroUIProviderComponent} from "@heroui/react";

export function HeroUIProvider({children}: {children: React.ReactNode}) {
  return (
    <HeroUIProviderComponent>
        {children}
    </HeroUIProviderComponent>
  );
}