import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { Order } from './order';
import { environment } from 'src/environments/environment';

const baseUrl = `${environment.orderapiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(public oktaAuth: OktaAuthService, private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any, responseType?: any) {
    const token = await this.oktaAuth.getAccessToken();

    console.log('request ' + JSON.stringify(data));
    const result = this.http.request(method, url, {
      body: data,
      responseType: responseType || 'json',
      observe: 'body',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  getOrders() {
    return this.request('get', `${baseUrl}`);
  }

  getOrder(id: string) {
    return this.request('get', `${baseUrl}/${id}`);
  }

  createOrder(Order: Order) {
    console.log('createOrder ' + JSON.stringify(Order));
    return this.request('post', `${baseUrl}`, Order);
  }

  updateOrder(Order: Order) {
    console.log('updateOrder ' + JSON.stringify(Order));
    return this.request('put', `${baseUrl}/${Order.id}`, Order);
  }

  deleteOrder(id: string) {
    return this.request('delete', `${baseUrl}/${id}`, null, 'json');
  }
}
