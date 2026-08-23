import { useState, type FormEvent } from 'react'
import { Plus } from 'lucide-react'

interface TodoFormProps {
  onAdd: (title: string) => void
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = title.trim()
    if (!value) return
    onAdd(value)
    setTitle('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="form-enter relative z-10 flex flex-col gap-3 sm:flex-row"
      aria-label="Yeni görev ekle"
    >
      <label className="sr-only" htmlFor="todo-title">
        Görev başlığı
      </label>
      <input
        id="todo-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Örn. Proje README dosyasını yaz"
        autoComplete="off"
        className="min-h-14 flex-1 rounded-2xl border border-[var(--line)] bg-white/80 px-5 text-base text-[var(--ink)] outline-none backdrop-blur transition placeholder:text-[var(--muted)] focus:border-[var(--ink)] focus:ring-4 focus:ring-[var(--ink)]/10"
      />
      <button
        type="submit"
        className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[var(--ink)] px-6 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--ink-strong)] active:translate-y-0"
      >
        <Plus size={18} strokeWidth={2.5} />
        Ekle
      </button>
    </form>
  )
}
