import { Injectable, Injector } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/core/service/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService extends BaseResourceService<Object>{

  constructor(protected injector: Injector) {
    super('login', injector)
  }

  login(user: string, pass: string ) {
    return this.http.post(`${this.apiPath}?username=${user}&password=${pass}`, null);
  }
}
