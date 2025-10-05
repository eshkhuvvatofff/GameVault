import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/20" />
      <div className="absolute -top-1/2 -left-1/2 size-[80vmax] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-1/2 -right-1/2 size-[70vmax] rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(closest-side,theme(colors.primary/10),transparent)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      <div className="relative z-10 mx-auto max-w-xl px-6 text-center">
        <div className="inline-flex items-center justify-center rounded-2xl border bg-background/60 p-2.5 backdrop-blur shadow-sm">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Error
          </span>
        </div>

        <h1 className="mt-6 text-7xl font-black leading-none tracking-tight sm:text-8xl">
          <span className="bg-gradient-to-b from-foreground to-muted-foreground/70 bg-clip-text text-transparent">
            404
          </span>
        </h1>

        <p className="mt-4 text-balance text-base text-muted-foreground sm:text-lg">
          The page you’re looking for doesn’t exist, was moved, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition hover:shadow-md"
          >
            Go Home
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
          >
            Explore
          </Link>
        </div>
      </div>
    </section>
  )
}