import { useEffect, useState } from 'react'
import type { Todo } from '../Interfaces/Todo'

const STORAGE_KEY = 'sira-todos'

function readTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as Todo[]
  } catch {
    return []
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => readTodos())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo(title: string) {
    const trimmed = title.trim()
    if (!trimmed) return

    const now = new Date().toISOString()
    const next: Todo = {
      id: crypto.randomUUID(),
      title: trimmed,
      completed: false,
      createdAt: now,
      updatedAt: now,
    }

    setTodos((current) => [next, ...current])
  }

  function updateTodo(id: string, title: string) {
    const trimmed = title.trim()
    if (!trimmed) return

    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? { ...todo, title: trimmed, updatedAt: new Date().toISOString() }
          : todo,
      ),
    )
  }

  function toggleTodo(id: string) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date().toISOString(),
            }
          : todo,
      ),
    )
  }

  function deleteTodo(id: string) {
    setTodos((current) => current.filter((todo) => todo.id !== id))
  }

  function clearCompleted() {
    setTodos((current) => current.filter((todo) => !todo.completed))
  }

  return {
    todos,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  }
}
