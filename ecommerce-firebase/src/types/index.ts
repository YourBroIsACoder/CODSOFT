// src/types/index.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  originalPrice?: number; // for showing discount
  isNew?: boolean;
  isBestSeller?: boolean;
}

export type CartItem = Product & {
  quantity: number;
};

export type AuthUser = {
  email: string;
  displayName?: string;
  uid: string;
};