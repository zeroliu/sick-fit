import { useCombobox, resetIdCounter } from 'downshift';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { DropDown, DropDownItem, StyledSearch } from './search_styles';
import { useDebounce } from 'src/lib/use_debounce';
import { useSearchItemsQueryBuilder, SearchItem } from 'src/queries/search';

export const Search: React.FC = () => {
  resetIdCounter();
  const router = useRouter();
  const [querySearchItems, { loading }] = useSearchItemsQueryBuilder();
  const [pending, setPending] = useState(false);
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);
  const findSearchItems = async (inputValue?: string) => {
    if (!inputValue) {
      setSearchItems([]);
      return;
    }
    const result = await querySearchItems({
      variables: { searchTerm: inputValue },
    });
    setSearchItems(result.data.items);
    setPending(false);
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
    onInputValueChange: ({ inputValue }) => {
      setPending(true);
      debouncedFindSearchItems(inputValue);
    },
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
    if (!isOpen || !inputValue || loading) {
      return null;
    }
    if (!pending && !searchItems.length) {
      return <DropDownItem>Nothing found for {inputValue}</DropDownItem>;
    }
    return searchItems.map((item, index) => (
      <DropDownItem
        key={item.id}
        highlighted={index === highlightedIndex}
        {...getItemProps({ item, index })}>
        <img width='50' src={item.image || 'no_img.jpg'} alt={item.title}></img>
        {item.title}
      </DropDownItem>
    ));
  };
  return (
    <StyledSearch {...getComboboxProps()}>
      <input placeholder='Search for an item' {...getInputProps()}></input>
      <DropDown {...getMenuProps()}>{renderDropdownItems()}</DropDown>
    </StyledSearch>
  );
};
