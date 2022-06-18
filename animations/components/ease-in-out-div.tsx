import { motion } from 'framer-motion';
import React from 'react';
import { iconEaseInOut } from '../animations';

export const EaseInOutDiv: React.FC<{ children: React.ReactNode, style?: React.CSSProperties }> = ({
  children,
  style
}) => {
  return <motion.div variants={iconEaseInOut} style={style}>{children}</motion.div>;
};
