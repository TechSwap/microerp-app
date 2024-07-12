import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ModalUsuarioComponent } from './usuarios/modal/modal-usuario/modal-usuario.component';
import { GridUsuarioComponent } from './usuarios/grid/grid-usuario/grid-usuario.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material.module";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    UsuariosComponent,
    PerfilComponent,
    ModalUsuarioComponent,
    GridUsuarioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UsuariosModule { }
