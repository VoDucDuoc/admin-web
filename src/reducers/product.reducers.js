import { productConstants } from "../actions/constants";

const initState = {
  products: [],
  product: {},
  isGetProductLoading: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  isEnabling: false,
};
const productReducer = (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCT_SUCCESS:
      state = { ...state, products: action.payload.products };
      break;
    case productConstants.GET_PRODUCT_DETAIL_REQUEST:
      state = {
        ...state,
        isGetProductLoading: true,
      };
      break;
    case productConstants.GET_PRODUCT_DETAIL_SUCCESS:
      state = {
        ...state,
        product: action.payload,
        isGetProductLoading: false,
      };
      break;
    case productConstants.GET_PRODUCT_DETAIL_FAILURE:
      state = {
        ...state,
        product: {},
        isGetProductLoading: false,
      };
      break;
    case productConstants.CREATE_PRODUCT_REQUEST:
      state = {
        ...state,
        isAdding: true,
      };
      break;
    case productConstants.CREATE_PRODUCT_SUCCESS:
      state = {
        ...state,
        product: action.payload.product,
        products: [...state.products, action.payload.product],
        isAdding: false,
      };
      break;
    case productConstants.CREATE_PRODUCT_FAILURE:
      state = {
        ...state,
        product: {},
        isAdding: false,
      };
      break;
    case productConstants.UPDATE_PRODUCT_REQUEST:
      state = {
        ...state,
        isUpdating: true,
      };
      break;
    case productConstants.UPDATE_PRODUCT_SUCCESS:
      state = {
        ...state,
        product: action.payload.product,
        products: (() => {
          state.products.splice(
            state.products.findIndex(
              (product) => product._id === action.payload.product._id
            ),
            1,
            action.payload.product
          );
          return [...state.products];
        })(),
        isUpdating: false,
      };
      break;
    case productConstants.UPDATE_PRODUCT_FAILURE:
      state = {
        ...state,
        product: {},
        isUpdating: false,
      };
      break;
    case productConstants.DELETE_PRODUCT_REQUEST:
      state = {
        ...state,
        isEnabling: true,
      };
      break;
    case productConstants.DELETE_PRODUCT_SUCCESS:
      state = {
        ...state,
        product: {},
        products: (() => {
          const index = state.products.findIndex(
            (product) => product._id.toString() === action.payload.id.toString()
          );
          console.log(index);
          const products = [...state.products];
          products[index].isAvailable = false;
          return [...products];
        })(),
        isEnabling: false,
      };
      break;
    case productConstants.DELETE_PRODUCT_FAILURE:
      state = {
        ...state,
        product: {},
        isEnabling: false,
      };
      break;
    case productConstants.ENABLE_PRODUCT_REQUEST:
      state = {
        ...state,
        isEnabling: true,
      };
      break;
    case productConstants.ENABLE_PRODUCT_SUCCESS:
      state = {
        ...state,
        product: {
          ...state.product,
          isAvailable: true,
        },
        products: (() => {
          const index = state.products.findIndex(
            (product) => product._id.toString() === action.payload.id.toString()
          );
          console.log(index);
          const products = [...state.products];
          products[index].isAvailable = true;
          return [...products];
        })(),
        isEnabling: false,
      };
      break;
    case productConstants.ENABLE_PRODUCT_FAILURE:
      state = {
        ...state,
        product: {},
        isEnabling: false,
      };
      break;
    default:
      state = { ...state };
  }
  return state;
};
export default productReducer;
