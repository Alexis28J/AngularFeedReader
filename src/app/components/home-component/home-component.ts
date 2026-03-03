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

  rssServ = inject(RssService);  
  // sortOldestFirst = signal(false);  //*1

  // displayedNews = computed(() => {  //*2
  //   const currentNews = this.rssServ.news();  

  //   //*3
  //   if (!this.sortOldestFirst()) {  
  //     return currentNews;
  //   }

  //   return [...currentNews].sort(   
  //     (firstItem, secondItem) =>
  //       new Date(firstItem.pubDate).getTime() - new Date(secondItem.pubDate).getTime(),
  //   );
  // });

  // //*4
  // toggleSortByOldest() {
  //   this.sortOldestFirst.update((value) => !value);
  // }
}
