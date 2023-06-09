import { Component, OnInit } from '@angular/core';
import { Ave } from './models/Ave';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  aves : Ave [] = [];
  puntajeRosa:number = 0;
  puntajeAzul:number = 0;
  tiempo:number = 0;
  maxAves:number = 9;
  anteriorAzar: number = 0;
  tamanioPuntaje: number = 0;
  finalizoJuego:Boolean = true;
  sumaBase: number = 0;
  aumento: number = 0;
  tiempoAnterior: number = 0;
  audioJuego = new Audio();

  constructor() { }

  ngOnInit(): void {
    this.fnCrearAves();
  }

  fnJugar(){
    this.fnInicializar();
    this.iniciarTemporizador();
  }

  fnCrearAves(){
    this.aves = [];
    for(let i = 0; i< this.maxAves; i++){
      const obj = new Ave();
      obj.numero = i + 1;
      obj.imagen = obj.numero % 2 == 0 ? 'aveRosa.png': 'aveAzul.png';
      obj.visibilidad = false;
      this.aves.push(obj);
    }
  }

  fnGenerarAve(){
    let azar = 0;

    do{
      azar = this.fnGenerarAleatoreo(1 , this.maxAves);
    }while(azar == this.anteriorAzar);

    this.anteriorAzar = azar;

    for(let i = 0; i < this.aves.length; i++){
      if(this.aves[i].numero == this.anteriorAzar){
        this.aves[i].visibilidad = true;
        break;
      }
    }

    this.fnValidarAumentoPuntaje();
  }

  fnValidarAumentoPuntaje(){
    const sumaTotal = this.puntajeAzul + this.puntajeRosa;

    this.sumaBase = sumaTotal - (this.aumento * 10);

    if(this.sumaBase == 10){
      this.tamanioPuntaje++;
      this.sumaBase = 0;
      this.aumento++;
    }
  }

  fnLimpiarAves(){
    for(let i = 0; i < this.aves.length; i++){
      this.aves[i].visibilidad = false;
    }
  }

  fnGenerarAleatoreo(min: number,max : number){
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  fnCapturarAve(item: Ave): any{
    if(!this.finalizoJuego && this.tiempoAnterior != this.tiempo){
      if(item.numero! % 2  == 0 ){
        this.puntajeRosa++;
      }else{
        this.puntajeAzul++;
      }
      this.tiempoAnterior = this.tiempo;
    }
  }

  fnInicializar(){
    this.puntajeRosa = 0;
    this.puntajeAzul = 0;
    this.tiempo = 60;
    this.finalizoJuego = false;
    this.anteriorAzar = 0;
    this.tamanioPuntaje = 16;
    this.fnCrearAves();
    this.fnReproducir();
  }

  fnDisminuirTiempo(){
    this.tiempo--;

    if(this.tiempo <= 0){
      this.finalizoJuego = true;
    }
  }

  iniciarTemporizador(){
    let t = window.setInterval(() => {
      if(this.tiempo <= 0){
        clearInterval(t);
      }else{
        this.fnDisminuirTiempo();
      }
    },1000)

    let t2 = window.setInterval(() => {
      if(this.tiempo <= 0){
        clearInterval(t2);
      }else{
        this.fnLimpiarAves();
        this.fnGenerarAve();
      }
    },700)
  }

  fnReproducir() {
    this.audioJuego.pause();
    this.audioJuego = new Audio('assets/audios/principal.mp3');
    this.audioJuego.volume = 0.2;
    this.audioJuego.play();
  }
}
