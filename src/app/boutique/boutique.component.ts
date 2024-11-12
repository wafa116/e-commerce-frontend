import { Component, OnInit } from '@angular/core';
import { BoutqiueManagerService } from './services/boutique-manager.service';
import { ProductsService } from './services/products.service';
import { ProductComponent } from './product/product.component';


@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [ProductComponent],
  providers: [BoutqiueManagerService, ProductsService],
  templateUrl: './boutique.component.html',
  styleUrl: './boutique.component.scss',
})
export class BoutiqueComponent implements OnInit {
  products: any[] = [];
  constructor(public manager: BoutqiueManagerService){}

  ngOnInit(): void {
    this.products = this.manager.products.data.categories[0].items;
  }
}
