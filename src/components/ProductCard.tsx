import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/ProductCard.module.css'
import type { Product } from '../types/Products'

interface ProductCardProps {
  product: Product
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  const images = product.images || []

  const allTallas = product.items?.flatMap(item => item.Talla ?? []) ?? []
  const uniqueTallas = Array.from(new Set(allTallas))

  const getFirstAvailableTalla = () => {
    for (const talla of uniqueTallas) {
      const item = product.items?.find(i => i.Talla?.includes(talla))
      const value = item?.sellers?.[0]?.commertialOffer?.Installments?.[0]?.Value ?? item?.price
      if (value) return talla
    }
    return uniqueTallas[0]
  }

  const [selectedTalla, setSelectedTalla] = useState<string | undefined>(getFirstAvailableTalla())

  const selectedItem = product.items?.find(item => item.Talla?.includes(selectedTalla ?? ''))

  const color = selectedItem?.Color?.[0] ?? product.items?.[0]?.Color?.[0] ?? "Sin color"

  const priceValue =
    selectedItem?.sellers?.[0]?.commertialOffer?.Installments?.[0]?.Value ??
    selectedItem?.price ??
    product.items?.[0]?.sellers?.[0]?.commertialOffer?.Installments?.[0]?.Value ??
    product.items?.[0]?.price ??
    0

  const priceFormatted = priceValue
    ? priceValue.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })
    : 'Precio no disponible'

  const [hovered, setHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (hovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex(prev =>
          prev === images.length - 1 ? 0 : prev + 1
        )
      }, 3200)
    } else {
      setCurrentImageIndex(0)
    }

    return () => {
      clearInterval(interval)
    }
  }, [hovered, images])

  const isTallaAvailable = (talla: string) => {
    const item = product.items?.find(i => i.Talla?.includes(talla))
    const value = item?.sellers?.[0]?.commertialOffer?.Installments?.[0]?.Value ?? item?.price
    return !!value
  }

  const handleAddToCart = () => {
    if (!selectedItem) return

    const price = selectedItem.sellers?.[0]?.commertialOffer?.Installments?.[0]?.Value ?? selectedItem.price ?? 0
    const imageUrl = product.images?.[0]?.imageUrl

    const cartProduct = {
      id: selectedItem.itemId,
      productName: product.productName,
      productTitle: product.productTitle,
      brand: product.brand,
      talla: selectedTalla,
      price,
      quantity: 1,
      imageUrl,
    }

    const saved = localStorage.getItem('cartItems')
    let cartItems = saved ? JSON.parse(saved) : []

    const existingIndex = cartItems.findIndex(
      (p: any) => p.id === cartProduct.id && p.talla === cartProduct.talla
    )
    if (existingIndex >= 0) {
      cartItems[existingIndex].quantity = (cartItems[existingIndex].quantity ?? 1) + 1
    } else {
      cartItems.push(cartProduct)
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.imageWrapper}>
        <AnimatePresence mode="wait">
          {images.length > 0 && (
            <motion.img
              key={images[currentImageIndex]?.imageId || 'placeholder'}
              src={images[currentImageIndex]?.imageUrl}
              alt={images[currentImageIndex]?.imageText || product.productName}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className={styles.image}
              loading="lazy"
            />
          )}
        </AnimatePresence>
      </div>

      <div className={styles.textWrapper}>
        <p className={styles.title}>{product.productTitle}</p>
        <p className={styles.name}>{product.productName}</p>
        <p className={styles.brand}>{product.brand}</p>
        <p className={styles.color}>Color: {color}</p>
        <p>Referencia: {product.productReferenceCode}</p>
        <div className={styles.tallasWrapper}>
          <p className={styles.tallaLabel}>Talla:</p>
          <div className={styles.tallaOptions}>
            {uniqueTallas.length > 1 ? (
              uniqueTallas.map((t) => {
                const available = isTallaAvailable(t)
                return (
                  <button
                    key={t}
                    className={`${styles.tallaButton} ${t === selectedTalla ? styles.selected : ''}`}
                    onClick={() => available && setSelectedTalla(t)}
                    type="button"
                    title={available ? undefined : 'Talla no disponible'}
                    disabled={!available}
                  >
                    {t}
                  </button>
                )
              })
            ) : uniqueTallas.length === 1 ? (
              <span>{uniqueTallas[0]}</span>
            ) : (
              <span>Sin talla</span>
            )}
          </div>
        </div>

        <p className={styles.price}>Precio: <span>{priceFormatted}</span></p>

        <button className={styles.addButton} onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </motion.div>
  )
}
