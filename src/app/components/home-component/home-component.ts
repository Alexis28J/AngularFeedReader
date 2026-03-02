import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RssService } from '../../services/rss-service';

@Component({
  selector: 'app-home-component',
  imports: [DatePipe],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {

  //inizializziamo la signal sortOldestFirst con il valore false, che indica che di default le news vengono ordinate dalla più recente alla più vecchia.
  rssServ = inject(RssService);  
  sortOldestFirst = signal(false);  

  //displayedNews è una signal computata che dipende da rssServ.news() e sortOldestFirst(). 
  //Ogni volta che una di queste signal cambia, displayedNews viene ricalcolata automaticamente.
  displayedNews = computed(() => {  
    const currentNews = this.rssServ.news();  

    //se sortOldestFirst è false, allora non ordiniamo le news e le restituiamo così come sono, senza modificarle.
    if (!this.sortOldestFirst()) {  
      return currentNews;
    }

    //se è true, crea una copia ([...currentNews]) e la ordina per data crescente (pubDate più vecchia prima).
    //[...] è l'operatore di spread in JavaScript, che permette di espandere un array in singoli elementi. In questo caso, viene usato per creare una nuova array che contiene gli stessi elementi di currentNews, ma che è una copia indipendente dell'array originale.
    //si mette ...currentNews per creare una copia dell'array currentNews, in modo da non modificare l'array originale. 
    //Questo è importante perché sort() modifica l'array su cui viene chiamato, e vogliamo evitare di modificare direttamente l'array originale che potrebbe essere usato altrove nel codice.
    return [...currentNews].sort(   
      (firstItem, secondItem) =>
        new Date(firstItem.pubDate).getTime() - new Date(secondItem.pubDate).getTime(),
    );
  });

  //Il bottone richiama toggleSortByOldest(), che fa solo toggle (cioè cambia lo stato) del booleano (true/false).
  toggleSortByOldest() {
    this.sortOldestFirst.update((value) => !value);
  }
}
