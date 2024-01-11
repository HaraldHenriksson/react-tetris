"use server";

import React from "react";
import Navbar from "@/components/Navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex flex-col flex-1">{children}</main>
    </div>
  );
}

export default Layout;
