import { useCart } from '../context/cart-context.tsx';
import { memo, useMemo, useState } from 'react';
import CartItem from './cart-item.tsx';
import { SearchField } from './search-field.tsx';

type SortType = 'default' | 'price-asc' | 'price-desc' | 'name';

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

  console.log('📋 Рендер списка товаров');

  return (
    <div className={'w-1/2'}>
      <h2 className={'font-medium'}>Товары в корзине</h2>

      <SearchField value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortType)}
        className="bg-neutral-700 text-white p-1 rounded
                mb-2.5"
      >
        <option value="default">По умолчанию</option>
        <option value="price-asc">Цена ↑</option>
        <option value="price-desc">Цена ↓</option>
        <option value="name">По названию</option>
      </select>

      {state.items.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        sortedItems.map((item) => <CartItem key={item.id} item={item} />)
      )}
    </div>
  );
});

export default ProductList;
