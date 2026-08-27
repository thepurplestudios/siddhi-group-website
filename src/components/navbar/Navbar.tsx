"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed inset-x-0 top-0 z-[100]">
        <div className="flex h-[82px] w-full items-center justify-between px-6 sm:px-8 md:h-[88px] md:px-10 lg:px-14">
          {/* LOGO */}
          <Link
            href="/"
            aria-label="Siddhi Group home"
            onClick={() => setMenuOpen(false)}
            className="relative z-[110] flex items-center gap-4"
          >
            <div className="font-ui leading-[0.78] text-white">
              <div className="text-[20px] font-semibold tracking-[-0.06em] sm:text-[21px]">
                SIDDHI
              </div>

              <div className="text-[20px] font-semibold tracking-[-0.06em] sm:text-[21px]">
                GROUP
              </div>
            </div>

            <div className="hidden h-8 w-px bg-white/40 sm:block" />

            <span className="hidden font-ui text-[8px] uppercase leading-[1.45] tracking-[0.18em] text-white/70 sm:block">
              Builders
              <br />& Developers
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative py-2 font-ui text-[10px] uppercase tracking-[0.18em] !text-white transition-opacity duration-300 hover:opacity-70"
              >
                {item.label}

                <span
                  className={`absolute bottom-0 left-0 h-px bg-[var(--siddhi-red)] transition-all duration-300 ${
                    item.label === "Home" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="relative z-[110] flex h-11 w-11 items-center justify-center rounded-full border border-white/60 md:hidden"
          >
            {menuOpen ? (
              <span className="relative block h-5 w-5">
                <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-white" />
                <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-white" />
              </span>
            ) : (
              <span className="flex w-5 flex-col gap-[5px]">
                <span className="h-px w-full bg-white" />
                <span className="h-px w-3/4 self-end bg-white" />
              </span>
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[90] bg-[#181716] transition-all duration-500 md:hidden ${
          menuOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-7 pb-8 pt-[120px]">
          {/* Menu label */}
          <div className="mb-10 flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--siddhi-red)]" />

            <span className="font-ui text-[9px] uppercase tracking-[0.25em] text-white/60">
              Siddhi Group
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-col">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between border-b border-white/10 py-5"
              >
                <span className="font-display text-[42px] leading-none tracking-[-0.04em] text-white">
                  {item.label}
                </span>

                <span className="font-ui text-[9px] tracking-[0.15em] text-white/40">
                  0{index + 1}
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom information */}
          <div className="mt-auto flex items-end justify-between">
            <div className="font-ui text-[9px] uppercase leading-[1.6] tracking-[0.18em] text-white/50">
              Siddhi Group
              <br />
              Rajkot · Gujarat
            </div>

            <div className="font-gujarati text-sm text-white/50">
              સિદ્ધિ ગ્રુપ
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
