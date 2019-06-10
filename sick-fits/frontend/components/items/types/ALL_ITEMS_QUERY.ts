/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ALL_ITEMS_QUERY
// ====================================================

export interface ALL_ITEMS_QUERY_items {
  __typename: "Item";
  id: string;
  title: string;
  price: number;
  description: string;
  image: string | null;
  largeImage: string | null;
}

export interface ALL_ITEMS_QUERY {
  items: ALL_ITEMS_QUERY_items[];
}
