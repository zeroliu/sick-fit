/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UPDATE_ITEM_MUTATION
// ====================================================

export interface UPDATE_ITEM_MUTATION_updateItem {
  __typename: "Item";
  id: string;
}

export interface UPDATE_ITEM_MUTATION {
  updateItem: UPDATE_ITEM_MUTATION_updateItem;
}

export interface UPDATE_ITEM_MUTATIONVariables {
  id: string;
  title?: string | null;
  price?: number | null;
  description?: string | null;
}
