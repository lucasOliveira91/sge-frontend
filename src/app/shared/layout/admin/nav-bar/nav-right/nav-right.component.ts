import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from 'src/app/core/service/session.service';
import { UserContextService } from 'src/app/core/service/user-context.service';
import { AutenticacaoService } from 'src/app/shared/services/autenticacao.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {
  nomeUsuario;

  constructor(
    private sessionService: SessionService,
    private userContextService: UserContextService,
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit() { 
    var data = this.sessionService.getItem("currentUser");
    this.nomeUsuario = data.noUsuario;
  }

  logout() {
    this.autenticacaoService.logout().subscribe(resp => {
      this.userContextService.logout();
    }); 
  }
}
