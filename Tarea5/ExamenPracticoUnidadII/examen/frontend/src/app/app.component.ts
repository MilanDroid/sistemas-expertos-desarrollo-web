import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lugo';

  @ViewChild ('modalCreacionCategoria') modalCreacionCategoria;
  @ViewChild ('modalPedidos') modalPedidos;
  @ViewChild ('modalCategorias') modalCategorias;
  @ViewChild ('modalUser') modalUser;

  constructor(private modalService: NgbModal) {}

  verOrdenes() {
    console.log('verOrdenes');
    this.modalService.open(this.modalPedidos, {size: 'lg'});
  }
  crearCategoria() {
    console.log('crearCategoria');
    this.modalService.open(this.modalCreacionCategoria, {size: 'lg'});
  }
  guardar() {
    console.log('guardar');
  }

  cambiarUsuario() {
    console.log('cambiar usuario');
  }

  infoCategorias() {
    console.log('ver información de categoría');
    this.modalService.open(this.modalCategorias, {size: 'xl'});
  }
}
