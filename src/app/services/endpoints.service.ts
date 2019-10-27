import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  private baseUrl = 'https://test-marketplace-api.herokuapp.com/api/';

  public endpoints = {
    car_list: `${this.baseUrl}car/list`,
  };

  constructor(
    public http: HttpClient
  ) { }


  // generic http request handler
  request(key: endpointType, method, payload?) {
    if (this.endpoints.hasOwnProperty(key)) {
      return this.http[method](this.endpoints[key], payload);
    }
    return { error: true, reason: `${method} request to ${this.endpoints[key]} was not sent` };
  }

}


export type endpointType = 'car_list';