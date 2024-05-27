/** @jsxImportSource @emotion/react */
import React, { ReactNode } from "react";

interface BannerProps {
  variant?: "info" | "congrats" | "documentation" | "danger";
  children: ReactNode;
}

export default function Banner({ variant = "info", children }: BannerProps) {
  return <aside>{children}</aside>;
}
