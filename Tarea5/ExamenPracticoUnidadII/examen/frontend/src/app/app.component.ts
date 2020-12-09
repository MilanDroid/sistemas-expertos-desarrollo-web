import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
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

  ordenes:any = [];
  usuarios:any = [];
  categorias:any = [];
  categoria:any = [];
  usuario:string = null;

  formularioRegistro = new FormGroup({
    nombre:new FormControl ('', [Validators.required]),
    descripcion:new FormControl('', [Validators.required]),
    color:new FormControl('', [Validators.required]),
    icono:new FormControl('', [Validators.required])
  });

  constructor(
    private modalService: NgbModal,
    private usuariosService:UsuariosService,
    private categoriasService:CategoriasService
  ) {}

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
    if (!this.usuario) {
      console.error('No se a seleccionado un usuario', );
    } else {
      console.log('verOrdenes', );

      this.usuariosService.verOrdenes(this.usuario).subscribe(
        res => {
          this.ordenes = res.ordenes;
          console.log('Ordenes', this.ordenes);
        },
        error => {
          console.error(error);
        }
      );
      this.modalService.open(this.modalPedidos, {size: 'lg'});
    }
  }
  crearCategoria() {
    console.log('crearCategoria');
    this.modalService.open(this.modalCreacionCategoria, {size: 'lg'});
  }
  guardar() {
    console.log('Formulario válido:' , this.formularioRegistro.valid);
    this.categoriasService.guardar(this.formularioRegistro).subscribe(
      res => {
        this.categoria = res;
        console.log('Categorias', this.categoria);
      },
      error => {
        console.error(error);
      }
    );
  }

  cambiarUsuario(id) {
    this.usuario = id;
    console.log('cambiar usuario', id);
  }

  infoCategorias(id) {
    console.log('ver información de categoría', id);

    this.categoriasService.infoCategorias(id).subscribe(
      res => {
        this.categoria = res;
        console.log('Categorias', this.categoria);
      },
      error => {
        console.error(error);
      }
    );

    this.modalService.open(this.modalCategorias, {size: 'xl'});
  }
}
