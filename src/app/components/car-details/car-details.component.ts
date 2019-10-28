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
  carDetailsError = false;
  carDetailsErrorMsg = '';
  imageItem;

  fileData: File = null;

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
      price: [''],
      slug: ['', Validators],
      description: ['', Validators],
      date_online: [''],
      date_offline: [''],
      currency: [''],
      contact_phone: [''],
      contact_email: ['']
    });

  }

  ngOnInit() {

    this.carSlug = this.route.snapshot.paramMap.get('slug');
    console.log('carSlug: ', this.carSlug);

    this.getCarDetails();
    this.initCarDetails();

  }

  initCarDetails() {
    this.carDetails = {
      ref: '',
      name: '',
      body_type: '',
      engine: '',
      mileage: '',
      fuel_type: '',
      transmission: '',
      door_count: '',
      image_car: '',
      price: '',
      slug: '',
      description: '',
      date_online: '',
      date_offline: '',
      currency: '',
      contact_phone: '',
      contact_email: ''
    };
  }

  getCarDetails() {

    if (this.carSlug) {
      this.endpointService.requestWithUrlParams('car_by_slug', 'get', this.carSlug).subscribe( res => {
        // console.log('Get car details res: ', res);
        if (res) {
          this.carDetails = res;
        }
      }, error => {
        console.log('Error!! get car details res: ', error);
      });
    }

  }

  onFileChanged(event: any) {

    // console.log('onFileChanged event: ', event);

    const formData: FormData = new FormData();

    this.imageItem = event.target.files;

    console.log('onFileChanged event target files: ', this.imageItem);
    console.log('imageItem[0]: ', this.imageItem[0]);
    console.log('imageItem[0]name:   ', this.imageItem[0].name);

    formData.append('image', this.imageItem[0]);

    console.log('formData: ', formData);

    this.endpointService.request('image_upload', 'post', formData).subscribe( res => {
      console.log('Res upload image: ', res);
      console.log('Res upload image secureUrl: ', res.secure_url);
      if (res) {
        let secureUrl = res.secure_url;
        this.carDetails.image_car = secureUrl;

        console.log('carDetails: ', this.carDetails);
      }
    }, error => {
      console.log('Error!!! upload image: ', error);
    });

  }

 /* onFileChanged(event: any) {

    let formData = new FormData();

    this.imageItem = event.target.files;

    console.log("imageItem: ", this.imageItem);
    console.log("imageItem[0]: ", this.imageItem[0]);
    console.log("imageItem[0]['name']: ", this.imageItem[0]['name']);

    let data = {
      image: this.imageItem[0]
    };

    // formData.append('image', this.imageItem[0]);
    // formData.append('Image', JSON.stringify(data));
    formData.append('image_car', this.imageItem[0]);
    var options = { content: formData };

    console.log('options: ', options);
    console.log('img upload formData: ', formData);

    this.endpointService.requestWithHeaders('image_upload', 'post', formData).subscribe( res => {
      console.log("Res upload image:", res);
      console.log("Res upload image secureUrl: ", res.secure_url);
      if (res) {
        let secureUrl = res.secure_url;
        this.carDetails.image_car = secureUrl;
      }
    }, error => {
      console.log('Error! upload image:', error);
    });

  }*/

  addCarDetails() {
    console.log('Add car - carDetails: ', this.carDetails);

    this.carDetails.slug = this.carDetails.name.split(' ').join('-');
    console.log('slug in addcar: ', this.carDetails.slug);
    this.endpointService.request('add_car', 'post', this.carDetails).subscribe( res => {
      console.log('res add car: ', res);
    }, error => {
      console.log('Error!! add car: ', error);
    });
  }

  clearCarDetails() {
    this.initCarDetails();
  }

}
