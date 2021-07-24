export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Customer = {
  __typename?: 'Customer';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  surname: Scalars['String'];
  salutation: Scalars['String'];
  address: Scalars['String'];
  telephone: Scalars['String'];
  startDate?: Maybe<Scalars['Int']>;
  paymentDayOfMonth?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  pauseStart?: Maybe<Scalars['Int']>;
  pauseEnd?: Maybe<Scalars['Int']>;
  daysPerWeek: Scalars['Int'];
  plan: Plan;
  legacyPrice?: Maybe<Scalars['Int']>;
  snack: Scalars['String'];
  breakfast: Scalars['Boolean'];
  exclusions: Array<Exclusion>;
};

export type CustomerInput = {
  firstName: Scalars['String'];
  surname: Scalars['String'];
  salutation: Scalars['String'];
  address: Scalars['String'];
  telephone: Scalars['String'];
  startDate?: Maybe<Scalars['Int']>;
  paymentDayOfMonth?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  pauseStart?: Maybe<Scalars['Int']>;
  pauseEnd?: Maybe<Scalars['Int']>;
  daysPerWeek: Scalars['Int'];
  plan: PlanInput;
  legacyPrice?: Maybe<Scalars['Int']>;
  snack: Scalars['String'];
  breakfast: Scalars['Boolean'];
  exclusionIds: Array<Scalars['String']>;
};

export type DeleteCustomerInput = {
  id: Scalars['ID'];
};

export type DeleteExclusionInput = {
  id: Scalars['ID'];
};

export type DeleteRecipeInput = {
  id: Scalars['ID'];
};

export type Exclusion = {
  __typename?: 'Exclusion';
  id: Scalars['ID'];
  name: Scalars['String'];
  allergen: Scalars['Boolean'];
  customers: Array<Customer>;
  recipes: Array<Recipe>;
};

export type ExclusionInput = {
  name: Scalars['String'];
  allergen: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateRecipe?: Maybe<Recipe>;
  deleteRecipe?: Maybe<Scalars['String']>;
  createRecipe?: Maybe<Recipe>;
  updateCustomer?: Maybe<Customer>;
  createCustomer?: Maybe<Customer>;
  deleteCustomer?: Maybe<Scalars['String']>;
  updateExclusion?: Maybe<Exclusion>;
  createExclusion?: Maybe<Exclusion>;
  deleteExclusion?: Maybe<Scalars['String']>;
};


export type MutationUpdateRecipeArgs = {
  input?: Maybe<UpdateRecipeInput>;
};


export type MutationDeleteRecipeArgs = {
  input?: Maybe<DeleteRecipeInput>;
};


export type MutationCreateRecipeArgs = {
  input?: Maybe<RecipeInput>;
};


export type MutationUpdateCustomerArgs = {
  input?: Maybe<UpdateCustomerInput>;
};


export type MutationCreateCustomerArgs = {
  input?: Maybe<CustomerInput>;
};


export type MutationDeleteCustomerArgs = {
  input?: Maybe<DeleteCustomerInput>;
};


export type MutationUpdateExclusionArgs = {
  input?: Maybe<UpdateExclusionInput>;
};


export type MutationCreateExclusionArgs = {
  input?: Maybe<ExclusionInput>;
};


export type MutationDeleteExclusionArgs = {
  input?: Maybe<DeleteExclusionInput>;
};

export type Plan = {
  __typename?: 'Plan';
  name: Scalars['String'];
  mealsPerDay: Scalars['Int'];
  costPerMeal: Scalars['Int'];
  category: Scalars['String'];
};

export type PlanInput = {
  name: Scalars['String'];
  mealsPerDay: Scalars['Int'];
  costPerMeal: Scalars['Int'];
  category: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getExclusionById?: Maybe<Exclusion>;
  listExclusions?: Maybe<Array<Maybe<Exclusion>>>;
  getRecipeById?: Maybe<Recipe>;
  listRecipes?: Maybe<Array<Maybe<Recipe>>>;
  getCustomerById?: Maybe<Customer>;
  listCustomers?: Maybe<Array<Maybe<Customer>>>;
};


export type QueryGetExclusionByIdArgs = {
  exclusionId: Scalars['String'];
};


export type QueryGetRecipeByIdArgs = {
  recipeId: Scalars['String'];
};


export type QueryGetCustomerByIdArgs = {
  customerId: Scalars['String'];
};

export type Recipe = {
  __typename?: 'Recipe';
  id: Scalars['ID'];
  name: Scalars['String'];
  hotOrCold: Scalars['String'];
  shortName: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  potentialExclusions: Array<Exclusion>;
};

export type RecipeInput = {
  name: Scalars['String'];
  hotOrCold: Scalars['String'];
  shortName: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  exclusionIds: Array<Scalars['ID']>;
};

export type UpdateCustomerInput = {
  id: Scalars['ID'];
  firstName: Scalars['String'];
  surname: Scalars['String'];
  salutation: Scalars['String'];
  address: Scalars['String'];
  telephone: Scalars['String'];
  startDate?: Maybe<Scalars['Int']>;
  paymentDayOfMonth?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  pauseStart?: Maybe<Scalars['Int']>;
  pauseEnd?: Maybe<Scalars['Int']>;
  daysPerWeek: Scalars['Int'];
  plan: PlanInput;
  legacyPrice?: Maybe<Scalars['Int']>;
  snack: Scalars['String'];
  breakfast: Scalars['Boolean'];
  exclusionIds: Array<Scalars['String']>;
};

export type UpdateExclusionInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  allergen: Scalars['Boolean'];
};

export type UpdateRecipeInput = {
  id: Scalars['ID'];
  hotOrCold: Scalars['String'];
  shortName: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  exclusionIds: Array<Scalars['ID']>;
};
