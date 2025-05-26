import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/products'
import { ProductCard } from '../components/ProductCard'
import type { Product } from '../types/Products'

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
      .then(data => {
        console.log(data)
        setProducts(data)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])
  

  if (loading) return <p>Cargando productos...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '24px',
        padding: '32px',
        backgroundColor: '#f7f7f7',
        minHeight: '100vh'
      }}
    >
      {products.map((product, index) => (
  <ProductCard key={product.productId} product={product} index={index} />
    ))}
    </div>
  )
}