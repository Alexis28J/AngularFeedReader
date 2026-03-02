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

  parseRss(text: string): any {
    const latestNews: News[] = [];
  }
}
