import axios from 'axios'
import type { Product } from '../types/Products'

export async function fetchProducts(): Promise<Product[]> {
  const res = await axios.get("https://api-prueba-frontend-production.up.railway.app/api/products") // Reemplaza con tu URL real
  const rawProducts = res.data

  // Asegura que cada producto tenga un array de imágenes directo
  return rawProducts.map((product: any) => ({
    ...product,
    images: product.items?.[0]?.images || []
  }))
}


