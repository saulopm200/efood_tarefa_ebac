import styled from 'styled-components'
import { breakpoints, cores } from '../../styles'

export const FooterContainer = styled.div`
  background-color: ${cores.bege};
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: auto;
`

export const RedesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 30px 0 80px;
`

export const Descricao = styled.p`
  margin: auto;
  font-size: 10px;
  text-align: center;
  max-width: 480px;
  width: 100%;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 20px;
  }
`
