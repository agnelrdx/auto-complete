import { Option } from "../components/Autocomplete";

const filterSearchOptions = (searchText: string, options: Option[]) => {
  const lowerText = searchText.toLowerCase();
  return options.filter((option) => {
    const lowerTitleWithoutSpaces = option.title.toLowerCase();
    return lowerTitleWithoutSpaces.includes(lowerText);
  });
};

export const fetchOptions = async (
  searchText: string,
  signal: AbortSignal,
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/photos",
      {
        signal,
      }
    );
    const photos = await response.json();
    const filteredOptions = filterSearchOptions(searchText, photos);
    setOptions(filteredOptions);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching options:", error);
  }
};
