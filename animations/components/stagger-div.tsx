import { motion } from 'framer-motion';
import { stagger } from '../animations';

export const StaggerDiv: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <motion.div variants={stagger}>{children}</motion.div>;
};
