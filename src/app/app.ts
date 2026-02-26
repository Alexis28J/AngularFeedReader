import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './services/firebase-service';
import { HeaderComponent } from "./components/header-component/header-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('AngularFeedReader');

  firebase = inject(FirebaseService);

  constructor(){
    console.log(this.firebase.app);
  }

}
