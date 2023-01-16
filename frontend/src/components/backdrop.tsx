import { motion } from "framer-motion";
import { ReactNode} from 'react';

type Props = {
  children: ReactNode,
  // onClick?: () => void
}

const Backdrop: React.FC<Props> = ({ children }) => {
  return (
    <motion.div
      // onClick={onClick}
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