import React from "react";
import { Meta,StoryObj} from "@storybook/react";
import   Banner from "./Banner";

const meta:Meta<typeof Banner> ={
    component:Banner,
    title:'Banner',
    tags:['autodocs'],
    argTypes:{
       variant :{
        control:{ type :'text'},
        options:['Info','congrats','documentation','danger']
       }  
    }
}
type Story = StoryObj<typeof meta>
/** default*/
export const Info :Story={
args:{
  children: "Children Informations",
  variant: "info",
}
};
export const Danger:Story={
args:{
 children: "Children are in danger",
 variant: "danger",
}
};
export const Congrats:Story={
args:{
 children: "Children are conglatulated",
 variant: "congrats",
}
};
export const Documentation:Story={
args:{
  children: "Children must read more docs",
  variant: "documentation",
}
};

export default meta;



