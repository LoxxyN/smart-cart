import { useCallback, useId, useState } from 'react';
import { useCart } from '../context/cart-context.tsx';

export const AddProduct = () => {
  const { state, dispatch } = useCart();
  const formId = useId();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState<number | string>(1);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const trimmedName = name.trim();
      const parsedPrice = Number(price);
      const parsedQuantity = Math.max(1, Math.floor(Number(quantity)) || 1);

      if (!trimmedName) {
        setError('Введите название товара');
        return;
      }
      if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
        setError('Цена должна быть больше нуля');
        return;
      }

      const nextId = state.items.reduce((max, item) => Math.max(max, item.id), 0) + 1;

      dispatch({
        type: 'ADD_ITEM',
        payload: { id: nextId, name: trimmedName, price: parsedPrice, quantity: parsedQuantity },
      });

      setName('');
      setPrice('');
      setQuantity(1);
      setError(null);
    },
    [state.items, name, price, quantity, dispatch],
  );

  return (
    <section className="rounded-2xl border border-cart-line/15 bg-cart-panel p-5 sm:p-6">
      <h2 className="mb-4 font-mono text-sm uppercase tracking-[0.15em] text-cart-ink-dim">
        Добавить товар
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label
            htmlFor={`${formId}-name`}
            className="mb-1 block font-mono text-xs text-cart-ink-dim"
          >
            Название
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Например, Наушники"
            className="w-full rounded-lg border border-cart-line/15 bg-cart-bg px-3 py-2.5 font-sans text-sm text-cart-ink outline-none transition-colors placeholder:text-cart-ink-dim focus:border-cart-accent"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label
              htmlFor={`${formId}-price`}
              className="mb-1 block font-mono text-xs text-cart-ink-dim"
            >
              Цена, ₽
            </label>
            <input
              id={`${formId}-price`}
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-cart-line/15 bg-cart-bg px-3 py-2.5 font-mono text-sm text-cart-ink outline-none transition-colors placeholder:text-cart-ink-dim focus:border-cart-accent"
            />
          </div>

          <div className="w-24">
            <label
              htmlFor={`${formId}-qty`}
              className="mb-1 block font-mono text-xs text-cart-ink-dim"
            >
              Кол-во
            </label>
            <input
              id={`${formId}-qty`}
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full rounded-lg border border-cart-line/15 bg-cart-bg px-3 py-2.5 font-mono text-sm text-cart-ink outline-none transition-colors focus:border-cart-accent"
            />
          </div>
        </div>

        {error && <p className="font-mono text-xs text-cart-red">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-lg border border-cart-accent/40 bg-cart-accent/10 py-2.5 font-mono text-sm text-cart-accent transition-colors hover:bg-cart-accent/20"
        >
          + Добавить в корзину
        </button>
      </form>
    </section>
  );
};
