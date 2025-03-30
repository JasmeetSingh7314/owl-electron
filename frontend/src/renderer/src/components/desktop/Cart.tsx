import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import { CartItem } from '../App';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
}

export const Cart = ({ isOpen, onClose, items, onRemoveItem }: CartProps) => {
  const total = items.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^0-9.-]+/g, '')), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-8 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-8 h-full w-96 bg-[#1a1a1a] shadow-xl z-50"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Cart ({items.length})</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center text-gray-400 mt-8">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 bg-white/5 rounded-lg p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.type}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold">₹{item.price}</span>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-black/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Total</span>
                    <span className="text-xl font-bold">₹{total.toFixed(2)}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full py-3 bg-blue-500 rounded-lg font-medium"
                  >
                    Checkout
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
