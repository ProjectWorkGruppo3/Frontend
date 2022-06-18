import { motion } from 'framer-motion';
import { baseAnimation } from '../animations';

export const RootAnimationDiv: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <motion.div {...baseAnimation}>{children}</motion.div>;
};
