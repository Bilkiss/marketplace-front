import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EndpointsService } from '../../services/endpoints.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  carID;
  carDetails: any = {};
  carDetailsForm: FormGroup;

  constructor(
    public endpointService: EndpointsService,
    public route: ActivatedRoute,
    public router: Router,
    private fBuilder: FormBuilder
  ) {

    this.carDetailsForm = this.fBuilder.group({
      ref: ['', Validators],
      name: ['', Validators],
      body_type: ['', Validators],
      engine: ['', Validators],
      mileage: [''],
      fuel_type: [''],
      transmission: [''],
      door_count: [''],
      image_car: [''],
      price: ['']
    });

  }

  ngOnInit() {

    // this.carID = '';
    this.carID = this.route.snapshot.paramMap.get('id');
    console.log('carID: ', this.carID);

    this.getCarDetails();

  }

  getCarDetails() {

    if (this.carID) {
      this.endpointService.requestWithUrlParams('car_by_id', 'get', this.carID).subscribe( res => {
        console.log('Get car details res: ', res);
        if (res) {
          this.carDetails = res;
        }
      }, error => {
        console.log('Error!! get car details res: ', error);
      });
    }

  }

}
