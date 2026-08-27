import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* Temporary section so we can see where the hero ends */}
      <section className="flex min-h-screen items-center justify-center bg-[var(--siddhi-black)] text-[var(--siddhi-cream)]">
        <div className="text-center">
          <span className="font-ui text-[10px] uppercase tracking-[0.2em] text-text-white">
            Next
          </span>

          <h2 className="font-display mt-5 text-6xl">Our Projects</h2>
        </div>
      </section>
    </main>
  );
}
