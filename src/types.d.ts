export interface Products {
  isNew?: boolean;
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  rating?: {
    rate: number;
    count: number;
  }
}
export interface Product {
  title: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  isNew?: boolean;
  rating?: {
    rate: number;
    count: number;
  }
}