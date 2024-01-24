import { useEffect, useState } from "react";

import { Option } from "./Autocomplete.tsx";
import ListItem from "./ListItem.tsx";
import { fetchOptions } from "../utils/index.ts";

type SearchResultProps = {
  searchText: string;
  isOptionSelected: boolean;
  onSelection: (option: Option) => void;
};

const SearchResult = ({
  searchText,
  isOptionSelected,
  onSelection,
}: SearchResultProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const controller = new AbortController(); // use abort controller to cancel request thats already in flight

    if (searchText.length > 1) {
      setLoading(true);
      timer = setTimeout(() => {
        fetchOptions(searchText, controller.signal, setOptions, setLoading);
      }, 200); // Debounce the api call for 250ms
    }

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchText]);

  if (searchText.length <= 1 || isOptionSelected) return null;

  return (
    <ul className="search-result" role="menu">
      {/*
        We could go for virtualization of the list using react-window
        VariableSizeList to improve performance 
      */}
      {options.map((option: Option) => (
        <li
          key={option.id}
          role="menuitem"
          tabIndex={0}
          onClick={() => onSelection(option)}
        >
          <ListItem title={option.title} searchText={searchText} />
        </li>
      ))}
      {!loading && options.length === 0 && (
        <li className="disable" role="menuitem">
          No results found
        </li>
      )}
      {options.length === 0 && loading && (
        <li className="disable" role="menuitem">
          Loading...
        </li>
      )}
    </ul>
  );
};

export default SearchResult;
