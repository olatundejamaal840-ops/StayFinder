/**
 * @file animations.js
 * @description Centralized, structured animation variants and easing definitions
 * using Motion for React. Ensures smooth, consistent, and performant micro-interactions.
 */

export const springTransition = {
  type: "spring",
  stiffness: 380,
  damping: 28
};

export const smoothTransition = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1]
};

// Page transition container
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 12
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
      staggerChildren: 0.08
    }
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2
    }
  }
};

// Staggered list / grid container
export const staggerContainer = (staggerDelay = 0.06, delayChildren = 0) => ({
  initial: {},
  animate: {
    transition: {
      delayChildren,
      staggerChildren: staggerDelay
    }
  }
});

// Fade in and slide up element
export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 16
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: smoothTransition
  }
};

// Fade in element
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25 } }
};

// Scale in for badges, modals, and tooltips
export const scaleIn = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1, transition: springTransition },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.15 } }
};

// Card interactive hover effect
export const cardHover = {
  rest: { y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
  hover: {
    y: -4,
    scale: 1.01,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  tap: { scale: 0.99 }
};

// Tab content switcher animation
export const tabContentVariants = {
  initial: { opacity: 0, x: 10, y: 0 },
  animate: { opacity: 1, x: 0, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, x: -10, y: 0, transition: { duration: 0.15 } }
};

// Badge pulse animation for live verification badges
export const badgePulse = {
  animate: {
    scale: [1, 1.04, 1],
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
