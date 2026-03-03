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
      //console.log(feeds);
      
      //const firstFeed = feeds[0];  //prendo il primo feed della lista, ma in futuro potrei voler prendere un feed specifico o tutti i feed
      //this.getNews(firstFeed);

      this.getNews(feeds); //passo tutti i feed alla funzione getNews, che poi si occuperà di estrarre le news da ogni feed e di restituirle in un formato più comodo da usare nel mio frontend
    })
  }

  // getNews(firstFeed: Feed) {  
  //   console.log(firstFeed)
  //   return fetch(firstFeed.url)
  //   .then(resp => resp.text()) //tutti i formati che non sono json si devono trattare come testo
  //  //.then(text => console.log("rss",text))
  //   .then(text => this.parseRss(text));
  // }

  getNews(feeds: Feed[]) { //Feed[] è un array di feed, quindi posso passare tutti i feed che voglio, ma per ora prendo solo il primo feed della lista

    const requests = [];
    
    for (const feed of feeds) { //per ogni feed della lista, faccio una richiesta fetch per ottenere il testo del feed e poi lo passo alla funzione parseRss per estrarre le news
      
      const request = fetch(feed.url)
      .then(async resp => {
        const origin = feed.name; //prendo il nome del feed, che userò come origine della news
        const xml = await resp.text(); //tutti i formati che non sono json si devono trattare come testo
        return { xml, origin }; //restituisco un oggetto con il testo del feed e l'origine, così posso passare entrambe le informazioni alla funzione parseRss
      })

      .catch(err => '') //se c'è un errore nella richiesta, restituisco una stringa vuota per evitare che il parser xml si rompa;
      requests.push(request);

    }

    Promise.all(requests).then(res => this.parseRss(res)); 
    //Promise.all è un metodo che prende un array di promesse e restituisce una nuova promessa che si risolve quando tutte le promesse dell'array si sono risolte, o si rifiuta se una qualsiasi delle promesse dell'array si rifiuta. In questo caso, sto usando Promise.all per aspettare che tutte le richieste fetch siano completate prima di procedere con l'elaborazione dei risultati.
    //res è un array di oggetti con il testo del feed e l'origine, che passo alla funzione parseRss per estrarre le news e aggiungere l'origine a ogni news
  }

    parseRss(responses:any[]): any {   //*1

    const latestNews: News[] = [];   //*1.1

    for (const response of responses) {

    const parser = new DOMParser();  //*1.2

    const xml = parser.parseFromString(response.xml, 'application/xml'); //*1.3

    const items = xml.querySelectorAll('item'); //*1.4

        for (let i = 0; i < items.length; i++) {  //*1.5

        const element = items[i];
        const news: News = { 
        title: element.querySelector('title')?.innerHTML!,
        description: element.querySelector('description')?.innerHTML!,
        url: element.querySelector('link')?.innerHTML!,
        //origin: 'unknown'  //per ora non so come ottenere l'origine della news, ma in futuro potrei voler aggiungere questa informazione al mio modello di news e poi estrarla dal feed rss
        origin: response.origin, //prendo l'origine dal feed, che ho passato alla funzione parseRss insieme al testo del feed, così posso associare ogni news all'origine da cui proviene
        
        //const pubDateRaw = element.querySelector('pubDate')?.textContent ?? '';
        //const parsedDate = new Date(pubDateRaw);
        //pubDate: element.querySelector('pubDate')?.innerHTML!,
        //per formattare la data in modo più leggibile, possiamo usare la classe Date di JavaScript per convertire la stringa della data in un oggetto Date e poi formattarlo come vogliamo. 
        //Ad esempio, possiamo usare il metodo toLocaleDateString() per ottenere una stringa con la data formattata secondo le convenzioni locali.
        //pubDate: Number.isNaN(parsedDate.getTime()) ? pubDateRaw : parsedDate.toISOString(),
      }
      const dateString = element.querySelector('pubDate')?.innerHTML;

      if (dateString) {
        news.pubDate = new Date(dateString);
      }

      latestNews.push(news);
      }
    }

    latestNews.sort((n1, n2) => n2.pubDate!.getTime() - n1.pubDate!.getTime()); 

    this.news.set(latestNews);
  }
}
