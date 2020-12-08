import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from './services/categorias.service';
import { UsuariosService } from './services/usuarios.service';

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

  constructor(
    private modalService: NgbModal,
    private usuariosService:UsuariosService,
    private categoriasService:CategoriasService
  ) {}

  usuarios:any = [];
  categorias:any = [];

  ngOnInit():void {
    this.usuariosService.obtenerUsuarios().subscribe(
      res => {
        this.usuarios = res;
        console.log('Usuarios', this.usuarios);
      },
      error => {
        console.error(error);
      }
    );

    this.categoriasService.obtenerCategorias().subscribe(
      res => {
        this.categorias = res;
        console.log('Categorias', res);
      },
      error => {
        console.error(error);
      }
    );
  }

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
