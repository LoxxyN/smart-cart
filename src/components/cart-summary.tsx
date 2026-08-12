import { useCallback, useMemo } from 'react';
import { useCart } from '../context/cart-context.tsx';

export const CartSummary = () => {
  const { state, dispatch } = useCart();

  const { total, discount, finalTotal } = useMemo(() => {
    const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = total > 1500 ? total * 0.1 : 0;
    const finalTotal = total - discount;

    return { total, discount, finalTotal };
  }, [state.items]);

  const handleClear = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  return (
    <aside className="rounded-2xl border border-cart-line/15 bg-cart-panel p-5 sm:p-6 lg:sticky lg:top-8">
      <h2 className="mb-4 font-mono text-sm uppercase tracking-[0.15em] text-cart-ink-dim">Чек</h2>

      <div className="space-y-2 font-mono text-sm text-cart-ink-dim">
        <div className="flex justify-between">
          <span>Сумма</span>
          <span>{total} ₽</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-cart-amber">
            <span>Скидка 10%</span>
            <span>−{discount} ₽</span>
          </div>
        )}
      </div>

      <div className="my-4 border-t border-dashed border-cart-line/15" />

      <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.15em] text-cart-ink-dim">
        Итого
      </div>
      <p className="font-mono text-4xl font-bold tracking-tight text-cart-accent">{finalTotal} ₽</p>

      {state.items.length >= 1 && (
        <button
          onClick={handleClear}
          className="mt-6 w-full rounded-lg border border-cart-red/40 py-2.5 font-mono text-sm text-cart-red transition-colors hover:bg-cart-red/10"
        >
          Очистить корзину
        </button>
      )}
    </aside>
  );
};
