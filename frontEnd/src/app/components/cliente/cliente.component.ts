import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { NgForm } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit{

  clients: Cliente[] = [];

  selectedCliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService) { }

  ngOnInit():void {
    this.getClientes
  }

  resetForm(form: NgForm) {
    if(form) {
      form.reset()
    }
  }

  addCliente(form: NgForm) {
    if(form.value._id) {
      this.clienteService.patchCliente(form.value)
      .subscribe( res => {
        this.resetForm(form)
      })
    } else {
      this.clienteService.postCliente(form.value)
      .subscribe( res => {
        this.resetForm(form)
      })
      this.getClientes()
    }
  }

  getClientes() {
    this.clienteService.getClientes()
    .subscribe( res => {
      this.clients = res as Cliente[]
    })
  }

  editCliente(cliente: Cliente) {
    this.selectedCliente = cliente
  }

  deleteCliente(cliente: Cliente) {
    if(confirm('¿Desea borrar el cliente?')) {
      this.clienteService.deleteCliente(cliente)
      .subscribe( res => {
        this.getClientes()
      })
    }
  }
}
