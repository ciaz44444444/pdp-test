import { useEffect, useState } from 'react'
import styles from '../styles/CartModal.module.css'
import type { CartProduct } from '../types/Products';

export function ShoppingCartModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [products, setProducts] = useState<CartProduct[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('cartItems')
    if (saved) {
      setProducts(JSON.parse(saved))
    }
  }, [visible])

  if (!visible) return null

  const handleRemove = (id: string) => {
    const filtered = products.filter(p => p.id !== id)
    setProducts(filtered)
    localStorage.setItem('cartItems', JSON.stringify(filtered))
  }

  const totalPrice = products.reduce((sum, p) => sum + (p.price ?? 0) * (p.quantity ?? 1), 0)

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Carrito de compras</h2>
        {products.length > 0 ? (
          <>
            <ul>
              {products.map((p, idx) => (
                <li key={idx} className={styles.cartProductItem}>
                  {p.imageUrl && <img src={p.imageUrl} alt={p.productName} className={styles.cartProductImage} />}
                  <div>
                    <strong>{p.productTitle}</strong> - {p.productName} ({p.brand})
                    {p.talla && ` (Talla: ${p.talla})`}
                    <br />
                    Precio: {p.price?.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) ?? 'N/D'}  
                    {p.quantity && ` x${p.quantity}`}
                  </div>
                  <button onClick={() => handleRemove(p.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
            <div className={styles.total}>
              <strong>Total: </strong>
              {totalPrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}
            </div>
          </>
        ) : (
          <p>No hay productos en el carrito.</p>
        )}
        <div className={styles.actions}>
          <button onClick={onClose}>Cerrar</button>
          <button className={styles.primary}>Finalizar compra</button>
        </div>
      </div>
    </div>
  )
}
