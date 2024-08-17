import { CarritoAcciones } from "../reducers/cart-reducer"
import { IGuitarra } from "./IGuitarra"

export  interface IGuitarProps {
  guitar: IGuitarra
  dispatch : React.Dispatch<CarritoAcciones>
}
