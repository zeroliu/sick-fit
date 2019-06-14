/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SINGLE_ITEM_QUERY
// ====================================================

export interface SINGLE_ITEM_QUERY_item {
  __typename: "Item";
  id: string;
  title: string;
  price: number;
  description: string;
}

export interface SINGLE_ITEM_QUERY {
  item: SINGLE_ITEM_QUERY_item | null;
}

export interface SINGLE_ITEM_QUERYVariables {
  id: string;
}
