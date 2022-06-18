import { motion } from 'framer-motion';
import { stagger } from '../animations';

export const StaggerDiv: React.FC<{ children: React.ReactNode, style?: React.CSSProperties }> = ({
  children,
  style
}) => {
  return <motion.div variants={stagger} style={style}>{children}</motion.div>;
};
