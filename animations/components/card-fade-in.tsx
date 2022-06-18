import { motion } from 'framer-motion';
import { cardFadeIn } from '../animations';

export const CardFadeIn: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  return (
    <motion.div variants={cardFadeIn} style={style}>
      {children}
    </motion.div>
  );
};
