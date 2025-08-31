"use client";

import banner from "@/public/banner-sm.webp";
import logo from "@/public/logo_bein.png";
import logoText from "@/public/logo_beincomm_text_only.webp";
import { useSearch } from "@/zustand";
import Image from "next/image";
import { useCallback, useState } from "react";
import { NavUser } from "../nav-user";
import { Input } from "../ui/input";

const Header = () => {
  const { search, setSearch } = useSearch();
  const [value, setValue] = useState("");

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      setSearch(value);
      setValue('')
    }
  },[value,search]);


  return (
    <header className="flex px-6 fixed top-0 bg-white shadow-sm flex-row justify-between items-center gap-12 w-full h-15 z-1">
      <div className="flex flex-row gap-x-4 min-w-[320px] items-center">
        <div className="flex flex-row gap-x-1.5  items-center">
          <Image src={logo} width={28} height={28} alt="logo" />
          <Image src={logoText} width={110} height={22} alt="logoText" />
        </div>
        <Image src={banner} width={160} height={40} alt="banner" />
      </div>
      <Input
        className="h-10 w-full"
        placeholder="Search content"
        onKeyDown={handleInputKeyDown}
        value={value}
        onChange={(e) => {
          setValue(e.target.value as string);
        }}
      />
      <NavUser />
    </header>
  );
};

export default Header;
