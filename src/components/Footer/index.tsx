import { FooterContainer, RedesContainer, Descricao } from './styles'

import logo from '../../assets/images/logo.png'
import instagram from '../../assets/images/instagram.png'
import facebook from '../../assets/images/facebook.png'
import twitter from '../../assets/images/twitter.png'
import { Link } from 'react-router-dom'

const Footer = () => (
  <FooterContainer>
    <div className="container">
      <Link to="/">
        <img src={logo} alt="Efood" />
      </Link>
      <RedesContainer>
        <img src={instagram} alt="Instagram" />
        <img src={facebook} alt="Facebook" />
        <img src={twitter} alt="Twitter" />
      </RedesContainer>
      <div>
        <Descricao>
          A efood é uma plataforma para divulgação de estabelecimentos, a
          responsabilidade pela entrega, qualidade dos produtos é toda do
          estabelecimento contratado.
        </Descricao>
      </div>
    </div>
  </FooterContainer>
)

export default Footer
