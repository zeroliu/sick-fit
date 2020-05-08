export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Connection = {
   __typename?: 'Connection';
  totalCount: Scalars['Int'];
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
  image?: Maybe<Scalars['String']>;
  largeImage?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createItem: Item;
  updateItem?: Maybe<Scalars['ID']>;
  deleteItem?: Maybe<Scalars['ID']>;
  register: User;
  signIn?: Maybe<User>;
};


export type MutationCreateItemArgs = {
  data: CreateItemInput;
};


export type MutationUpdateItemArgs = {
  data: UpdateItemInput;
  id: Scalars['ID'];
};


export type MutationDeleteItemArgs = {
  id: Scalars['ID'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationSignInArgs = {
  data: SignInInput;
};

export type Query = {
   __typename?: 'Query';
  items: Array<Item>;
  item?: Maybe<Item>;
  itemsConnection: Connection;
  me?: Maybe<User>;
};


export type QueryItemsArgs = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryItemArgs = {
  id: Scalars['ID'];
};

export type RegisterInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  permissions?: Maybe<Array<UserPermission>>;
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
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
  password: Scalars['String'];
  resetToken?: Maybe<Scalars['String']>;
  resetTokenExpiry?: Maybe<Scalars['String']>;
  permissions: Array<UserPermission>;
};

export enum UserPermission {
  Admin = 'ADMIN',
  User = 'USER',
  ItemCreate = 'ITEM_CREATE',
  ItemUpdate = 'ITEM_UPDATE',
  ItemDelete = 'ITEM_DELETE',
  PermissionUpdate = 'PERMISSION_UPDATE'
}
