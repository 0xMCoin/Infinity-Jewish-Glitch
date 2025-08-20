"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import {
  FaEthereum,
  FaDiscord,
  FaTwitter,
  FaTelegram,
  FaInstagram,
  FaTiktok,
  FaBars,
} from "react-icons/fa";
import { SiSolana } from "react-icons/si";

// Componente Footer minimalista usando Floating Dock
export function Footer() {
  const currentYear = new Date().getFullYear();

  const dockItems = [
    {
      title: "Twitter",
      icon: <FaTwitter />,
      href: "https://x.com/rodolfotherat",
    },
    {
      title: "Telegram",
      icon: <FaTelegram />,
      href: "t.me/rodolfotherat",
    },
    {
      title: "Instagram",
      icon: <FaInstagram />,
      href: "https://www.instagram.com/ratmemecoin",
    },
    {
      title: "Tiktok",
      icon: <FaTiktok />,
      href: "https://www.tiktok.com/@rodolfoorato",
    },
    {
      title: "Contract",
      icon: <SiSolana />,
      href: "https://solscan.io/address/0x0000000000000000000000000000000000000000",
    },
  ];

  return (
    <footer className="relative py-8 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Floating Dock */}
        <div className="flex justify-center mb-8">
          <FloatingDock 
            items={dockItems}
            desktopClassName="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-2 border-yellow-400/40 shadow-lg"
            mobileClassName="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm border-2 border-yellow-400/40 shadow-lg"
          />
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            © {currentYear} Rodolfo The Rat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={item.href}
                  key={item.title}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-2 border-yellow-400/40 text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 hover:border-yellow-500/60 transition-all duration-200 shadow-md"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm border-2 border-yellow-400/40 text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 hover:border-yellow-500/60 transition-all duration-200 shadow-md"
      >
        <FaBars className="h-5 w-5" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-2 border-yellow-400/40 shadow-lg px-4 pb-3 md:flex",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm border-2 border-yellow-400/40 hover:border-yellow-500/60 transition-all duration-200 shadow-md"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border-2 border-yellow-400/40 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm px-3 py-1 text-xs whitespace-pre text-yellow-700 dark:text-yellow-300 shadow-lg"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
