import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { VehicleService } from './services/vehicle/vehicle.service';
import { Vehicle } from './models/vehicle';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  insert = false;
  editing = false;
  
  dataAll: any[];
  data: Vehicle = new Vehicle();
  displayedColumns: string[] = ['actions', 'id', 'modelo', 'marca', 'ano', 'placa', 'chassi', 'renavam'];

  constructor(private service: VehicleService) {
    this.load()
  }

  async load() {
    const result = await this.service.get().toPromise();
    console.log(result)
    this.dataAll = result.data;
  }

  addVehicle(): void {
    this.insert = true;
  }

  insertVehicle() {
    const _success = (success) => {
      this.insert = false;
      this.load();
    }

    const _error = (error) => {
      console.log(error);
      alert(error.error.ExceptionMessage);
    }

    this.service.post(this.data).subscribe(
      (success) => _success(success),
      (error) => _error(error)
    );
  }

  cancelar() {
    this.editing = false;
    this.insert = false;
    this.data = new Vehicle();
  }

  salvar() {
    if (this.insert)
      this.insertVehicle();
    else if (this.editing)
      this.edit();
  }

  action(action, ev) {
    if (action == 'edit') {
      this.editVehicle(ev);
    } else if (action == 'delete') {
      this.delete(ev);
    }
  }

  editVehicle(ev) {
    this.data = ev;
    this.editing = true;
  }

  edit() {
    const _success = (success) => {
      this.editing = false;
      this.data = new Vehicle();
      this.load();
    }

    const _error = (error) => {
      console.log(error);
      alert(error.error.ExceptionMessage);
    }

    this.service.put(this.data.id ,this.data).subscribe(
      (success) => _success(success),
      (error) => _error(error)
    );
  }

  delete(ev) {
    const _success = (success) => {
      this.load();
    }

    const _error = (error) => {
      console.log(error);
      alert(error.error.ExceptionMessage);
    }

    this.service.delete(ev.id).subscribe(
      (success) => _success(success),
      (error) => _error(error)
    );
  }
}
