import Shell from "@/components/Shell";

export default function NotFound() {
  return (
    <Shell depth={0}>
      <section className="frame grid min-h-[70vh] place-content-center py-32 text-center">
        <p className="eyebrow text-pink-deep">404</p>
        <h1 className="mt-4 font-display text-[clamp(3rem,9vw,8rem)] font-extrabold leading-[0.9] tracking-tightest">
          Lost in the <span className="serif-accent font-normal text-lav-deep">layout.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-ink-soft">This page doesn&apos;t exist. The work does.</p>
        <a href="/" className="mx-auto mt-8 inline-flex rounded-full bg-ink px-6 py-3 font-semibold text-paper">Back home</a>
      </section>
    </Shell>
  );
}
