import { HeaderContainer, Container } from './styles'

import { Link } from 'react-router-dom'

import logo from '../../assets/images/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../../src/services/store/reducers/index'

import { open } from '../../services/store/reducers/cart'

const ProfileHeader = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootReducer) => state.cart)

  const openCart = () => {
    dispatch(open())
  }

  return (
    <HeaderContainer>
      <Container className="container">
        <div>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Restaurantes</p>
        </div>
        <Link to="/">
          <img src={logo} alt="Efood" />
        </Link>
        <div>
          <button
            onClick={openCart}
            style={{ fontSize: '18px', fontWeight: 'bold' }}
          >
            {items.length} produto(s) no carrinho
          </button>
        </div>
      </Container>
    </HeaderContainer>
  )
}

export default ProfileHeader
