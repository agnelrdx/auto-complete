import { useState, useCallback, useDeferredValue } from "react";

import SearchResult from "./SearchResult";
import "../assets/css/autocomplete.css";

export type Option = {
  id: number;
  title: string;
  url: string;
};

type AutocompleteProps = {
  placeholder: string;
  onSelection: React.Dispatch<React.SetStateAction<Option | null>>;
};

const Autocomplete = ({ placeholder, onSelection }: AutocompleteProps) => {
  const [text, setText] = useState("");
  const [clicked, setClicked] = useState(false);
  const deferredText = useDeferredValue(text);

  const handleSelection = useCallback(
    (option: Option) => {
      onSelection(option);
      setText(option.title);
      setClicked(true);
    },
    [onSelection]
  );

  const handleClose = () => {
    setText("");
    onSelection(null);
    setClicked(false);
  };

  return (
    <div className="auto-complete__wrapper">
      <input
        className="auto-complete"
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={(e) => {
          setClicked(false);
          setText(e.target.value);
        }}
        aria-label={placeholder}
        role="combobox"
      />
      <button className="auto-complete__close" onClick={handleClose}>
        X
      </button>

      <SearchResult
        searchText={deferredText}
        isOptionSelected={clicked}
        onSelection={handleSelection}
      />
    </div>
  );
};

export default Autocomplete;
