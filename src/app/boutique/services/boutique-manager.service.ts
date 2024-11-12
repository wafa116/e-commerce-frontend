import { Injectable } from "@angular/core";
import { ProductsService } from "./products.service";

@Injectable()
export class BoutqiueManagerService {
    constructor(public products: ProductsService){}
}