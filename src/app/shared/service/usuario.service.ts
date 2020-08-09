import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Combo } from '../model/combo.model';
import { BaseResourceService } from 'src/app/core/service/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseResourceService<Combo>{

  constructor(protected injector: Injector) {
    super('api/usuario', injector)
  }

  getUsuario(login: string): Observable<Combo[]> {
    return this.http.get<any>(`${this.apiPath}/${login}`)
  }

}
