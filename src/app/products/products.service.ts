import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { Product } from './product';
import { environment } from 'src/environments/environment';

//const baseUrl = 'http://localhost:3000/api/product';

const baseUrl = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

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

  getProducts() {
    return this.request('get', `${baseUrl}/getProducts`);
  }

  getProduct(id: string) {
    return this.request('get', `${baseUrl}/getProduct/${id}`);
  }

  createProduct(product: Product) {
    console.log('createProduct ' + JSON.stringify(product));
    return this.request('post', `${baseUrl}/createProduct`, product);
  }

  updateProduct(product: Product) {
    console.log('updateProduct ' + JSON.stringify(product));
    return this.request('put', `${baseUrl}/updateProduct/${product.id}`, product);
  }

  deleteProduct(id: string) {
    return this.request('delete', `${baseUrl}/deleteProduct/${id}`, null, 'json');
  }
}
