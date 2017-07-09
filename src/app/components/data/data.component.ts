import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";

@Component ( {
  selector   : "app-data",
  templateUrl: "./data.component.html",
  styleUrls  : [ "./data.component.css" ]
} )
export class DataComponent implements OnInit {
  usuario : Object = {
    nombreCompleto: {
      nombre  : "Carlos",
      apellido: "Charris"
    },
    email         : "darkklitos@gmail.com",
    pasatiempos   : [ "Comer", "Dormir", "Correr" ]
  };
  
  forma : FormGroup;
  
  constructor ( private fb : FormBuilder ) {
    // console.log ( this.usuario );
    this.forma = fb.group ( {
      "nombreCompleto": fb.group ( {
        "nombre"  : [ "", Validators.compose ( [ Validators.required, Validators.minLength ( 5 ) ] ) ],
        "apellido": [ "", Validators.compose ( [ Validators.required, this.noHerrera ] ) ],
      } ),
      "email"         : [ "", Validators.compose ( [ Validators.required,
        Validators.pattern ( "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" ) ] ) ],
      "pasatiempos"   : new FormArray ( [
        new FormControl ( "Comer", Validators.required )
      ] ),
      "username"      : new FormControl ( "", Validators.required, this.existeUsuario ),
      "password1"     : new FormControl ( "", Validators.required ),
      "password2"     : new FormControl ()
    } )
    ;
    // this.forma.setValue ( this.usuario ); //cargar la informacion del objeto
    
    this.forma.controls  [ "password2" ].setValidators ( [ Validators.required
      , this.noIgual.bind ( this.forma ) ] )
    ;
    
    //Observable cambios formulario
    // this.forma.valueChanges
    //   .subscribe ( data => {
    //     console.log ( data );
    //   } );
    
    this.forma.controls[ "username" ].valueChanges
      .subscribe ( data => {
        console.log ( data );
      } );
    
    this.forma.controls[ "username" ].statusChanges
      .subscribe ( data => {
        console.log ( data );
      } );
    
  }
  
  ngOnInit () {
  }
  
  guardarCambios () {
    console.log ( this.forma.value );
    console.log ( this.forma );
    // this.forma.reset ( {
    //   nombreCompleto: {
    //     nombre  : "",
    //     apellido: ""
    //   },
    //   email         : ""
    // } );
  }
  
  agregarPasatiempos () {
    (<FormArray>this.forma.controls[ "pasatiempos" ]).push (
      new FormControl ( "", Validators.required )
    );
  }
  
  noHerrera ( control : FormControl ) : { [s : string] : boolean } {
    if ( control.value === "herrera" ) {
      return { noherrera: true };
    }
    return null;
  }
  
  noIgual ( control : FormControl ) : { [s : string] : boolean } {
    // console.log ( this );
    let forma : any = this;
    if ( control.value !== forma.controls[ "password1" ].value ) {
      return { noiguales: true };
    }
    return null;
  }
  
  existeUsuario ( control : FormControl ) : Promise<any> | Observable<any> {
    
    let promesa = new Promise (
      ( resolve, reject ) => {
        setTimeout ( () => {
          if ( control.value === "strider" ) {
            resolve ( { existe: true } );
          } else {
            resolve ( null );
          }
        }, 3000 );
        
      }
    );
    
    return promesa;
  }
  
}
