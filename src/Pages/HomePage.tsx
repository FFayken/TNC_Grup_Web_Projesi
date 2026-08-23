import { BrandHeader } from '../Components/BrandHeader'
import { TodoForm } from '../Components/TodoForm'
import { TodoList } from '../Components/TodoList'
import { useTodos } from '../hooks/useTodos'

export function HomePage() {
  const { todos, addTodo, updateTodo, toggleTodo, deleteTodo, clearCompleted } =
    useTodos()

  const remaining = todos.filter((todo) => !todo.completed).length
  const completed = todos.length - remaining

  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-10 px-5 py-12 sm:px-6 sm:py-16">
      <BrandHeader />

      <section className="relative z-10 space-y-5" aria-label="Görev yönetimi">
        <TodoForm onAdd={addTodo} />

        <div className="flex items-center justify-between gap-3 text-sm text-[var(--muted)]">
          <p>
            {todos.length === 0
              ? 'Henüz görev yok'
              : `${remaining} açık · ${completed} tamamlandı`}
          </p>
          {completed > 0 && (
            <button
              type="button"
              onClick={clearCompleted}
              className="font-medium text-[var(--ink)] underline-offset-4 transition hover:underline"
            >
              Tamamlananları temizle
            </button>
          )}
        </div>

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </section>
    </main>
  )
}
