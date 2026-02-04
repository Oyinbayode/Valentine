import { Variants } from "framer-motion";

export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

export const buttonHoverVariants: Variants = {
  idle: {
    scale: 1,
    boxShadow: "0 4px 14px 0 rgba(244, 63, 94, 0.3)",
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 6px 20px 0 rgba(244, 63, 94, 0.4)",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
  },
};

export const gifVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

export const celebrationVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const floatingHeartVariants: Variants = {
  animate: (i: number) => ({
    y: [0, -20, 0],
    x: [0, Math.sin(i) * 10, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 3 + i * 0.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

export const shakeVariants: Variants = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

export const escapeVariants: Variants = {
  escape: (position: { x: number; y: number }) => ({
    x: position.x,
    y: position.y,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  }),
};

export const carouselVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  }),
};
