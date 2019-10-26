import { Component, OnInit } from '@angular/core';

import { EndpointsService } from "../../services/endpoints.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  carList: any = [];

  constructor(
    public endpointService: EndpointsService
  ) { }

  ngOnInit() {

    this.getCarList();

  }

  getCarList() {
    this.endpointService.request('car_list', 'get').subscribe( res => {
      console.log('Get car list res: ', res);
      if (res) {
        this.carList = res;
        if (this.carList) {
          this.carList = this.carList.data;
          console.log('Car list: ', this.carList);
        }
      }
    }, error => {
      console.log('Error!! get car list: ', error);
    });

  }

}
