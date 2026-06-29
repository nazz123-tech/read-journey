"use client";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/services/store/authStore";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/api/clientApi";

export const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = async () => {
    logout();
    await logoutUser();
    router.push("/login");
  };

  return (
    <header className="">
      <div className="flex flex-row justify-between items-center">
        <Link className="flex flex-row" href={"/recommended"}>
          <Image width={50} height={20} alt="logo" src={"/logo.png"}></Image>
          <span className="hidden md:block">Read Journey</span>
        </Link>
        <nav className="hidden md:flex md:flex-row">
          <Link href={"/recommended"}>Home</Link>
          <Link href={"/library"}>My Library</Link>
        </nav>
        <div className="flex flex-row items-center">
          <div className="">{user?.name?.[0]}</div>
          <span className="hidden md:block">{user?.name}</span>
          <button className="hidden md:block" onClick={handleLogout}>
            Logout
          </button>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden"
          >
            <Image alt="menu" width={20} height={20} src={"/menu-04.svg"} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden">
          <nav>
            <Link href={"/recommended"} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href={"/library"} onClick={() => setMenuOpen(false)}>
              My library
            </Link>
            <button onClick={handleLogout}></button>
          </nav>
        </div>
      )}
    </header>
  );
};
