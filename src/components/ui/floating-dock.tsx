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
  FaTwitter,
  FaTelegram,
  FaInstagram,
  FaTiktok,
  FaBars,
} from "react-icons/fa";
import { SiSolana } from "react-icons/si";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const dockItems = [
    {
      title: "Twitter",
      icon: <FaTwitter />,
      href: "https://x.com/PhonkRatSol",
    },
    {
      title: "Instagram",
      icon: <FaInstagram />,
      href: "https://www.instagram.com/rodolfotherat",
    },
    {
      title: "Tiktok",
      icon: <FaTiktok />,
      href: "https://www.tiktok.com/@rodolfoorato",
    },
    {
      title: "Contract",
      icon: <SiSolana />,
      href: "https://pump.fun/coin/DM7DYeWfUAXMY1dwoNcXMD65n1TzgurHLNCetenJpump",
    },
  ];

  return (
    <footer className="relative py-6 sm:py-8 pt-12 sm:pt-16 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center mb-6 sm:mb-8">
          <FloatingDock
            items={dockItems}
            desktopClassName="bg-black/10 backdrop-blur-md dark:bg-black/20"
            mobileClassName="bg-black/10 backdrop-blur-md dark:bg-black/20"
          />
        </div>

        <div className="text-center">
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-3 sm:mb-4">
            © {currentYear} Phonk Rat. All rights reserved.
          </p>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2 sm:px-0">
            <p className="mb-2 sm:mb-3">
              <strong className="text-gray-800 dark:text-white">
                DISCLAIMER:
              </strong>{" "}
              This is a meme coin created for entertainment purposes only.
            </p>
            <p className="mb-2 sm:mb-3">
              Cryptocurrency investments carry significant risks. Never invest
              more than you can afford to lose.
            </p>
            <p>
              This project is not financial advice. DYOR (Do Your Own Research)
              and trade responsibly.
            </p>
          </div>
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
            className="absolute inset-x-0 bottom-full mb-3 flex flex-col gap-3"
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
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50/80 dark:bg-gray-700 backdrop-blur-sm border border-[#ace4bb]/20 text-gray-700 dark:text-[#ace4bb] hover:text-[#3c885c] transition-colors"
                >
                  <div className="h-5 w-5">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50/80 dark:bg-gray-700 backdrop-blur-sm border border-[#ace4bb]/20 text-gray-700 dark:text-[#ace4bb] hover:text-[#3c885c] transition-colors"
      >
        <FaBars className="h-6 w-6" />
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
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50/80 dark:bg-gray-800 backdrop-blur-sm border border-[#ace4bb]/20 px-4 pb-3 md:flex",
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
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
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
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200/80 dark:bg-gray-700 backdrop-blur-sm border border-[#ace4bb]/30 hover:border-[#ace4bb]/60 transition-colors"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-[#ace4bb]/20 bg-[#ace4bb]/15 backdrop-blur-sm px-2 py-0.5 text-xs whitespace-pre text-gray-700 dark:text-gray-200"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center text-gray-700 dark:text-[#ace4bb] hover:text-[#3c885c] transition-colors"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
