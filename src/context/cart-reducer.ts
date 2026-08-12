export interface ICartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export type CartState = {
  items: ICartItem[];
};

export type CartActions =
  | { type: 'ADD_ITEM'; payload: Omit<ICartItem, 'id'> }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_ITEM'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

export const initialState: CartState = {
  items: [
    { id: 1, name: 'Колонки', price: 1200, quantity: 2 },
    { id: 2, name: 'Клавиатура', price: 5600, quantity: 1 },
    { id: 3, name: 'Мышь', price: 3200, quantity: 1 },
  ],
};

export const loadInitialState = (): CartState => {
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

export const cartReducer = (state: CartState, action: CartActions): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.name.toLowerCase() === action.payload.name.toLowerCase(),
      );

      const nextId = state.items.reduce((max, item) => Math.max(max, item.id), 0) + 1;

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

      return { ...state, items: [...state.items, { ...action.payload, id: nextId }] };
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
