import React from 'react';
import { motion } from 'framer-motion';
import clippyImage from './clippy.png'; // Ensure you have an image of Clippy

const Clippy = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="clippy-avatar"
  >
    <img src={clippyImage} alt="Clippy" style={{ width: '100px', height: 'auto' }} />
  </motion.div>
);

export default Clippy;
