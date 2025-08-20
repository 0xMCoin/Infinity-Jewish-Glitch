"use client";
import { cn } from "@/lib/utils";
import React, { createContext, useContext, useState } from "react";

const MouseEnterContext = createContext<{
  mouseX: number;
  mouseY: number;
  setMouseX: React.Dispatch<React.SetStateAction<number>>;
  setMouseY: React.Dispatch<React.SetStateAction<number>>;
}>({
  mouseX: 0,
  mouseY: 0,
  setMouseX: () => {},
  setMouseY: () => {},
});

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  return (
    <MouseEnterContext.Provider
      value={{ mouseX, mouseY, setMouseX, setMouseY }}
    >
      <div
        className={cn("py-8 px-4", containerClassName)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMouseX(e.clientX - rect.left);
          setMouseY(e.clientY - rect.top);
        }}
      >
        <div className={cn("flex items-center justify-center", className)}>
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { mouseX, mouseY } = useContext(MouseEnterContext);

  return (
    <div
      className={cn(
        "relative group/card w-full h-full rounded-xl bg-transparent p-6 transition-all duration-300 ease-out",
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${mouseY / 40}deg) rotateY(${
          mouseX / 40
        }deg)`,
      }}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
}) => {
  const { mouseX, mouseY } = useContext(MouseEnterContext);

  const rotateXValue =
    typeof rotateX === "number" ? rotateX + mouseY / 40 : rotateX;
  const rotateYValue =
    typeof rotateY === "number" ? rotateY - mouseX / 40 : rotateY;

  return (
    <Tag
      className={cn("transition-all duration-300 ease-out", className)}
      style={{
        transform: `perspective(1000px) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateXValue}deg) rotateY(${rotateYValue}deg) rotateZ(${rotateZ}deg)`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};
