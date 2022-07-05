import { motion } from 'framer-motion';
import { floatingAnimation } from '../animations';

export const Floating: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  return (
    <motion.div variants={floatingAnimation} style={style}>
      {children}
    </motion.div>
  );
};
