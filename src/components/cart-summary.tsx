import { useCart } from '../context/cart-context.tsx';
import { useCallback, useMemo } from 'react';

export const CartSummary = () => {
  const { state, dispatch } = useCart();

  const { total, discount, finalTotal } = useMemo(() => {
    console.log('Пересчет итоговой суммы...');
    const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const discount = total > 1500 ? total * 0.1 : 0;
    const finalTotal = total - discount;

    return { total, discount, finalTotal };
  }, [state.items]);

  const handleClear = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  return (
    <div className={'mt-5 border border-neutral-400 p-2'}>
      <h3>Итог:</h3>
      <p>Сумма без скидки: {total} руб</p>
      {discount > 0 && <p>Скидка: {discount} руб</p>}
      <p className={'text-xl font-bold text-white'}>Итого: {finalTotal} руб</p>
      {state.items.length >= 1 && (
        <button
          className={'bg-red-500 p-1.5 mt-3 w-full rounded-lg text-white'}
          onClick={handleClear}
        >
          Очистить корзину
        </button>
      )}
    </div>
  );
};
