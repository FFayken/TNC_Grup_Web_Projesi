import { Check } from 'lucide-react'

export function BrandHeader() {
  return (
    <header className="hero-enter relative z-10 flex flex-col items-start gap-5">
      <div className="inline-flex items-center gap-3">
        <span
          className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--ink)] text-[var(--accent)] shadow-[0_12px_30px_rgba(15,61,56,0.28)]"
          aria-hidden="true"
        >
          <Check size={22} strokeWidth={3} />
        </span>
        <p className="font-display text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
          Sıra
        </p>
      </div>

      <div className="max-w-xl space-y-3">
        <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-[var(--ink)] sm:text-4xl">
          Bugünün işlerini sıraya koy.
        </h1>
        <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          Ekle, listele, güncelle, sil — görevlerin tarayıcında LocalStorage ile
          kalır.
        </p>
      </div>
    </header>
  )
}
