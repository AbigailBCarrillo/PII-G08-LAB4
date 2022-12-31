import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/operators';

import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

readonly URL_API = 'http://localhost:4200/clientes';

  constructor(private http: HttpClient) { }

  postCliente(data: Cliente) {
    return this.http.post(this.URL_API, data)
  }

  getClientes() {
    return this.http.get(this.URL_API)
  }

  patchCliente(data: Cliente) {
    return this.http.patch(this.URL_API + `/${data._id}`, data)
  }

  deleteCliente(data: Cliente) {
    return this.http.delete(this.URL_API + `/${data._id}`)
  }
}

