"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeartIcon from "@/components/icons/HeartIcon";

interface TodoItem {
  id: number;
  text: string;
  checked: boolean;
  preChecked?: boolean;
}

const INITIAL_TODOS: TodoItem[] = [
  { id: 1, text: "Asked you to be my Valentine", checked: true, preChecked: true },
  { id: 2, text: "Wrote you a love letter", checked: true, preChecked: true },
  { id: 3, text: "Make you smile every day", checked: false },
  { id: 4, text: "Take you on a surprise date", checked: false },
  { id: 5, text: "Pray for you daily", checked: false },
  { id: 6, text: "Remind you that you're beautiful", checked: false },
  { id: 7, text: "Watch the sunset with you", checked: false },
  { id: 8, text: "Hold your hand and thank God for you", checked: false },
  { id: 9, text: "Love and cherish you always", checked: false },
];

export default function ValentineTodo() {
  const [todos, setTodos] = useState<TodoItem[]>(INITIAL_TODOS);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id && !todo.preChecked
          ? { ...todo, checked: !todo.checked }
          : todo
      )
    );
  };

  const checkedCount = todos.filter((t) => t.checked).length;
  const progress = (checkedCount / todos.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mx-2 max-w-md w-full"
      style={{
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
      }}
    >
      <div className="flex items-center justify-center gap-2 mb-6">
        <HeartIcon size={24} className="text-[#dc143c]" />
        <h2 className="font-display text-2xl sm:text-3xl text-[#722f37]">
          Valentine's To-Do
        </h2>
        <HeartIcon size={24} className="text-[#dc143c]" />
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm font-body text-[#722f37]/70 mb-2">
          <span>Progress</span>
          <span>{checkedCount}/{todos.length} done</span>
        </div>
        <div className="h-3 bg-[#f8e8e8] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#dc143c] to-[#ff6b6b] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <ul className="space-y-3">
        <AnimatePresence>
          {todos.map((todo, index) => (
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleTodo(todo.id)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                todo.preChecked
                  ? "bg-[#f8e8e8]/50 cursor-default"
                  : "bg-[#f8e8e8] hover:bg-[#f0d8d8] cursor-pointer"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  todo.checked
                    ? "bg-[#dc143c] border-[#dc143c]"
                    : "border-[#dc143c]/40 bg-white"
                }`}
              >
                {todo.checked && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                )}
              </div>

              <span
                className={`font-body text-base sm:text-lg flex-1 transition-all ${
                  todo.checked
                    ? "text-[#722f37]/50 line-through"
                    : "text-[#722f37]"
                }`}
              >
                {todo.text}
              </span>

              {todo.checked && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <HeartIcon size={18} className="text-[#dc143c]" />
                </motion.div>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {checkedCount === todos.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-[#dc143c] rounded-xl text-center"
        >
          <p className="font-handwritten text-xl text-white">
            You're the perfect Valentine!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
