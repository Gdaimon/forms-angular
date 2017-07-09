import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component ( {
  selector   : "app-template",
  templateUrl: "./template.component.html",
  styleUrls  : [ "./template.component.css" ]
} )
export class TemplateComponent implements OnInit {
  nombre : string = "Carlos";
  usuario = {
    nombre  : null,
    apellido: null,
    correo  : null,
    pais    : "CRI",
    sexo    : "Hombre",
    acepta  : true
  };
  
  paises = [
    {
      codigo: "CRI",
      nombre: "Costa Rica"
    },
    {
      codigo: "ESP",
      nombre: "España"
    }
  ];
  
  sexos = [ "Hombre", "Mujer", "Sin Definir" ];
  
  constructor () {
  }
  
  ngOnInit () {
  }
  
  guardar ( forma : NgForm ) {
    console.log ( "ngForm: ", forma );
    console.log ( "Formulario posteado...!" );
    console.log ( "valor Forma: ", forma.value );
    console.log ( "usuario:", this.usuario );
  }
  
}
