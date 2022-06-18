import { motion } from 'framer-motion';
import { iconEaseInOut } from '../animations';

export const EaseInOutDiv: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <motion.div variants={iconEaseInOut}>{children}</motion.div>;
};
