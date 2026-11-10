// Mahsulot interfeysi
export interface Product {
    id: string;
    name: string;
    category: string;
    manufacturer: string;
    purchasePrice: number;
    sellingPrice: number;
    quantity: number;
    minQuantity: number;
    expiryDate: string;
    image: string;
    description: string;
  }