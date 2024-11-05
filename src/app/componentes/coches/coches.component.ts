import { Component } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { Coches } from '../../models/Coche';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CochesService } from '../../service/Coche.service';
import { MessageService } from 'primeng/api';
import { Marcas } from '../../models/Marca';
import { Tipos } from '../../models/Tipo';
import { MarcasService } from '../../service/Marca.service';
import { TiposService } from '../../service/Tipo.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { NgForOf, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-coches',
  standalone: true,
  imports: [ToolbarComponent, TableModule,ButtonModule,ButtonGroupModule,DialogModule,InputTextModule,ReactiveFormsModule,NgIf,NgForOf, FormsModule, DropdownModule],
  templateUrl: './coches.component.html',
  styleUrl: './coches.component.css'
})
export class CochesComponent {
  coches: Coches[]=[];
  marcas: Marcas[]=[];
  tipos: Tipos[]=[];
  visible: boolean = false;
  isUpdate: boolean = false;
  formCoche: FormGroup = new FormGroup({});
  mostrarTabla: boolean = true;

  constructor(
    private cocheSrevice:CochesService,
    private marcaService: MarcasService,
    private tipoService: TiposService,
    private messageService:MessageService
  ){}

  ngOnInit():void{
    this.getAllCoches();
    this.listarMarcas();
    this.listarTipos();
    this.formCoche = new FormGroup({
      id_coche: new FormControl(''),
      matricula:new FormControl(''),
      num_puertas:new FormControl(''),
      id_marca:new FormControl(''),
      id_tipo:new FormControl(''),
    });
  }

  getAllCoches(){
    this.cocheSrevice.getCoches().subscribe((data)=>{
      this.coches=data;
      console.log(this.coches);
    });
  }

  showDialog() {
    this.visible = true;
    this.isUpdate=false;
}

resetForm(){
  this.formCoche.reset();
}
listarCcoches(): void {
  this.cocheSrevice.getCoches().subscribe(
    (data: Coches[]) => {
      this.coches = data;
    },
    (error) => {
      console.error('Error al buscar coches', error);
    }
  );
}

listarMarcas(): void {
  this.marcaService.getMarcas().subscribe(
    (data: Marcas[]) => {
      this.marcas = data;
    },
    (error) => {
      console.error('Error al buscar marcas', error);
    }
  );
}

listarTipos(): void {
  this.tipoService.getTipos().subscribe(
    (data: Tipos[]) => {
      this.tipos = data;
    },
    (error) => {
      console.error('Error al obtener las tipos', error);
    }
  );
}

selectCoche(coches: any){
  this.isUpdate=true;
  this.visible = true;
  this.formCoche.controls['id_coche'].setValue(coches.id_coche);
  this.formCoche.controls['matricula'].setValue(coches.matricula);
  this.formCoche.controls['num_puertas'].setValue(coches.num_puertas);
  this.formCoche.controls['id_marca'].setValue(coches.marcas.id_marca);
  this.formCoche.controls['id_tipo'].setValue(coches.tipos.id_tipo);
}

CrearCoches() {    
  this.cocheSrevice.crearCoches(this.formCoche.value).subscribe({
    next: (resp) => {
      if (resp) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#fff', 
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
          customClass: {
            popup: 'custom-toast-popup'
          }
        });
        Toast.fire({
          icon: 'success',
          title: 'coche creado'
        });
        this.getAllCoches();
        this.formCoche.reset();
        this.visible=false;
      }
    },
    error: (err) => {
      console.error('Error creando el coche', err);
    }
  }
  );
}

actualizarCoche() {
  const coches = this.formCoche.value;
  if (!coches.id_coche) {
    this.visible=false;
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El coche no tiene un ID válido para actualizar.',
      background: '#fff',
      customClass: {
        popup: 'custom-toast-popup'
      }
    });
    return;
  }

  this.cocheSrevice.editarCoches(coches).subscribe({
    next: (resp) => {
      if (resp) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#fff',
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
          customClass: {
            popup: 'custom-toast-popup'
          }
        });
        
        Toast.fire({
          icon: 'success',
          title: 'Producto actualizado'
        });
        this.getAllCoches();
        this.formCoche.reset();
        this.visible=false;
      }
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar',
        text: 'Ocurrió un error al intentar actualizar el coche. Intenta de nuevo más tarde.',
        background: '#fff',
        customClass: {
          popup: 'custom-toast-popup'
        }
      });
      console.error('Error al actualizar el coche:', err);
    }
  });
}
eliminarCoche(id_coche: any){
  Swal.fire({
    title: "¿Estás seguro de borrar este coche?",
    text: "¡No serás capaz de reveritrlo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#19e212",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, borralo!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "¡Borrado!",
        text: "El dato ha sido borrado",
        icon: "success"
      });
      this.cocheSrevice.deleteCoches(id_coche).subscribe(resp=>{this.getAllCoches();});
    }
  });
}

}
