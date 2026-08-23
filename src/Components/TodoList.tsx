import type { Todo } from '../Interfaces/Todo'
import { TodoItem } from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onToggle, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="empty-enter rounded-3xl border border-dashed border-[var(--line-strong)] bg-white/50 px-6 py-14 text-center backdrop-blur">
        <p className="font-display text-xl font-bold text-[var(--ink)]">
          Listen henüz boş
        </p>
        <p className="mt-2 text-[var(--muted)]">
          Yukarıdan ilk görevini ekleyerek başla.
        </p>
      </div>
    )
  }

  return (
    <ul className="list-enter rounded-3xl border border-[var(--line)] bg-white/75 px-4 backdrop-blur sm:px-6">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
