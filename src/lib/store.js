import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',

      addTodo: ({ title, description = "", priority = "medium", completed = false, createdAt }) => {
        const newTodo = {
          id: Date.now().toString(),
          title: title.trim(),
          description: description.trim(),
          priority,
          completed,
          createdAt: createdAt || new Date().toISOString(),
        }
        set((state) => ({ todos: [...state.todos, newTodo] }))
      },

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),

      deleteTodo: (id) =>
        set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),

      editTodo: (id, newTitle) => {
        if (!newTitle.trim()) return
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, title: newTitle.trim() } : t
          ),
        }))
      },

      clearCompleted: () =>
        set((state) => ({ todos: state.todos.filter((t) => !t.completed) })),

      setFilter: (filter) => set({ filter }),

      getFilteredTodos: () => {
        const { todos, filter } = get()
        if (filter === 'active') return todos.filter((t) => !t.completed)
        if (filter === 'completed') return todos.filter((t) => t.completed)
        return todos
      },

      getActiveTodosCount: () => get().todos.filter((t) => !t.completed).length,
      getCompletedTodosCount: () => get().todos.filter((t) => t.completed).length,

      darkMode: true,
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

      isAnimating: false,
      setIsAnimating: (isAnimating) => set({ isAnimating }),

      soundEnabled: true,
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
    }),
    {
      name: 'neo-brutalism-todo-storage',
      partialize: (s) => ({
        todos: s.todos,
        filter: s.filter,
        darkMode: s.darkMode,
        soundEnabled: s.soundEnabled,
      }),
    }
  )
)

export default useStore
