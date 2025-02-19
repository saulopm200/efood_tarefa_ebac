import { useParams } from 'react-router-dom'

import { useGetRestaurantQuery } from '../../services/api'

import ProfileHeader from '../../components/ProfileHeader'
import Banner from '../../components/Banner'
import ListaPratos from '../../components/ListaPratos'
import Loader from '../../components/Loader'

export type Prato = {
  id: number
  foto: string
  preco: number
  nome: string
  descricao: string
  porcao: string
}

export interface Restaurante {
  id: number
  titulo: string
  destacado: boolean
  tipo: string
  avaliacao: number
  descricao: string
  capa: string
  cardapio: Prato[]
}

type PratoParams = {
  id: string
}

const Categories = () => {
  const { id } = useParams() as PratoParams
  const { data: restaurant } = useGetRestaurantQuery(id)

  if (restaurant) {
    return (
      <>
        <ProfileHeader />
        <Banner />
        <ListaPratos pratos={restaurant.cardapio} />
      </>
    )
  }

  return <Loader />
}

export default Categories
