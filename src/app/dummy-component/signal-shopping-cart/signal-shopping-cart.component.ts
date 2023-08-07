import {
  Component,
  SimpleChange,
  computed,
  effect,
  signal
} from '@angular/core';
export interface Vehicle {
  id: number;
  name: string;
  price: number;
}
export const isNewChange = (prop: SimpleChange) => {
  return prop.currentValue !== prop.previousValue;
};
 
@Component({
  selector: 'app-signal-shopping-cart',
  templateUrl: './signal-shopping-cart.component.html',
  styleUrls: ['./signal-shopping-cart.component.scss']
})
export class SignalShoppingCart {
  quantity = signal<number>(1);
  qtyAvailable = signal([1, 2, 3, 4, 5, 6]);

  selectedVehicle = signal<Vehicle>({ id: 1, name: 'AT-AT', price: 10000 });

  vehicles = signal<Vehicle[]>([]);

  exPrice = computed(() => this.selectedVehicle().price * this.quantity());
  color = computed(() => this.exPrice() > 50000 ? 'green' : 'blue');

  constructor() {
    console.log(this.quantity());

    // Two for one sale
    this.quantity.update((qty) => qty * 2);

    // Interstellar price increase
    this.selectedVehicle.mutate((vehicle) => vehicle.price = vehicle.price + (vehicle.price * 0.2));

    // Add selected vehicle to array
    this.vehicles.mutate(vehicles => vehicles.push(this.selectedVehicle()));

    // Example of an effect
    effect(() => console.log(JSON.stringify(this.vehicles())));
  }

  // Example of a declarative effect
  qtyEff = effect(() => console.log("Latest quantity:", this.quantity()));

  onQuantitySelected(qty: number) {
    this.quantity.set(qty);

    // Does not "emit" values, rather updates the value in the "box"
    // this.quantity.set(5);
    // this.quantity.set(42);

    // Add the vehicle to the array again ... to see the effect execute
    //this.vehicles.mutate(v => v.push(this.selectedVehicle()))
  }
}
