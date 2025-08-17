import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';
import { useTodos } from '../lib/store';

const TodoList = () => {
  const { todos, filter } = useTodos();

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <motion.div 
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gray-800 border-4 border-gray-600 p-8 shadow-[8px_8px_0px_0px_#374151] transform rotate-1">
          <h3 className="text-2xl font-black text-gray-300 mb-4 transform -rotate-1">
            {filter === 'completed' ? 'NO COMPLETED TASKS' : 
             filter === 'active' ? 'NO ACTIVE TASKS' : 'NO TASKS YET'}
          </h3>
          <p className="text-gray-400 font-bold text-lg">
            {filter === 'all' ? 'ADD SOME TASKS TO GET STARTED!' : 
             filter === 'active' ? 'ALL TASKS ARE DONE!' : 'COMPLETE SOME TASKS!'}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="popLayout">
        {filteredTodos.map((todo, index) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1,
              transition: { 
                duration: 0.3, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 100
              }
            }}
            exit={{ 
              opacity: 0, 
              x: 50, 
              scale: 0.9,
              transition: { duration: 0.2 }
            }}
            layout
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className="transform hover:rotate-1 transition-transform duration-200"
          >
            <TodoItem todo={todo} />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* List Stats */}
      <motion.div 
        className="mt-8 pt-6 border-t-4 border-gray-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="bg-gray-800 border-4 border-gray-600 p-4 shadow-[6px_6px_0px_0px_#374151] transform -rotate-1">
          <div className="flex justify-between items-center text-gray-300 font-black">
            <span className="text-lg">
              SHOWING: {filteredTodos.length} 
              {filter === 'all' ? ' TOTAL' : 
               filter === 'active' ? ' ACTIVE' : ' COMPLETED'}
            </span>
            <span className="text-sm bg-gray-700 px-3 py-1 border-2 border-gray-500 transform rotate-2">
              {todos.filter(t => t.completed).length}/{todos.length} DONE
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TodoList;