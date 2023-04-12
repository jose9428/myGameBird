import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  cantCasas = [1,2,3,4,5,6,7,8,9];
  puntajeRosa:number = 0;
  puntajeAzul:number = 0;
  tiempo:number = 0;

  constructor() { }

  ngOnInit(): void {
    this.fnInicializar();
    this.iniciarTemporizador();
  }

  fnInicializar(){
    this.puntajeRosa = 0;
    this.puntajeAzul = 0;
    this.tiempo = 60;
  }

  fnDisminuirTiempo(){
    this.tiempo--;
  }

  iniciarTemporizador(){
    let t = window.setInterval(() => {
      if(this.tiempo <= 0){
        this.fnDisminuirTiempo();
        clearInterval(t);
      }else{
        this.fnDisminuirTiempo();
      }
    },1000)
  }
}
