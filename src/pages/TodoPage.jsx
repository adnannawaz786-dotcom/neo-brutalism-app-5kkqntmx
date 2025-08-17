import React from 'react';
import { motion } from 'framer-motion';
import TodoList from '../components/TodoList';
import NewTodoForm from '../components/ui/NewTodoForm';
import useTodos from '../lib/store';

const TodoPage = () => {
  const { todos } = useTodos();
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight"
              style={{
                textShadow: '8px 8px 0px #dc2626, 16px 16px 0px #7c2d12',
                transform: 'skew(-2deg)',
              }}
            >
              TODO
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 text-xl font-bold"
            >
              GET THINGS DONE, BRUTALLY SIMPLE
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div 
              className="bg-red-600 p-6 transform -rotate-1 hover:rotate-0 transition-transform duration-300"
              style={{
                boxShadow: '8px 8px 0px #000000',
                border: '4px solid #000000',
              }}
            >
              <h3 className="text-black font-black text-lg mb-2">TOTAL TASKS</h3>
              <p className="text-black text-3xl font-black">{totalCount}</p>
            </div>
            
            <div 
              className="bg-yellow-400 p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300"
              style={{
                boxShadow: '8px 8px 0px #000000',
                border: '4px solid #000000',
              }}
            >
              <h3 className="text-black font-black text-lg mb-2">COMPLETED</h3>
              <p className="text-black text-3xl font-black">{completedCount}</p>
            </div>
            
            <div 
              className="bg-green-500 p-6 transform -rotate-1 hover:rotate-0 transition-transform duration-300"
              style={{
                boxShadow: '8px 8px 0px #000000',
                border: '4px solid #000000',
              }}
            >
              <h3 className="text-black font-black text-lg mb-2">REMAINING</h3>
              <p className="text-black text-3xl font-black">{totalCount - completedCount}</p>
            </div>
          </motion.div>

          {/* New Todo Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <NewTodoForm />
          </motion.div>

          {/* Todo List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <TodoList />
          </motion.div>

          {/* Empty State */}
          {todos.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center py-16"
            >
              <div 
                className="inline-block bg-purple-600 p-8 transform rotate-2"
                style={{
                  boxShadow: '12px 12px 0px #000000',
                  border: '6px solid #000000',
                }}
              >
                <h3 className="text-white font-black text-2xl mb-4">NO TASKS YET!</h3>
                <p className="text-white font-bold">ADD YOUR FIRST TASK ABOVE</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TodoPage;
