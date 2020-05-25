import React, { useState } from 'react';
import { useSearchItemsQueryBuilder, SearchItem } from 'src/queries/search';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, StyledSearch } from './search_styles';

export const Search: React.FC = () => {
  const [querySearchItems] = useSearchItemsQueryBuilder();
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);
  const handleInputChange = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchTerm = e.target.value;
      if (!searchTerm) {
        return;
      }
      const result = await querySearchItems({
        variables: { searchTerm },
      });
      setSearchItems(result.data.items);
    },
    350,
  );
  return (
    <StyledSearch>
      <input
        type='text'
        onChange={(e) => {
          e.persist();
          handleInputChange(e);
        }}></input>
      <DropDown>
        {searchItems.map(({ id, title, image }) => (
          <DropDownItem key={id}>
            <img width='50' src={image || 'no_img.jpg'} alt={title}></img>
            {title}
          </DropDownItem>
        ))}
      </DropDown>
    </StyledSearch>
  );
};
