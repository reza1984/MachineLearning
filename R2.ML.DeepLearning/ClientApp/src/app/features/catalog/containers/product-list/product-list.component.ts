import {
  Component,
  OnInit,
  OnDestroy,
  ComponentFactoryResolver,
  ViewContainerRef,
  AfterViewInit,
  Compiler
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../../catalog/catalog.state';
import * as fromReducer from '../../states/products/products.reducer';
import * as productActions from '../../states/products/products.actions';
import * as productSelectors from '../../states/products/products.selectors';
import { Product } from '../../states/products/products.interface';
import { ObservableHelper } from '../../../../helpers/observable.helper';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends ObservableHelper implements OnInit {
  products$: Observable<Product[]>;
  productsTotalCount$: Observable<number>;
  productsTotalCountString$: Observable<string>;
  currentPage = 1;
  itemsPerPage = 1;
  constructor(private store: Store<State>) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(productSelectors.getProducts));
    this.productsTotalCount$ = this.store.pipe(
      select(productSelectors.getProductsTotalCount)
    );

    this.store.dispatch(
      new productActions.SetProductGridSettings({
        pageNumber: this.currentPage,
        pageSize: this.itemsPerPage
      })
    );

    this.productsTotalCountString$ = this.store.pipe(
      select(productSelectors.getProductsTotalCountString)
    );
  }

  public pageChanged(event: any) {
    this.store.dispatch(
      new productActions.SetProductGridSettings({
        pageNumber: event.page,
        pageSize: this.itemsPerPage
      })
    );
  }
}
