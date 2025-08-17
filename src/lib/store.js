import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      // Todo state
      todos: [],
      filter: 'all', // 'all', 'active', 'completed'
      
      // Todo actions
      addTodo: (text) => {
        const newTodo = {
          id: Date.now().toString(),
          text: text.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          todos: [...state.todos, newTodo]
        }))
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        }))
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id)
        }))
      },

      editTodo: (id, newText) => {
        if (!newText.trim()) return
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text: newText.trim() } : todo
          )
        }))
      },

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed)
        }))
      },

      setFilter: (filter) => {
        set({ filter })
      },

      // Computed values
      getFilteredTodos: () => {
        const { todos, filter } = get()
        switch (filter) {
          case 'active':
            return todos.filter((todo) => !todo.completed)
          case 'completed':
            return todos.filter((todo) => todo.completed)
          default:
            return todos
        }
      },

      getActiveTodosCount: () => {
        const { todos } = get()
        return todos.filter((todo) => !todo.completed).length
      },

      getCompletedTodosCount: () => {
        const { todos } = get()
        return todos.filter((todo) => todo.completed).length
      },

      // UI state
      darkMode: true,
      toggleDarkMode: () => {
        set((state) => ({ darkMode: !state.darkMode }))
      },

      // Animation state
      isAnimating: false,
      setIsAnimating: (isAnimating) => {
        set({ isAnimating })
      },

      // Sound effects toggle
      soundEnabled: true,
      toggleSound: () => {
        set((state) => ({ soundEnabled: !state.soundEnabled }))
      },
    }),
    {
      name: 'neo-brutalism-todo-storage',
      partialize: (state) => ({
        todos: state.todos,
        filter: state.filter,
        darkMode: state.darkMode,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
)

export default useStore