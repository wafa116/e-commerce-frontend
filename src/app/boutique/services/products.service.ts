import { Injectable } from "@angular/core";

@Injectable()
export class ProductsService {
    public data = {
        categories: [{
            name: 'electronics',
            items: [{
                label: 'Montre connectée xiomi',
                name: 'montre_xiomi',
                price: 250,
                colors: ['black'],
                quantity: 10,
                description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from ..'
            }, {
                label: 'PC Portable Gamer Lenovo',
                name: 'pc_portable_gamer_lenovo',
                price: 450,
                colors: ['black'],
                quantity: 25,
                description: 'agile dog that copes very well with mountainous terrain, the Shiba Inu was originall...'
            }]
        }]
    }
}