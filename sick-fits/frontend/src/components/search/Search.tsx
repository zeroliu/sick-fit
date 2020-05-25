import React, { useState } from 'react';
import { useCombobox, resetIdCounter } from 'downshift';
import { useRouter } from 'next/router';

import { DropDown, DropDownItem, StyledSearch } from './search_styles';
import { useSearchItemsQueryBuilder, SearchItem } from 'src/queries/search';
import { useDebounce } from 'src/lib/use_debounce';

export const Search: React.FC = () => {
  resetIdCounter();
  const router = useRouter();
  const [querySearchItems, { loading }] = useSearchItemsQueryBuilder();
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);
  const findSearchItems = async (inputValue?: string) => {
    if (!inputValue) {
      return;
    }
    const result = await querySearchItems({
      variables: { searchTerm: inputValue },
    });
    setSearchItems(result.data.items);
  };
  const debouncedFindSearchItems = useDebounce(findSearchItems, 350);
  const {
    isOpen,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    getMenuProps,
    inputValue,
  } = useCombobox({
    items: searchItems,
    onInputValueChange: ({ inputValue }) =>
      debouncedFindSearchItems(inputValue),
    itemToString: (item) => item.title,
    onSelectedItemChange: (item) => {
      if (!item.selectedItem) {
        return;
      }
      router.push({
        pathname: '/item',
        query: { id: item.selectedItem.id },
      });
    },
  });
  const renderDropdownItems = () => {
    if (!isOpen) {
      return null;
    }
    if (searchItems.length && !loading) {
      return searchItems.map((item, index) => (
        <DropDownItem
          key={item.id}
          highlighted={index === highlightedIndex}
          {...getItemProps({ item, index })}>
          <img
            width='50'
            src={item.image || 'no_img.jpg'}
            alt={item.title}></img>
          {item.title}
        </DropDownItem>
      ));
    }
    return <DropDownItem>Nothing found for {inputValue}</DropDownItem>;
  };
  return (
    <StyledSearch {...getComboboxProps()}>
      <input {...getInputProps()}></input>
      <DropDown {...getMenuProps()}>{renderDropdownItems()}</DropDown>
    </StyledSearch>
  );
};
