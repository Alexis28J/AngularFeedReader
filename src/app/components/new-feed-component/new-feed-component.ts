import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { log } from 'firebase/firestore/pipelines';
import { FirestoreService } from '../../services/firestore-service';
import { Feed } from '../../model/feed';

@Component({
  selector: 'app-new-feed-component',
  imports: [ReactiveFormsModule],
  templateUrl: './new-feed-component.html',
  styleUrl: './new-feed-component.scss',
})
export class NewFeedComponent {

  firestore = inject(FirestoreService);

  //Creazione di un'istanza di FormBuilder (fb) che viene utilizzata per costruire il modulo del nuovo feed.
  //NOTA: Un'istanza è un oggetto creato a partire da una classe. 
  //In questo caso, fb è un'istanza della classe FormBuilder, che viene utilizzata per costruire il modulo del nuovo feed.
  fb: FormBuilder = new FormBuilder(); 
 
  //newFeedForm è un oggetto FormGroup che rappresenta il modulo del nuovo feed. 
  //Viene creato utilizzando il FormBuilder (fb) e contiene due campi: name e url, entrambi inizializzati con stringhe vuote.
  newFeedForm = this.fb.group({   
    name: [''],
    url: ['']
  });

  onSubmit(){
    //console.log(this.newFeedForm.value);
    const newFeed = this.newFeedForm.value as Feed;  //as Feed è un'operazione di casting che indica al compilatore TypeScript di trattare newFeedForm.value come un oggetto di tipo Feed.

    this.firestore.addFeed(newFeed);
  }
  
}
