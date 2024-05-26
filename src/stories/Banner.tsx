/** @jsxImportSource @emotion/react */
import React, { ReactNode } from "react";

interface BannerProps {
   /** Some description*/
  variant?: "info" | "congrats" | "documentation" | "danger";
  children: ReactNode;
}
/** Some comment about my banner component*/
export default function Banner({ variant = "info", children }: BannerProps) {
    
//   return <aside>{children}</aside>;
return(
    <div style={{
        background:'green',
        padding:20,
        borderRadius:40,
        margin:50,
        textAlign:'center',
        color:'white'
        
    }}>
        {children}

    </div>
)
}
