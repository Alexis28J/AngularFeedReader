import { inject, Injectable, signal } from '@angular/core';
import { FirestoreService } from './firestore-service';
import { Feed } from '../model/feed';
import { News } from '../model/news';

@Injectable({
  providedIn: 'root',
})
export class RssService {
  
  firestore = inject(FirestoreService);

  news = signal<News[]>([]);

  constructor(){
    this.firestore.getUserFeeds().then(feeds => {
      console.log(feeds);
      
      const firstFeed = feeds[0];
      this.getNews(firstFeed);
    })
  }

  getNews(firstFeed: Feed) {
    console.log(firstFeed)
    return fetch(firstFeed.url)
    .then(resp => resp.text()) //tutti i formati che non sono json si devono trattare come testo
   //.then(text => console.log("rss",text))
    .then(text => this.parseRss(text));
  }

  //metodo che prende in input il testo del feed rss e lo trasforma in un array di news
  parseRss(text: string): any {  //il formato rss è un formato xml, quindi dobbiamo usare un parser xml per estrarre le informazioni che ci interessano
    const latestNews: News[] = [];   //creiamo un array di news che conterrà le news estratte dal feed rss
    const parser = new DOMParser();  //creiamo un parser xml //new DOMParser() è un costruttore che crea un nuovo oggetto DOMParser, che è una classe fornita dai browser per analizzare stringhe XML o HTML e restituire un documento DOM (Document Object Model) che rappresenta la struttura del documento. In questo caso, stiamo creando un'istanza di DOMParser per poter analizzare il testo del feed RSS e estrarre le informazioni che ci interessano.
    const xml = parser.parseFromString(text, 'application/xml'); 

    const items = xml.querySelectorAll('item'); 

    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      const pubDateRaw = element.querySelector('pubDate')?.textContent ?? '';
      const parsedDate = new Date(pubDateRaw);
      const news: News = { 
        title: element.querySelector('title')?.textContent ?? '',
        description: element.querySelector('description')?.textContent ?? '',

        // pubDate: element.querySelector('pubDate')?.innerHTML!,
        //per formattare la data in modo più leggibile, possiamo usare la classe Date di JavaScript per convertire la stringa della data in un oggetto Date e poi formattarlo come vogliamo. 
        //Ad esempio, possiamo usare il metodo toLocaleDateString() per ottenere una stringa con la data formattata secondo le convenzioni locali.
        pubDate: Number.isNaN(parsedDate.getTime()) ? pubDateRaw : parsedDate.toISOString(),

        url: element.querySelector('link')?.textContent ?? '',
      }
      latestNews.push(news);
    }
    this.news.set(latestNews);
  }
}
