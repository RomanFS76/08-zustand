import css from './SearchBox.module.css';

interface SearchBoxProps {
  valueSearch: string;
  onSearch: (value: string) => void;
}

const SearchBox = ({ valueSearch, onSearch }: SearchBoxProps) => {
  const updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={valueSearch}
      onChange={updateSearch}
    />
  );
};

export default SearchBox;
