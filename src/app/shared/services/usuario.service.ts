import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Combo } from '../model/combo.model';
import { BaseResourceService } from 'src/app/core/service/base-resource.service';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseResourceService<Combo>{

  constructor(protected injector: Injector) {
    super('api/usuario', injector)
  }

  getUsuario(login: string, sec: number): Observable<Usuario> {
    return this.http.get<any>(`${this.apiPath}/${login}/${sec}`)
  }

  getmodulos(): Observable<any[]> {
    return this.http.get<any>(`${this.apiPath}/modulos`)
  }
}
