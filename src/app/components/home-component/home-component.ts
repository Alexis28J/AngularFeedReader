import { Component, effect, inject } from '@angular/core';
import { RssService } from '../../services/rss-service';

@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {

  rssServ = inject(RssService);

  constructor(){
  
    //effect è una funzione che consente di eseguire del codice ogni volta che una dipendenza reattiva cambia.
    effect(() => {
      this.rssServ.news()
    });
  }
}
