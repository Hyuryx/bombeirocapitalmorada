"use client";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const DraggableCardContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && typeof child.type !== "string") {
          return React.cloneElement(child as any, { containerRef });
        }
        return child;
      })}
    </div>
  );
};

export const DraggableCardBody = ({
  children,
  className,
  containerRef,
}: {
  children: React.ReactNode;
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
}) => {
  const [zIndex, setZIndex] = useState(1);

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      onDragStart={() => setZIndex(50)}
      onDragEnd={() => setZIndex(1)}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      style={{ zIndex }}
      className={cn("absolute cursor-grab", className)}
    >
      {children}
    </motion.div>
  );
};
