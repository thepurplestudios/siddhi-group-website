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
      <div className="mx-auto flex h-[92px] w-full items-center justify-between border-b border-white/25 px-7 md:px-10 lg:px-14">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Siddhi Group"
          className="flex items-center gap-5"
        >
          <div className="font-ui leading-[0.8] text-white">
            <div className="text-[22px] font-semibold tracking-[-0.06em]">
              SIDDHI
            </div>

            <div className="text-[22px] font-semibold tracking-[-0.06em]">
              GROUP
            </div>
          </div>

          <div className="hidden h-9 w-px bg-white/40 sm:block" />

          <span className="hidden font-ui text-[8px] uppercase leading-[1.5] tracking-[0.18em] !text-white/70 sm:block">
            Builders
            <br />& Developers
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-9 md:flex">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative py-2 font-ui text-[11px] uppercase tracking-[0.16em] !text-white transition-opacity duration-300 hover:!text-white"
            >
              {item.label}

              <span
                className={`absolute -bottom-1 left-0 h-px bg-textwwtrtson-all duration-300 ${
                  index === 0 ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <button
          type="button"
          aria-label="Open navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 md:hidden"
        >
          <span className="flex w-4 flex-col gap-[5px]">
            <span className="h-px w-full bg-white" />
            <span className="h-px w-full bg-white" />
          </span>
        </button>
      </div>
    </header>
  );
}
