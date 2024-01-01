import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  RESET_FAV,
} from "./actions";
import { toast } from "react-toastify";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: false,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      if (!state.favs.includes(action.payload)) {
        let newState = { ...state, favs: [...state.favs, action.payload]};
        writeFavsToLocalStorage(newState);
        toast.success("Favorilere eklendi!");
        return newState;
      }
    case FAV_REMOVE:
      let newState = {...state,favs: state.favs.filter((del) => del.message !== action.payload)};
      writeFavsToLocalStorage(newState);
      toast.success("Favorilerden silindi!");
      return newState;

    case RESET_FAV:
      let resetState = {...state,favs: []};
      writeFavsToLocalStorage(resetState);
      toast.success("Favoriler sıfırlandı!");
      return resetState;

    case FETCH_SUCCESS:
      return { ...state, current: action.payload, loading: false, error: "" };

    case FETCH_LOADING:
      return { ...state, loading: true, current: null, error: "" };

    case FETCH_ERROR:
      toast.error(action.payload);
      return { ...state, error: action.payload };

    case GET_FAVS_FROM_LS:
      toast.success("Favoriler yüklendi!");
      return { ...state, favs: readFavsFromLocalStorage || [] };

    default:
      return state;
  }
}