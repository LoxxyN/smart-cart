import { memo, useMemo, useState } from 'react';
import { useCart } from '../context/cart-context.tsx';
import CartItem from './cart-item.tsx';
import { SearchField } from './search-field.tsx';

type SortType = 'default' | 'price-asc' | 'price-desc' | 'name';

const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'price-asc', label: 'Цена ↑' },
  { value: 'price-desc', label: 'Цена ↓' },
  { value: 'name', label: 'Название' },
];

const ProductList = memo(() => {
  const [sortBy, setSortBy] = useState<SortType>('default');
  const [searchTerm, setSearchTerm] = useState('');
  const { state } = useCart();

  const sortedItems = useMemo(() => {
    let items = [...state.items];

    if (searchTerm.trim()) {
      items = items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    switch (sortBy) {
      case 'price-asc':
        return items.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return items.sort((a, b) => b.price - a.price);
      case 'name':
        return items.sort((a, b) => a.name.localeCompare(b.name));
      case 'default':
        return items;
    }
  }, [state.items, sortBy, searchTerm]);

  return (
    <section className="rounded-2xl border border-cart-line/15 bg-cart-panel p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-mono text-sm uppercase tracking-[0.15em] text-cart-ink-dim">
          Отсканированные товары
        </h2>
        <span className="font-mono text-xs text-cart-ink-dim">{state.items.length} шт.</span>
      </div>

      <SearchField value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <div className="mb-5 flex flex-wrap gap-1.5">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSortBy(opt.value)}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
              sortBy === opt.value
                ? 'border-cart-accent bg-cart-accent/10 text-cart-accent'
                : 'border-cart-line/15 text-cart-ink-dim hover:border-cart-ink-dim'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {state.items.length === 0 ? (
        <div className="py-14 text-center font-mono text-sm text-cart-ink-dim">
          <p>Корзина пуста</p>
        </div>
      ) : sortedItems.length === 0 ? (
        <div className="py-14 text-center font-mono text-sm text-cart-ink-dim">
          ничего не найдено по запросу «{searchTerm}»
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {sortedItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
});

export default ProductList;
