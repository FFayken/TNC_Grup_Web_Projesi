import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { Check, Pencil, Trash2, X } from 'lucide-react'
import type { Todo } from '../Interfaces/Todo'

interface TodoItemProps {
  todo: Todo
  index: number
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({
  todo,
  index,
  onToggle,
  onUpdate,
  onDelete,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  function startEdit() {
    setDraft(todo.title)
    setIsEditing(true)
  }

  function cancelEdit() {
    setDraft(todo.title)
    setIsEditing(false)
  }

  function saveEdit() {
    const value = draft.trim()
    if (!value) {
      cancelEdit()
      return
    }
    onUpdate(todo.id, value)
    setIsEditing(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    saveEdit()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      cancelEdit()
    }
  }

  return (
    <li
      className="item-enter group flex items-start gap-3 border-b border-[var(--line)] py-4 last:border-b-0"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition ${
          todo.completed
            ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--accent)]'
            : 'border-[var(--line-strong)] bg-white text-transparent hover:border-[var(--ink)]'
        }`}
        aria-label={todo.completed ? 'Tamamlanmadı olarak işaretle' : 'Tamamlandı olarak işaretle'}
      >
        <Check size={14} strokeWidth={3} />
      </button>

      <div className="min-w-0 flex-1">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-11 w-full rounded-xl border border-[var(--ink)] bg-white px-3 text-base text-[var(--ink)] outline-none focus:ring-4 focus:ring-[var(--ink)]/10"
              aria-label="Görevi düzenle"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-[var(--ink)] px-3 text-sm font-semibold text-white"
              >
                <Check size={16} />
                Kaydet
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[var(--line)] bg-white px-3 text-sm font-semibold text-[var(--muted)]"
              >
                <X size={16} />
                Vazgeç
              </button>
            </div>
          </form>
        ) : (
          <p
            className={`break-words text-base leading-relaxed transition ${
              todo.completed
                ? 'text-[var(--muted)] line-through decoration-[var(--line-strong)]'
                : 'text-[var(--ink)]'
            }`}
          >
            {todo.title}
          </p>
        )}
      </div>

      {!isEditing && (
        <div className="flex shrink-0 gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          <button
            type="button"
            onClick={startEdit}
            className="grid h-9 w-9 place-items-center rounded-xl text-[var(--muted)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--ink)]"
            aria-label="Görevi düzenle"
          >
            <Pencil size={16} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(todo.id)}
            className="grid h-9 w-9 place-items-center rounded-xl text-[var(--muted)] transition hover:bg-red-50 hover:text-red-600"
            aria-label="Görevi sil"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </li>
  )
}
