import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';



@NgModule({
  declarations: [
    UsuariosComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsuariosModule { }
