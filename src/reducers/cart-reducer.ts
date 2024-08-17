import { db } from "../data/db";
import { ICarrito, IGuitarra } from "../interfaces/IGuitarra";

export type CarritoAcciones = 
{type : 'agregar-carrito', payload: {item: IGuitarra}} |
{type: 'borrar-carrito', payload: {id: IGuitarra['id']}} |
{type: 'decrementar-cantidad', payload: {id: IGuitarra['id']}} |
{type: 'incrementar-cantidad', payload: {id: IGuitarra['id']}} |
{type: 'limpiar-carrito'}

export interface CartState {
  data: IGuitarra[]
  carrito: ICarrito[]
}

const initialCart = () : ICarrito[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};


// Estado inicial
export const initialState : CartState = {
  data: db,
  carrito: initialCart()
}



const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

export const carritoReducer = (
  state: CartState = initialState,
  action: CarritoAcciones
) => {
  switch (action.type) {
    case 'agregar-carrito': {
      const itemExists = state.carrito.findIndex((guitar) => guitar.id === action.payload.item.id);
      let updateCard: ICarrito[] = [];

      if (itemExists !== -1) {
        // existe en el carrito
        updateCard = state.carrito.map(item => {
          if (item.id === action.payload.item.id) {
            if (item.quantity < MAX_ITEMS) {
              return { ...item, quantity: item.quantity + 1 };
            } else {
              return item;
            }
          } else {
            return item;
          }
        });
      } else {
        const newItem: ICarrito = { ...action.payload.item, quantity: 1 };
        updateCard = [...state.carrito, newItem];
      }

      return {
        ...state,
        carrito: updateCard
      };
    }

    case 'borrar-carrito': {
      const actualizarCarrito = state.carrito.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        carrito: actualizarCarrito
      };
    }

    case 'decrementar-cantidad': {
      const carrito = state.carrito.map(item => {
        if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });

      return {
        ...state,
        carrito
      };
    }

    case 'incrementar-cantidad': {
      const carrito = state.carrito.map(item => {
        if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });

      return {
        ...state,
        carrito
      };
    }

    case 'limpiar-carrito': {
      return {
        ...state,
        carrito: []
      };
    }

    default:
      return state;
  }
};
