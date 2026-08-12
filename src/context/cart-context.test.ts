import { describe, expect, it } from 'vitest';
import { cartReducer, type CartState } from './cart-reducer';

const state: CartState = {
  items: [
    { id: 1, name: 'Колонки', price: 1200, quantity: 2 },
    { id: 2, name: 'Клавиатура', price: 5600, quantity: 1 },
    { id: 3, name: 'Мышь', price: 3200, quantity: 1 },
  ],
};

describe('cartReducer', () => {
  it('добавляет новый товар с id = max + 1', () => {
    const next = cartReducer(state, {
      type: 'ADD_ITEM',
      payload: { name: 'Наушники', price: 8000, quantity: 1 },
    });

    expect(next.items).toHaveLength(4);
    expect(next.items.at(-1)).toEqual({ id: 4, name: 'Наушники', price: 8000, quantity: 1 });
  });

  it('объединяет товар с таким же названием (регистронезависимо) в существующий', () => {
    const next = cartReducer(state, {
      type: 'ADD_ITEM',
      payload: { name: 'клавиатура', price: 5600, quantity: 2 },
    });

    expect(next.items).toHaveLength(3);
    expect(next.items[1]).toEqual({ id: 2, name: 'Клавиатура', price: 5600, quantity: 3 });
  });

  it('не мутирует исходное состояние', () => {
    const next = cartReducer(state, { type: 'REMOVE_ITEM', payload: 1 });

    expect(next).not.toBe(state);
    expect(state.items).toHaveLength(3);
  });

  it('удаляет товар по id', () => {
    const next = cartReducer(state, { type: 'REMOVE_ITEM', payload: 2 });

    expect(next.items.map((item) => item.id)).toEqual([1, 3]);
  });

  it('обновляет количество', () => {
    const next = cartReducer(state, {
      type: 'UPDATE_ITEM',
      payload: { id: 1, quantity: 5 },
    });

    expect(next.items[0]).toEqual({ id: 1, name: 'Колонки', price: 1200, quantity: 5 });
  });

  it('не опускает количество ниже 1', () => {
    const next = cartReducer(state, {
      type: 'UPDATE_ITEM',
      payload: { id: 3, quantity: -3 },
    });

    expect(next.items[2].quantity).toBe(1);
  });

  it('очищает корзину', () => {
    const next = cartReducer(state, { type: 'CLEAR_CART' });

    expect(next.items).toEqual([]);
  });
});
