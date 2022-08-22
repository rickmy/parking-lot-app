import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { Car } from '../models/car';

const DATA: Car[] = [
  {
    plate: '2FMDK3',
    brand: 'Volvo',
    model: '960',
    color: 'Violet',
  },
  {
    plate: '1GYS4C',
    brand: 'Saab',
    model: '9-3',
    color: 'Purple',
  },
  {
    plate: '1GKS1E',
    brand: 'Ford',
    model: 'Ranger',
    color: 'Indigo',
  },
  {
    plate: '1G6AS5',
    brand: 'Volkswagen',
    model: 'Golf',
    color: 'Aquamarine',
  },
];

const FAKE_DELAY = 600;

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {
  private cars: Car[] = [];

  constructor() { }

  add(plate: string): Observable<Car> {
    debugger
    try {
      const existingCard = this.cars.find((eCard: Car) => eCard.plate === plate);
      if (existingCard) {
        throw `This card with ${plate} is already parked`
      }
      const car = this.getCardByPlate(plate);
      this.cars = [...this.cars, car];

      return of(car).pipe(delay(FAKE_DELAY))
    } catch (error) {
      return throwError(error)
    }
  }

  private getCardByPlate(plate: string): Car {
    const car = DATA.find((item: Car) => item.plate === plate);
    if (car) return car;
    throw `The card with plate ${plate} is not register`;
  }
}
