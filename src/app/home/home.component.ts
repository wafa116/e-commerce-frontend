import { Component } from '@angular/core';
import { BoutiqueComponent } from '../boutique/boutique.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BoutiqueComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
