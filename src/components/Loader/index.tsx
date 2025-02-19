import { FadeLoader } from 'react-spinners'
import { cores } from '../../styles'
import { Container } from './styles'

const Loader = () => (
  <Container>
    <FadeLoader color={cores.coral} />
  </Container>
)

export default Loader
