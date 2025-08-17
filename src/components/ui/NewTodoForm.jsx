import React, { useState } from 'react'
import { useTodos } from '../../lib/store'
import { cn } from '../../lib/utils'
import { Plus, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function NewTodoForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addTodo } = useTodos()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300)) // Simulate async operation
      
      addTodo({
        title: title.trim(),
        description: description.trim(),
        priority,
        completed: false,
        createdAt: new Date().toISOString()
      })

      // Reset form
      setTitle('')
      setDescription('')
      setPriority('medium')
      setIsOpen(false)
    } catch (error) {
      console.error('Error adding todo:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const priorityColors = {
    low: 'bg-green-500 border-green-600',
    medium: 'bg-yellow-500 border-yellow-600',
    high: 'bg-red-500 border-red-600'
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            key="trigger"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(true)}
            className={cn(
              "w-full p-6 bg-zinc-800 border-4 border-zinc-700",
              "shadow-[8px_8px_0px_0px_rgba(113,113,122,1)]",
              "hover:shadow-[6px_6px_0px_0px_rgba(113,113,122,1)]",
              "hover:translate-x-[2px] hover:translate-y-[2px]",
              "transition-all duration-200",
              "flex items-center justify-center gap-3",
              "text-zinc-100 font-bold text-lg",
              "focus:outline-none focus:ring-4 focus:ring-zinc-500"
            )}
          >
            <Plus className="w-6 h-6" />
            Add New Task
          </motion.button>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className={cn(
              "w-full p-6 bg-zinc-800 border-4 border-zinc-700",
              "shadow-[8px_8px_0px_0px_rgba(113,113,122,1)]",
              "space-y-4"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-zinc-100">New Task</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "p-2 bg-zinc-700 border-2 border-zinc-600",
                  "shadow-[4px_4px_0px_0px_rgba(113,113,122,1)]",
                  "hover:shadow-[2px_2px_0px_0px_rgba(113,113,122,1)]",
                  "hover:translate-x-[2px] hover:translate-y-[2px]",
                  "transition-all duration-200",
                  "text-zinc-100",
                  "focus:outline-none focus:ring-2 focus:ring-zinc-500"
                )}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-bold text-zinc-300 mb-2">
                Task Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                required
                className={cn(
                  "w-full p-3 bg-zinc-900 border-3 border-zinc-600",
                  "shadow-[4px_4px_0px_0px_rgba(39,39,42,1)]",
                  "text-zinc-100 placeholder-zinc-500",
                  "focus:outline-none focus:border-zinc-400",
                  "focus:shadow-[6px_6px_0px_0px_rgba(39,39,42,1)]",
                  "transition-all duration-200",
                  "font-medium"
                )}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-bold text-zinc-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more details..."
                rows={3}
                className={cn(
                  "w-full p-3 bg-zinc-900 border-3 border-zinc-600",
                  "shadow-[4px_4px_0px_0px_rgba(39,39,42,1)]",
                  "text-zinc-100 placeholder-zinc-500",
                  "focus:outline-none focus:border-zinc-400",
                  "focus:shadow-[6px_6px_0px_0px_rgba(39,39,42,1)]",
                  "transition-all duration-200",
                  "font-medium resize-none"
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-zinc-300 mb-2">
                Priority
              </label>
              <div className="flex gap-3">
                {['low', 'medium', 'high'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={cn(
                      "px-4 py-2 border-3 font-bold text-sm uppercase tracking-wider",
                      "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                      "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                      "hover:translate-x-[2px] hover:translate-y-[2px]",
                      "transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-zinc-500",
                      priority === p
                        ? `${priorityColors[p]} text-black`
                        : "bg-zinc-700 border-zinc-600 text-zinc-300 hover:bg-zinc-600"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className={cn(
                  "flex-1 py-3 px-6 bg-green-500 border-3 border-green-600",
                  "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                  "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                  "hover:translate-x-[2px] hover:translate-y-[2px]",
                  "transition-all duration-200",
                  "text-black font-bold",
                  "focus:outline-none focus:ring-2 focus:ring-green-400",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                  "disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                )}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full mx-auto"
                  />
                ) : (
                  "Add Task"
                )}
              </button>
              
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-6 py-3 bg-zinc-700 border-3 border-zinc-600",
                  "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                  "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                  "hover:translate-x-[2px] hover:translate-y-[2px]",
                  "transition-all duration-200",
                  "text-zinc-100 font-bold",
                  "focus:outline-none focus:ring-2 focus:ring-zinc-500"
                )}
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}