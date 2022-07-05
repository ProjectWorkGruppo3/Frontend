import { AnimationProps, Variants } from 'framer-motion';

export const baseAnimation: AnimationProps = {
  exit: {
    opacity: 0,
  },
  initial: 'initial',
  animate: 'animate',
};

const easing = [0.6, -0.5, 0.01, 0.99];

export const fadeIn: Variants = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.6,
      ease: easing,
    },
  },
};

export const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const cardFadeIn: Variants = {
  initial: {
    x: 200,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 2.0,
      ease: easing,
    },
  },
};

export const iconEaseInOut: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1.0,
      ease: easing,
    },
  },
};

export const floatingAnimation: Variants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 2,
      ease: 'easeIn',
      repeat: Infinity,
      repeatType: 'reverse',
      repeatDelay: 1,
    },
  },
};
