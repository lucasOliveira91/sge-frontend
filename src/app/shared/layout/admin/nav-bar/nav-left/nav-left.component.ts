import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/service/session.service';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent implements OnInit {

  periodo;
  subdivisao;
  perfil;

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    var data = this.sessionService.getItem("currentUser");
    this.periodo = data.noPeriodo;
    this.subdivisao = data.noSubdivisao;
    this.perfil = data.noPerfil;
  }

}
