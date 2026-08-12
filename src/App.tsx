import { AddProduct } from './components/add-product';
import { CartSummary } from './components/cart-summary';
import ProductList from './components/product-list';
import { CartProvider } from './context/cart-context';

export const App = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-cart-bg text-cart-ink">
        <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
          <header className="flex items-center gap-3 mb-10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cart-accent opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cart-accent" />
            </span>
            <div>
              <h1 className="font-mono text-xl sm:text-3xl tracking-tight text-cart-ink">
                SMART_CART
              </h1>
            </div>
          </header>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">
            <ProductList />
            <CartSummary />
          </div>
        </div>
        <AddProduct />
      </div>
    </CartProvider>
  );
};
