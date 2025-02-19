import { HeaderContainer, Titulo } from './styles'

import logo from '../../assets/images/logo.png'

const Header = () => (
  <HeaderContainer>
    <div className="container">
      <div>
        <img src={logo} alt="Efood" />
      </div>
      <div>
        <Titulo>Viva experiências gastronômicas no conforto da sua casa</Titulo>
      </div>
    </div>
  </HeaderContainer>
)

export default Header
