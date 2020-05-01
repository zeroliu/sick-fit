export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateItemInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  image: Scalars['String'];
  largeImage: Scalars['String'];
};

export type Item = {
   __typename?: 'Item';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  largeImage: Scalars['String'];
  price: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createItem: Item;
  updateItem: Scalars['Boolean'];
  register: User;
};


export type MutationCreateItemArgs = {
  data: CreateItemInput;
};


export type MutationUpdateItemArgs = {
  data: UpdateItemInput;
  id: Scalars['ID'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type Query = {
   __typename?: 'Query';
  items: Array<Item>;
  item: Item;
  hello: Scalars['String'];
};


export type QueryItemArgs = {
  id: Scalars['ID'];
};

export type RegisterInput = {
  name: Scalars['String'];
  email: Scalars['String'];
};

export type UpdateItemInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
};
