import { createContext, useContext, useEffect, useReducer } from 'react';
import { cartReducer, loadInitialState, type CartActions, type CartState } from './cart-reducer';

const CartStateContext = createContext<CartState | null>(null);
const CartDispatchContext = createContext<React.Dispatch<CartActions> | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, loadInitialState());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCartState = () => {
  const ctx = useContext(CartStateContext);
  if (!ctx) throw new Error('useCartState вне CartProvider');
  return ctx;
};

export const useCartDispatch = () => {
  const ctx = useContext(CartDispatchContext);
  if (!ctx) throw new Error('useCartDispatch вне CartProvider');
  return ctx;
};
