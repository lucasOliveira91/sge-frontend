import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Combo } from '../model/combo.model';
import { BaseResourceService } from 'src/app/core/service/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class DadosEscolaresService extends BaseResourceService<Combo>{

  constructor(protected injector: Injector) {
    super('api/dados-escolares', injector)
  }

  getSecretarias(): Observable<Combo[]> {
    return this.http.get<Combo[]>(`${this.apiPath}/secretarias-educacao`)
  }

  getPeriodoLetivo(): Observable<Combo[]> {
    return this.http.get<Combo[]>(`${this.apiPath}/periodo-letivo`)
  }

  getSubdivisao(): Observable<Combo[]> {
    return this.http.get<Combo[]>(`${this.apiPath}/subdivisao`)
  }
}
