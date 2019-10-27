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

  carSlug;
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
    this.carSlug = this.route.snapshot.paramMap.get('slug');
    // this.carID = this.route.snapshot.paramMap.get('id');
    console.log('carSlug: ', this.carSlug);

    this.getCarDetails();

  }

  getCarDetails() {

    if (this.carSlug) {
      this.endpointService.requestWithUrlParams('car_by_slug', 'get', this.carSlug).subscribe( res => {
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
