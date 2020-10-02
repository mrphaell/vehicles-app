import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  url = environment.api.url + '/api/vehicles'
  constructor(protected http: HttpClient) { }

  public post(data): Observable<any> {
    return this.http.post<any>(this.url, data);
  }

  public put(id, data): Observable<any> {
    return this.http.put<any>(this.url + '/' + id, data);
  }

  public get(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  public getOne(id): Observable<any> {
    return this.http.get<any>(this.url + '/' + id);
  }

  public delete(id): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }
}
