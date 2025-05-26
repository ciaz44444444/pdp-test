import { useState } from 'react'
import { ProductsPage } from './pages/ProductsPage'
import { ShoppingCartModal } from './components/ShoppingCartModal'

function App() {
  const [showCart, setShowCart] = useState(false)

  return (
    <>
      {/* Botón de bolsa de compras */}
      <div  style={{
        zIndex: 1000,
        background: '#fff',
        position: 'static',
        padding: '25px 25px',
        textAlign: 'right'
        



      }}><button
        onClick={() => setShowCart(true)}
        style={{
          background: '#095C4B',
          color: '#ffff',
          border: 'none',
          padding: '10px 16px',
          cursor: 'pointer'
        }}
      >
        Carrito
      </button>
      </div>
      {/* Modal del carrito */}
      <ShoppingCartModal visible={showCart} onClose={() => setShowCart(false)} />

      {/* Página de productos */}
      <ProductsPage />
    </>
  )
}

export default App