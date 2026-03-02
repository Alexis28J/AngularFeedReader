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

  parseRss(text: string): any {   //*1
    const latestNews: News[] = [];   //*1.1
    const parser = new DOMParser();  //*1.2
    const xml = parser.parseFromString(text, 'application/xml'); //*1.3

    const items = xml.querySelectorAll('item'); //*1.4

    for (let i = 0; i < items.length; i++) {  //*1.5
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
