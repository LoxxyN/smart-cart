type SearchFieldProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const SearchField: React.FC<SearchFieldProps> = ({ value, onChange }) => {
  return (
    <div className="relative mb-4">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cart-ink-dim">
        ⌕
      </span>
      <input
        type="text"
        placeholder="Поиск товаров…"
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-cart-line/15 bg-cart-bg py-2.5 pl-9 pr-3 font-sans text-sm text-cart-ink outline-none transition-colors placeholder:text-cart-ink-dim focus:border-cart-accent"
      />
    </div>
  );
};
