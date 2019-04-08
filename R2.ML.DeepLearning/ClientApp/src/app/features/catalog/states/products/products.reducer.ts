import { ProductActions, ProductActionTypes } from './products.actions';
import { ProductState } from './products.interface';

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: null,
  productTotalCount: -1,
  productGridSettings: null,
  error: ''
};

export function reducer(
  state = initialState,
  action: ProductActions
): ProductState {
  switch (action.type) {
    case ProductActionTypes.SetProductGridSettings:
      return {
        ...state,
        productGridSettings: action.payload
      };
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload.data,
        productTotalCount: action.payload.total,
        error: ''
      };

    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: null,
        productTotalCount: -1,
        error: action.payload
      };

    default:
      return state;
  }
}
