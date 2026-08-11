import { CartProvider } from './context/cart-context.tsx';
import { CartSummary } from './components/cart-summary.tsx';
import ProductList from './components/product-list.tsx';

export const App = () => {
  return (
    <CartProvider>
      <div className={'min-w-xl p-5 my-0 mx-auto'}>
        <h1>Smart cart</h1>
        <div className={'flex justify-between'}>
          <ProductList />
          <CartSummary />
        </div>
      </div>
    </CartProvider>
  );
};
