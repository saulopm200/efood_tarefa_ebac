import styled from 'styled-components'
import { breakpoints, cores } from '../../styles'

export const Card = styled.div`
  position: relative;

  > img {
    width: 100%;
    max-height: 217px;
    object-fit: cover;

    @media (max-width: ${breakpoints.tablet}) {
      padding: 0 20px;
      display: block;
      bottom: 3px;
      margin-top: 60px;
    }
  }
`

export const CardContainer = styled.div`
  background-color: ${cores.branco};
  padding: 8px;
  margin-bottom: 45px;
  border-left: 1px solid ${cores.coral};
  border-right: 1px solid ${cores.coral};
  border-bottom: 1px solid ${cores.coral};
  margin-top: -4px;

  @media (max-width: ${breakpoints.tablet}) {
    margin: 0 20px;
  }
`

export const TituloContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Titulo = styled.h3`
  font-weight: bold;
  font-size: 18px;
`

export const NotaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Nota = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-right: 8px;
`

export const Descricao = styled.p`
  font-size: 14px;
  line-height: 22px;
  margin: 16px 0;
  min-height: 110px;
`

export const Infos = styled.div`
  position: absolute;
  top: 16px;
  right: 24px;
`

export const TagContainer = styled.div`
  background-color: ${cores.coral};
  color: ${cores.bege};
  font-size: 12px;
  font-weight: bold;
  padding: 6px 4px;
  display: inline-block;
  margin-right: 8px;
`

export const SaibaMais = styled.button`
  background-color: ${cores.coral};
  font-size: 14px;
  font-weight: bold;
  padding: 4px 6px;
  display: inline-block;
  margin-right: 8px;
  border: none;
  cursor: pointer;
`
