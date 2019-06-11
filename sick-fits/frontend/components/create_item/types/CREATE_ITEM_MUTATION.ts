/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CREATE_ITEM_MUTATION
// ====================================================

export interface CREATE_ITEM_MUTATION_createItem {
  __typename: "Item";
  id: string;
}

export interface CREATE_ITEM_MUTATION {
  createItem: CREATE_ITEM_MUTATION_createItem;
}

export interface CREATE_ITEM_MUTATIONVariables {
  title: string;
  price: number;
  description: string;
  image?: string | null;
  largeImage?: string | null;
}
