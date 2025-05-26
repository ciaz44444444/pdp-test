export interface ProductImage {
  imageId: string;
  imageLabel: string;
  imageTag: string;
  imageUrl: string;
  imageText: string;
  imageLastModified: string;
}

export interface Product {
  productId: string;
  productName: string;
  productReferenceCode: string;
  brand: string;
  productReference: string;
  description: string;
  productTitle: string;
  images: ProductImage[];
  items?: Item[];
}

export interface CartProduct {
  id: string;
  productName: string;
  productTitle: string;
  brand: string;
  talla?: string;
  price?: number;
  quantity?: number; // cantidad, default 1
  imageUrl?: string; // url imagen producto
  
}

export interface Item {
  itemId: string;
  Color?: string[];
  Talla?: string[];
  Installments?: Installment[]; // aquí viene el detalle de precios
  price?: number; // precio base, si está disponible
  listPrice?: number; // precio original o listado, si está disponible
  sellers?: Seller[]; // 👈 Agregamos esto para reflejar la estructura real
}

export interface Installment {
  Value: number; // precio que quieres mostrar
  InterestRate: number | null;
  TotalValuePlusInterestRate: number;
  NumberOfInstallments: number;
  PaymentSystemName: string;
  PaymentSystemGroupName: string;
  Name: string;
}
export interface Seller {
  sellerId: string;
  sellerName: string;
  addToCartLink: string;
  sellerDefault: boolean;
  commertialOffer: CommertialOffer;
}

export interface CommertialOffer {
  Installments: Installment[];
  // puedes agregar más campos si los necesitas
}
