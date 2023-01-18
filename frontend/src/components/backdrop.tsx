import { motion } from "framer-motion";
import { ReactNode} from 'react';

type Props = {
  children: ReactNode,
}

const Backdrop: React.FC<Props> = ({ children }) => {
  return (
    <motion.div
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;