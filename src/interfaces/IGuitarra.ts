interface IGuitarra  {
  id : number
  image: string
  name : string
  description : string
  price: number
}

interface ICarrito extends IGuitarra  {
  quantity: number
}

type GuitarId = IGuitarra['id']


export type {
  IGuitarra,
  ICarrito,
  GuitarId
}