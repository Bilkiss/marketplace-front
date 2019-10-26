import { Component, OnInit } from '@angular/core';

import { EndpointsService } from '../../services/endpoints.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  carList: any = [];
  searchText: any;
  searchItem;
  carFilterList: any = [];

  constructor(
    public endpointService: EndpointsService
  ) { }

  ngOnInit() {

    this.getCarList();
    this.searchText = {
      name: '',
      price: '',
      body_type: ''
    };

  }

  resetSearch() {
    this.searchItem = '';
    this.carFilterList = this.carList;
  }

  searchFunc(event) {
    console.log('event.target.value: ', event.target.value);

    if (event.target.value) {
      this.searchItem = this.searchItem.toLowerCase();

      this.carFilterList = this.carList.filter( x => {
        let carName = x.name.toLowerCase();
        let carBody = x.body_type.toLowerCase();

        return carName.includes(this.searchItem) || carBody.includes(this.searchItem);

      });
    } else {
      this.carFilterList = this.carList;
    }

  }

  getCarList() {
    this.endpointService.request('car_list', 'get').subscribe( res => {
      console.log('Get car list res: ', res);
      if (res) {
        this.carList = res;
        if (this.carList) {
          this.carList = this.carList.data;
          this.carFilterList = this.carList;
          // console.log('Car list: ', this.carList);
          // console.log('Car filter list: ', this.carFilterList);
        }
      }
    }, error => {
      console.log('Error!! get car list: ', error);
    });

  }

}
