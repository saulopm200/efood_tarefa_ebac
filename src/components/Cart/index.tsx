import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import { RootReducer } from '../../services/store/reducers/index'
import { close, remove } from '../../services/store/reducers/cart'
import { formataPreco } from '../PratosRestaurantes'

import Checkout from '../Checkout'

import {
  Overlay,
  CartContainer,
  Sidebar,
  CartItem,
  ValorTotal,
  ButtonContinuar
} from './styles'
//import { Prato } from '../../pages/Categories'
import { getTotalPrice } from '../../services/store/reducers/utils/index'

const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)
  const [payment, setPayment] = useState(false)
  const dispatch = useDispatch()

  const closeCart = () => {
    dispatch(close())
  }

  const removeItem = (id: number) => {
    dispatch(remove(id))
  }

  return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Overlay onClick={closeCart} />
      <Sidebar>
        {!payment && items.length > 0 ? (
          <>
            <ul>
              {items.map((item) => (
                <CartItem key={item.id}>
                  <img src={item.foto} alt={item.nome} />
                  <div>
                    <h3>{item.nome}</h3>
                    <span>{formataPreco(item.preco)}</span>
                  </div>
                  <button onClick={() => removeItem(item.id)} type="button" />
                </CartItem>
              ))}
            </ul>
            <ValorTotal>
              <p>Valor total</p>
              <p>
                {formataPreco(getTotalPrice(items))}
                {''}
              </p>
            </ValorTotal>
            <ButtonContinuar
              title="Clique aqui para continuar com a entrega"
              type="button"
              onClick={() => setPayment(true)}
            >
              Continuar com a entrega
            </ButtonContinuar>
          </>
        ) : (
          items.length === 0 && (
            <p className="empty-text">
              O carrinho está vazio, adicione pelo menos um produto para
              continuar com a compra.
            </p>
          )
        )}
        {payment && <Checkout setPayment={setPayment} />}
      </Sidebar>
    </CartContainer>
  )
}

export default Cart
