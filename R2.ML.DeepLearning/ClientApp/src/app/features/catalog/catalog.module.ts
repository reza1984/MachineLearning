import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromProduct from './states/products/products.reducer';
import { ProductListService } from './containers/product-list/product-list.service';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './states/products/products.effects';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './containers/product-list/product-list.component';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    FormsModule,
    PaginationModule.forRoot(),
    StoreModule.forFeature('catalog', { product: fromProduct.reducer }),
    EffectsModule.forFeature([ProductEffects])
  ],
  providers: [ProductListService]
})
export class CatalogModule {}
