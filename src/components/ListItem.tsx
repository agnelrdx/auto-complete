import { memo } from "react";

type ListItemProps = {
  title: string;
  searchText: string;
};

const ListItem = memo(({ title, searchText }: ListItemProps) => {
  const regex = new RegExp(`(${searchText})`, "gi");
  return title.split(regex).map((part, index) =>
    regex.test(part) ? (
      <mark role="emphasis" key={index}>
        {part}
      </mark>
    ) : (
      part
    )
  );
});

export default ListItem;
