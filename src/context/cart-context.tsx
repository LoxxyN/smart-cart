import { createContext, useContext, useEffect, useReducer } from 'react';

export interface ICartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

type CartState = {
  items: ICartItem[];
};

type CartActions =
  | { type: 'ADD_ITEM'; payload: ICartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_ITEM'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextDispatch {
  state: CartState;
  dispatch: React.Dispatch<CartActions>;
}

const initialState: CartState = {
  items: [
    { id: 1, name: 'Колонки', price: 1200, quantity: 2 },
    { id: 2, name: 'Клавиатура', price: 5600, quantity: 1 },
    { id: 3, name: 'Мышь', price: 3200, quantity: 1 },
  ],
};

const loadInitialState = () => {
  const saved = localStorage.getItem('cart');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (err) {
      console.error(err);
      return initialState;
    }
  }

  return initialState;
};

const cartReducer = (state: CartState, action: CartActions): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.name.toLowerCase() === action.payload.name.toLowerCase(),
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        };
      }

      return { ...state, items: [...state.items, action.payload] };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item,
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

const CartContext = createContext<CartContextDispatch | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, loadInitialState());
  const value: CartContextDispatch = { state, dispatch };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Вы можете использовать useCart(), только в рамках CartProvider');
  }
  return context;
};
