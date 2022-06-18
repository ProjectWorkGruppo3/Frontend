import { motion } from 'framer-motion';
import { cardFadeIn } from '../animations';

export const CardFadeIn: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <motion.div variants={cardFadeIn}>{children}</motion.div>;
};
