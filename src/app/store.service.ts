import { ParkingLotService } from './services/parking-lot.service';
import { catchError, concatMap, EMPTY, finalize, Observable, tap } from 'rxjs';
import { Car } from './models/car';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

interface ParkingState {
  cars: Car[]
  error: string
  loading: boolean
}

@Injectable({
  providedIn: 'root'
})
export class StoreService extends ComponentStore<ParkingState> {

  constructor(private parkingLotService: ParkingLotService) {
    super({
      cars: [],
      error: '',
      loading: false
    })
  }

  //Selectors
  readonly vm$: Observable<ParkingState> = this.select((state) => state);
  //Updaters
  readonly updateError = this.updater((state: ParkingState, error: string) => {
    return {
      ...state,
      error
    }
  });

  readonly setLoading = this.updater((state: ParkingState, loading: boolean) => {
    return {
      ...state,
      loading
    }
  });

  readonly updateCars = this.updater((state: ParkingState, car: Car) => {
    return {
      ...state,
      error: '',
      cars: [...state.cars, car]
    }
  });


  //Effects
  readonly addCarToParkingLot  = this.effect((plate$: Observable<string>) => {
    return plate$.pipe(
      concatMap((plate:string)=>{
        this.setLoading(true)
        debugger
        return this.parkingLotService.add(plate).pipe(
          tap({
            next: (car) => this.updateCars(car),
            error: (e) => this.updateError(e),
          }),
          finalize(()=>{
            this.setLoading(false)
          }),
          catchError(()=> EMPTY)
        )

      })
    )
  })

}
