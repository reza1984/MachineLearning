import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../state/app.interface';
import * as fromCatalog from '../../catalog.state';
import * as fromProducts from './products.reducer';
import { ProductState } from './products.interface';

const getCatalogFeatureState = createFeatureSelector<fromCatalog.State>(
  'catalog'
);
export const getProductFeatureState = createSelector(
  getCatalogFeatureState,
  state => state.product
);
export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    return currentProductId
      ? state.products.find(p => p.Id === currentProductId)
      : null;
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getProductsTotalCount = createSelector(
  getProductFeatureState,
  state => state.productTotalCount
);

export const getProductsTotalCountString = createSelector(
  getProductFeatureState,
  state => {
    const firstItem =
      1 +
      state.productGridSettings.pageSize *
        (state.productGridSettings.pageNumber - 1);
    const pageSizeMultiplePageNumber =
      state.productGridSettings.pageSize * state.productGridSettings.pageNumber;
    const lastItem =
      pageSizeMultiplePageNumber < state.productTotalCount
        ? pageSizeMultiplePageNumber
        : state.productTotalCount;
    return `Displaying items ${firstItem} - ${lastItem} of ${
      state.productTotalCount
    }`;
  }
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);
