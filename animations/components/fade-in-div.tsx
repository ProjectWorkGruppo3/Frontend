import { motion } from 'framer-motion';
import { fadeIn } from '../animations';

export const FadeInDiv: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  return (
    <motion.div variants={fadeIn} style={style}>
      {children}
    </motion.div>
  );
};
