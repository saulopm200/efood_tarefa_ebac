class ModeloRestaurante {
  id: number
  infos: string[]
  image: string
  title: string
  number: string
  star: string
  description: string
  button: string

  constructor(
    id: number,
    infos: string[],
    image: string,
    title: string,
    number: string,
    star: string,
    description: string,
    button: string
  ) {
    this.id = id
    this.infos = infos
    this.image = image
    this.title = title
    this.number = number
    this.star = star
    this.description = description
    this.button = button
  }
}

export default ModeloRestaurante
