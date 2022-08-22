import { StoreService } from './store.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  plate = '';

  vm$ = this.store.vm$;


  constructor(private store: StoreService) {

  }

  onSubmit($event:Event){
    $event.preventDefault();
    this.store.addCarToParkingLot(this.plate)
  }

  addPlate($event:Event){
    const target = $event.target as HTMLButtonElement;

    if( target.nodeName === 'BUTTON'){
      this.plate = target.innerHTML
    }

  }

}
