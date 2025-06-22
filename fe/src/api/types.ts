export interface User {
  _id: string;
  UserName: string;
  Email: string;
  Phone: string;
  FullName: string;
  Address: string;
  Role: 'user' | 'admin';
  Status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  UserName: string;
  Password: string;
}

export interface RegisterData {
  UserName: string;
  Email: string;
  Phone: string;
  FullName: string;
  Address: string;
  Password: string;
  Role: 'user';
  Status: 'active';
}

export interface Product {
  _id: string;
  Product_Name: string;
  CategoryID: string;
  Description?: string;
  Price: number;
  Main_Image: string;
  List_Image: string[];
  Specifications: Record<string, string>;
  Status: 'available' | 'unavailable';
  Stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  Name: string;
  Description: string;
  Status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  _id: string;
  CartID: string;
  ProductID: string;
  Quantity: number;
  Price: number;
  Product: Product;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  UserId: string;
  Items: CartItem[];
  TotalAmount: number;
  Status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  Order_Date: string;
  Test_Drive_Date: string;
  Address: string;
  Notes?: string;
  ImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  Product_Name: string;
  CategoryID: string;
  Main_Image: File | string;
  List_Image?: (File | string)[];
  Specifications: Record<string, string>;
  Status: 'available' | 'unavailable';
  Stock: number;
  Price: number;
  Description: string;
}

export interface UpdateProductData {
  Product_Name?: string;
  CategoryID?: string;
  Main_Image?: File | string;
  List_Image?: (File | string)[];
  Specifications?: Record<string, string>;
  Status?: 'available' | 'unavailable';
  Stock?: number;
  Price?: number;
  Description?: string;
}

export interface Cart {
  _id: string;
  UserID: string;
  items: CartItem[]; // Array of CartItem objects
  Total_Amount: number;
  Status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
} 