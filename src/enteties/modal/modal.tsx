import { motion } from "framer-motion"

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: any, children: any }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 opacity- z-50">
            <motion.div initial={{ opacity: 0, scale: 0.5 }}
                animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white fixed rounded-lg shadow-lg p-6 w-full max-w-md">
                <button
                    className="absolute top-2 right-4 text-xl cursor-pointer text-gray-600 hover:text-gray-900"
                    onClick={() => onClose(false)}>
                    &times;
                </button>
                {children}
            </motion.div>
        </div>
    );
};

export default Modal;
