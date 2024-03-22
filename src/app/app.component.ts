import { Component, OnInit } from '@angular/core';
import { Configuracion } from './modelos/Configuracion';
import { FormGroup, FormControl,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  public ongiEtorri: string="";
  public respuesta: number=0;
  public intentosRestantes: number=0;
  public listaRespuestas: Array<number>=[];

  public mostrarJuego: boolean= false;
  public mostrarRespuesta: boolean = false;
  public haAdivinado: boolean = false;
  public terminarJuego: boolean= false;
  public hasFallado: boolean= false;

  public configuracion;

  datos= new FormGroup({
    nombre: new FormControl(),
    apellido: new FormControl(),
    rango: new FormControl(),
    intentos: new FormControl()
  });
  
  constructor(){
    this.configuracion= new Configuracion("","",0,0,0);
  }

  ngOnInit(): void {
  }

  /*Gestiona los datos recogidos y se crea el objeto configuracion que guarda los datos*/
  recogerDatos(): void {
    var miNombre= this.datos.controls['nombre'].value;
    var miApellido= this.datos.controls['apellido'].value;
    var miRango= this.datos.controls['rango'].value;
    var misIntentos= this.datos.controls['intentos'].value;

    /*Se genera el número aleatorio*/
    var miNumeroAleatorio= Math.floor(Math.random() * (miRango+ 1))
    this.configuracion = new Configuracion(miNombre, miApellido, miRango, misIntentos, miNumeroAleatorio)
    console.log(this.configuracion)
    this.intentosRestantes = this.configuracion.numeroIntentos;
    this.empezarJuego();
  }

  /*Se muestran el mensaje de bienvenida y el juego*/
  empezarJuego(): void {
   this.ongiEtorri = '<h2>Ongi Etorri '+ this.configuracion.nombre +' '+ this.configuracion.apellido +'</h2>'
   this.mostrarJuego = true;
  }

  /*Se gestionan los eventos que pasan cada vez que se intenta adivinar el número*/
  evaluarIntento(){
    this.mostrarRespuesta = true;

    this.intentosRestantes-=1;
    this.listaRespuestas.push(this.respuesta);

    /*Se comprueba si la respuesta es correcta o incorrecta*/
    if (this.configuracion.numeroAleatorio == this.respuesta) {
      this.haAdivinado = true;
      this.terminarJuego = true;
    } else {
      this.haAdivinado = false;
    }

    /*Se comprueba si la respuesta está en el rango permitido*/
    if (this.respuesta<0 || this.respuesta>this.configuracion.rangoNumero){
      alert("El número introducido no está en el rango de números generado.")
    }

    /*Se comprueba si quedan intentos restantes*/
    if (this.intentosRestantes==0) {
      this.hasFallado=true;
      this.terminarJuego=true;
    }
  }
}
