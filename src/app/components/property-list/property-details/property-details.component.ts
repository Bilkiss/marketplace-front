import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EndpointsService } from '../../../services/endpoints.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {

  propertySlug;
  propertyDetails: any = {};
  propertyDetailsForm: FormGroup;
  errorProp = false;
  errorProMsg = '';
  userDetails: any;

  constructor(
    public endpointService: EndpointsService,
    public route: ActivatedRoute,
    public router: Router,
    private fBuilder: FormBuilder,
    public storage: StorageService
  ) {

    this.propertyDetailsForm = this.fBuilder.group({
      ref: ['', Validators],
      name: ['', Validators],
      slug: ['', Validators],
      description: ['', Validators],
      date_online: [''],
      date_offline: [''],
      currency: [''],
      contact_phone: [''],
      contact_email: [''],
      price: ['']
    });
  }

  ngOnInit() {

    this.propertySlug = this.route.snapshot.paramMap.get('slug');
    // this.carID = this.route.snapshot.paramMap.get('id');
    console.log('propertySlug: ', this.propertySlug);

    this.getPropertyDetails();
    this.getUserCred();
  }

  getPropertyDetails() {

    if (this.propertySlug) {
      this.endpointService.requestWithUrlParams('property_by_slug', 'get', this.propertySlug).subscribe( res => {
        console.log('Get property details res: ', res);
        if (res) {
          this.propertyDetails = res;
        }
      }, error => {
        console.log('Error!! get property details res: ', error);
      });
    }

  }

  getUserCred() {
    this.userDetails = this.storage.get('currentUserCred');
    this.userDetails = JSON.parse(this.userDetails);
    console.log('userDetials: ', this.userDetails);
    if (this.userDetails) {
      this.propertyDetails.contact_phone = this.userDetails.phone;
      this.propertyDetails.contact_email = this.userDetails.email;
    }
  }

  addProperty() {

  }

  clearPro() {

  }

}
