import { motion } from 'framer-motion';
import { fadeIn } from '../animations';

export const FadeInDiv: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <motion.div variants={fadeIn}>{children}</motion.div>;
};
