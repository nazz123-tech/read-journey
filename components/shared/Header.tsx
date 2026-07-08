"use client";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/services/store/authStore";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/api/clientApi";
import Modal from "./Modal";

export const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    logout();
    router.push("/login");
  };

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    return `relative pb-1 font-main font-medium transition-colors duration-200 ${
      isActive
        ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-blue-500"
        : "text-inactive hover:text-foreground"
    }`;
  };

  return (
    <header className="mb-[10px]">
      <div className="flex flex-row justify-between px-[20px] h-14 bg-blocks rounded-2xl items-center">
        <Link
          className="flex flex-row h-[17px] items-center gap-1"
          href={"/recommended"}
        >
          <Image
            width={42}
            className="hidden md:block"
            height={17}
            alt="logo"
            src={"/Logo.png"}
          />
          <Image
            width={42}
            className="block md:hidden"
            height={17}
            alt="logo"
            src={"/images/logo-mobile.png"}
          />
          <span className="hidden xl:block font-title">READ JOURNEY</span>
        </Link>

        <nav className="hidden md:flex md:flex-row gap-8 xl:gap-10">
          <Link href={"/recommended"} className={getLinkClass("/recommended")}>
            Home
          </Link>
          <Link
            href={"/library"}
            className={
              getLinkClass("/library") === "/library"
                ? getLinkClass("/library")
                : getLinkClass("/library")
            }
          >
            My Library
          </Link>
        </nav>

        <div className="flex flex-row items-center gap-[10px] md:gap-[16px]">
          <div className="flex flex-row items-center justify-center bg-inputs border rounded-full w-[35px] h-[35px] border-zinc-50/20 font-bold leading-none tracking-tight text-center font-main">
            {user?.name?.[0]}
          </div>
          <span className="hidden xl:block font-main font-bold leading-[18px] tracking-tight text-center text-foreground">
            {user?.name}
          </span>
          <button
            className="hidden md:block black-button w-[91px] h-[38px] md:w-[114px] md:h-[42px] mt-auto font-main font-bold border border-zinc-50/20 hover:bg-foreground hover:text-background hover:border-transparent"
            onClick={handleLogout}
          >
            Log out
          </button>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden"
          >
            <Image alt="menu" width={28} height={28} src={"/menu.svg"} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <Modal onClose={() => setMenuOpen(false)} variant="menu">
          <div className="flex flex-col items-center justify-between h-full min-h-[80vh] md:hidden">
            <nav className="flex flex-col items-start mt-[200px] leading-[1.29] tracking-tight font-main text-[16px] justify-center gap-6">
              <Link
                href={"/recommended"}
                onClick={() => setMenuOpen(false)}
                className={getLinkClass("/recommended")}
              >
                Home
              </Link>
              <Link
                href={"/library"}
                onClick={() => setMenuOpen(false)}
                className={getLinkClass("/library")}
              >
                My library
              </Link>
            </nav>

            <button
              className="black-button w-[91px] h-[38px] mt-auto font-main font-bold border border-zinc-50/20 hover:bg-foreground hover:text-background hover:border-transparent"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </Modal>
      )}
    </header>
  );
};
