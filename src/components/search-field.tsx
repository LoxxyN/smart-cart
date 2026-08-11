type SearchFieldProps = { value: string; onChange: (e: any) => void };

export const SearchField: React.FC<SearchFieldProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="🔍 Поиск товаров..."
      value={value}
      onChange={onChange}
      className="w-full mb-4 p-2 bg-neutral-700 text-white rounded"
    />
  );
};
