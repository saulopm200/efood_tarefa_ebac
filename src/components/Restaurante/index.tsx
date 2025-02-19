import { Link } from 'react-router-dom'

import estrela from '../../assets/images/estrela.png'

import {
  Card,
  CardContainer,
  TituloContainer,
  Titulo,
  NotaContainer,
  Nota,
  Descricao,
  Infos,
  TagContainer,
  SaibaMais
} from './styles'

type Props = {
  id: number | undefined
  image: string
  title: string
  number: number
  description: string
  button: string
  tipo: string
  destacado: boolean
}

const Restaurante = ({
  id,
  image,
  title,
  number,
  description,
  tipo,
  destacado
}: Props) => (
  <Card>
    <img src={image} alt={title} />
    <Infos>
      {destacado === true ? (
        <TagContainer>Destaque da semana</TagContainer>
      ) : null}
      <TagContainer>{tipo}</TagContainer>
    </Infos>
    <CardContainer>
      <TituloContainer>
        <Titulo>{title}</Titulo>
        <NotaContainer>
          <Nota>{number}</Nota>
          <img src={estrela} alt="Estrela" />
        </NotaContainer>
      </TituloContainer>
      <Descricao>{description}</Descricao>
      <SaibaMais>
        <Link
          style={{ textDecoration: 'none', color: '#FFEBD9' }}
          to={`cardapio/${id}`}
        >
          Saiba mais
        </Link>
      </SaibaMais>
    </CardContainer>
  </Card>
)

export default Restaurante
