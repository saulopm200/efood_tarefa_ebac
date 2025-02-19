import { Prato } from '../pages/Categories'

export const getTotalPrice = (items: Prato[]) => {
  return items.reduce((acumulador, valorAtual) => {
    if (valorAtual.preco) {
      return (acumulador += valorAtual.preco)
    }
    return 0
  }, 0)
}
