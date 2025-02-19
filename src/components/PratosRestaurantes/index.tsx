import { useState } from 'react'
import { useDispatch } from 'react-redux'

import fechar from '../../assets/images/close.png'
import { Prato } from '../../pages/Categories'
import { add, open } from '../../store/reducers/cart'

import {
  Imagem,
  Card,
  CardContainer,
  TituloContainer,
  Titulo,
  Descricao,
  BotaoAdicionar,
  Modal,
  ModalContent,
  InfosContainer
} from './styles'

type ModalState = {
  isVisible: boolean
}

// type PratoProps = {
//   prato: Prato
// }

export const formataPreco = (preco = 0) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco)
}

const PratosRestaurante = ({
  foto,
  nome,
  descricao,
  porcao,
  preco,
  id
}: Prato) => {
  const [modal, setModal] = useState<ModalState>({
    isVisible: false
  })

  const closeModal = () => {
    setModal({
      isVisible: false
    })
  }

  const getDescricao = (descricao: string) => {
    if (descricao.length > 120) {
      return descricao.slice(0, 117) + '...'
    }
    return descricao
  }

  const prato = {
    foto,
    nome,
    descricao,
    porcao,
    preco,
    id
  }

  const dispatch = useDispatch()
  const addToCart = () => {
    dispatch(add(prato))
    dispatch(open())
  }

  return (
    <Card>
      <Imagem src={foto} alt={nome} />
      <CardContainer>
        <TituloContainer>
          <Titulo>{nome}</Titulo>
        </TituloContainer>
        <Descricao>{getDescricao(descricao)}</Descricao>
        <BotaoAdicionar
          onClick={() => {
            setModal({
              isVisible: true
            })
          }}
        >
          <a>Adicionar ao carrinho</a>
        </BotaoAdicionar>
        <Modal className={modal.isVisible ? 'visivel' : ''}>
          <ModalContent className="container">
            <img
              src={fechar}
              alt="Botão de fechar"
              onClick={() => {
                closeModal()
              }}
            />
            <div>
              <img
                src={foto}
                alt="Ícone de fechar"
                onClick={() => {
                  closeModal()
                }}
              />
            </div>
            <InfosContainer>
              <h4>{nome}</h4>
              <p>{descricao}</p>
              <p>Serve: {porcao}</p>
              <BotaoAdicionar onClick={addToCart}>
                Adicionar ao carrinho - {formataPreco(preco)}
              </BotaoAdicionar>
            </InfosContainer>
          </ModalContent>
          <div
            className="overlay"
            onClick={() => {
              closeModal()
            }}
          ></div>
        </Modal>
      </CardContainer>
    </Card>
  )
}

export default PratosRestaurante
