import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.scss']
})
export class ArtistasComponent implements OnInit {
  artista:any = {
    nombre:'',
    caratula:''
  };

  artistas:any  = [];


  constructor() { }

  ngOnInit(): void {
  }

  guardar():void {
    this.artistas.push({
      nombre: this.artista.nombre,
      caratula: this.artista.caratula,
    });
    console.log(this.artistas);
  }

}
