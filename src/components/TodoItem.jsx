import { cn } from '../lib/utils'
import useTodos from '../lib/store'
import { motion } from 'framer-motion'
import { Trash2, Check, X } from 'lucide-react'

export default function TodoItem({ todo }) {
  const { toggleTodo, deleteTodo } = useTodos()

  const handleToggle = () => {
    toggleTodo(todo.id)
  }

  const handleDelete = () => {
    deleteTodo(todo.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "group relative bg-zinc-900 border-4 border-zinc-700 rounded-none p-4 mb-4 shadow-[8px_8px_0px_0px_#27272a] transition-all duration-200 hover:shadow-[12px_12px_0px_0px_#27272a] hover:translate-x-[-4px] hover:translate-y-[-4px]",
        todo.completed && "bg-zinc-800 border-zinc-600 opacity-75"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={handleToggle}
            className={cn(
              "w-8 h-8 border-3 border-zinc-400 bg-zinc-800 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95",
              todo.completed ? "bg-emerald-500 border-emerald-400" : "hover:border-emerald-400"
            )}
            aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {todo.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <Check className="w-5 h-5 text-zinc-900 font-bold" />
              </motion.div>
            )}
          </button>
          
          <span
            className={cn(
              "text-lg font-bold text-zinc-100 flex-1 transition-all duration-200",
              todo.completed && "line-through text-zinc-500"
            )}
          >
            {todo.text}
          </span>
        </div>

        <motion.button
          onClick={handleDelete}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 bg-red-500 border-3 border-red-400 flex items-center justify-center transition-all duration-200 hover:bg-red-400 hover:shadow-[4px_4px_0px_0px_#dc2626] opacity-0 group-hover:opacity-100"
          aria-label="Delete todo"
        >
          <Trash2 className="w-5 h-5 text-zinc-900 font-bold" />
        </motion.button>
      </div>

      {todo.completed && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.3 }}
          className="absolute top-1/2 left-4 right-16 h-1 bg-zinc-600 transform -translate-y-1/2"
        />
      )}
    </motion.div>
  )
}
