import { memo, useCallback } from 'react';
import { useCartDispatch } from '../context/cart-context.tsx';
import { type ICartItem } from '../context/cart-reducer.ts';

type CartItemProps = {
  item: ICartItem;
};

const CartItem: React.FC<CartItemProps> = memo(({ item }) => {
  const dispatch = useCartDispatch();

  const handleDecrease = useCallback(() => {
    dispatch({
      type: 'UPDATE_ITEM',
      payload: { id: item.id, quantity: item.quantity - 1 },
    });
  }, [dispatch, item.id, item.quantity]);

  const handleIncrease = useCallback(() => {
    dispatch({
      type: 'UPDATE_ITEM',
      payload: { id: item.id, quantity: item.quantity + 1 },
    });
  }, [dispatch, item.id, item.quantity]);

  const handleRemove = useCallback(() => {
    dispatch({ type: 'REMOVE_ITEM', payload: item.id });
  }, [dispatch, item.id]);

  const subtotal = item.price * item.quantity;

  return (
    <div className="group relative rounded-xl border border-cart-line/15 bg-cart-panel-raised p-4 transition-colors hover:border-cart-accent/50">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-sans text-[15px] font-medium leading-snug text-cart-ink">
          {item.name}
        </h3>
        <button
          onClick={handleRemove}
          aria-label={`Удалить ${item.name}`}
          className="shrink-0 text-lg leading-none text-cart-ink-dim transition-colors hover:text-cart-red"
        >
          ✕
        </button>
      </div>

      <div className="my-3 border-t border-dashed border-cart-line/15" />

      <div className="flex items-end justify-between">
        <div className="space-y-0.5 font-mono text-xs text-cart-ink-dim">
          <p>{item.price.toLocaleString('ru-RU')} ₽ / шт</p>
          <p className="text-sm font-semibold text-cart-ink">
            {subtotal.toLocaleString('ru-RU')} ₽
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-cart-line/15 p-0.5">
          <button
            onClick={handleDecrease}
            aria-label="Уменьшить количество"
            className="size-7 rounded-md font-mono text-cart-ink transition-colors hover:bg-cart-accent/10 hover:text-cart-accent"
          >
            −
          </button>
          <span className="w-6 text-center font-mono text-sm text-cart-ink">{item.quantity}</span>
          <button
            onClick={handleIncrease}
            aria-label="Увеличить количество"
            className="size-7 rounded-md font-mono text-cart-ink transition-colors hover:bg-cart-accent/10 hover:text-cart-accent"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
});

export default CartItem;
