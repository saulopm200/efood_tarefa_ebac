//import ModeloRestaurante from '../../models/Restaurante'
import { Restaurant } from '../../pages/Home'
import Restaurante from '../Restaurante'

import { Container, List } from './styles'

export type Props = {
  comercios: Restaurant[]
}

const ListaRestaurantes = ({ comercios }: Props) => (
  <Container className="container">
    <div>
      <List>
        {comercios.map((comercio) => (
          <li key={comercio.id}>
            <Restaurante
              id={comercio.id}
              tipo={comercio.tipo}
              image={comercio.capa}
              title={comercio.titulo}
              number={comercio.avaliacao}
              destacado={comercio.destacado}
              description={comercio.descricao}
              button={comercio.button}
            />
          </li>
        ))}
      </List>
    </div>
  </Container>
)

export default ListaRestaurantes
