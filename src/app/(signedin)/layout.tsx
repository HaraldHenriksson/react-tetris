import React from "react";
import Navbar from "@/components/Navbar";
import MusicControl from "@/components/MusicControl";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <MusicControl />
      <main>{children}</main>
    </>
  );
}

export default Layout;
