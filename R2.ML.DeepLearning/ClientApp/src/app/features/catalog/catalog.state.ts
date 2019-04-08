import * as fromRoot from '../../state/app.interface';
import { ProductState } from './states/products/products.interface';

export interface State extends fromRoot.State {
  product: ProductState;
}
