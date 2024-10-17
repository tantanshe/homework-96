export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleID?: string;
  avatar: string;
}

export interface CocktailMutation {
  name: string;
  image: string | null;
  recipe: string;
  ingredients: string[];
  isPublished: boolean;
  user: string;
}