"use client";

import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <div className="flex h-[88px] w-full items-center justify-between px-7 md:px-10 lg:px-14">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Siddhi Group"
          className="group flex items-center gap-5"
        >
          <div className="font-ui leading-[0.78] text-white">
            <div className="text-[21px] font-semibold tracking-[-0.06em]">
              SIDDHI
            </div>

            <div className="text-[21px] font-semibold tracking-[-0.06em]">
              GROUP
            </div>
          </div>

          <div className="hidden h-8 w-px bg-white/40 sm:block" />

          <span className="hidden font-ui text-[8px] uppercase leading-[1.45] tracking-[0.18em] text-white/70 sm:block">
            Builders
            <br />& Developers
          </span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Mobile menu */}
        <button
          type="button"
          aria-label="Open navigation menu"
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="flex w-5 flex-col gap-[5px]">
            <span className="h-px w-full bg-white" />
            <span className="h-px w-3/4 self-end bg-white" />
          </span>
        </button>
      </div>
    </header>
  );
}
