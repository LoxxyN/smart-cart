import { type ICartItem, useCart } from '../context/cart-context.tsx';
import { memo, useCallback } from 'react';

type CartItemProps = {
  item: ICartItem;
};

const CartItem: React.FC<CartItemProps> = memo(({ item }) => {
  const { dispatch } = useCart();

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

  return (
    <div className="border border-neutral-300 p-2.5 mb-4 w-60">
      <h3 className="text-xl text-white font-medium">{item.name}</h3>
      <hr />
      <p className={'w-full'}>
        Цена: <span className={'text-white'}>{item.price} руб</span>
      </p>
      <p>
        Количество: <span className={'text-white'}>{item.quantity}</span>
      </p>
      <div className={'flex flex-col items-center'}>
        <div className={'flex gap-3 my-2'}>
          <button
            className="bg-neutral-400 size-7 rounded-lg px-1 border border-black text-black"
            onClick={handleDecrease}
          >
            -
          </button>
          <button
            className="bg-neutral-400 size-7 rounded-lg px-1 border border-black text-black"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <button className="bg-red-500 w-full mt-2 rounded-lg p-2 text-white" onClick={handleRemove}>
          ✕ Удалить
        </button>
      </div>
    </div>
  );
});

export default CartItem;
