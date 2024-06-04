import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { enviroment } from '../../environments/environment';
import { Rent } from '../models/rent';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  private listChange = new Subject<Rent[]>();

  constructor(private httpClient: HttpClient) {}

  create(data: Rent) {
    return this.httpClient.post<Rent>(`${enviroment.baseURL}/rents`, data);
  }

  list(){
    return this.httpClient.get<Rent[]>(`${enviroment.baseURL}/rents`)
  }

  setList(newList: Rent[]){
    this.listChange.next(newList);
  }

  getList(){
    return this.listChange.asObservable();
  }
}
