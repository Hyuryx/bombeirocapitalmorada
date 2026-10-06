"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function PageTransition({ children, currentKey }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentKey}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
