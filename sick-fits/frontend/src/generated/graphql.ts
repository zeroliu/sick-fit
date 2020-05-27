export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddToCartInput = {
  itemId: Scalars['ID'];
};

export type CartItem = {
  __typename?: 'CartItem';
  id: Scalars['ID'];
  quantity: Scalars['Int'];
  item: Item;
  user: User;
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
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  signIn?: Maybe<User>;
  signOut: Scalars['Boolean'];
  addToCart: Scalars['Boolean'];
  removeFromCart: Scalars['Boolean'];
  createItem: Item;
  updateItem?: Maybe<Scalars['ID']>;
  deleteItem?: Maybe<Scalars['ID']>;
  requestReset: Scalars['Boolean'];
  resetPassword: User;
  pay: Scalars['Boolean'];
  updatePermissions: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationSignInArgs = {
  data: SignInInput;
};


export type MutationAddToCartArgs = {
  data: AddToCartInput;
};


export type MutationRemoveFromCartArgs = {
  data: RemoveFromCartInput;
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


export type MutationRequestResetArgs = {
  data: RequestResetInput;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationPayArgs = {
  data: PayInput;
};


export type MutationUpdatePermissionsArgs = {
  data: UpdatePermissionsInput;
};

export type PayInput = {
  paymentMethodId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  cartItems: Array<CartItem>;
  items: Array<Item>;
  item?: Maybe<Item>;
  itemsConnection: Connection;
  me?: Maybe<User>;
  users: Array<User>;
};


export type QueryItemsArgs = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  searchTerm?: Maybe<Scalars['String']>;
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

export type RemoveFromCartInput = {
  cartItemId: Scalars['ID'];
};

export type RequestResetInput = {
  email: Scalars['String'];
};

export type ResetPasswordInput = {
  resetToken: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
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

export type UpdatePermissionsInput = {
  userId: Scalars['ID'];
  permissions: Array<UserPermission>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  permissions: Array<UserPermission>;
  cartItems: Array<CartItem>;
};

export enum UserPermission {
  Admin = 'ADMIN',
  User = 'USER',
  ItemCreate = 'ITEM_CREATE',
  ItemUpdate = 'ITEM_UPDATE',
  ItemDelete = 'ITEM_DELETE',
  PermissionUpdate = 'PERMISSION_UPDATE'
}
