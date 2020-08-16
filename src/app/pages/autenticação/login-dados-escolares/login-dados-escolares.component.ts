import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DadosEscolaresService } from 'src/app/shared/services/dados-escolares.service';
import { SessionService } from 'src/app/core/service/session.service';
import { UserContextService } from 'src/app/core/service/user-context.service';
import { RouteStateService } from 'src/app/core/service/route-state.service';

@Component({
  selector: 'app-login-dados-escolares',
  templateUrl: './login-dados-escolares.component.html',
  styleUrls: ['./login-dados-escolares.component.scss']
})
export class LoginDadosEscolaresComponent implements OnInit {
  form: FormGroup;
  unidades = [];
  periodos = [];
  subdivisoes = [];
  isSubmit: boolean = false;
  usuario;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dadosEscolaresService: DadosEscolaresService,
    private sessionService: SessionService,
    private userContextService: UserContextService,
    private routeStateService: RouteStateService
  ) { }

  ngOnInit() {
  

    this.usuario = this.sessionService.getItem("currentUser");
    console.log(this.usuario)

    if (this.usuario.noPerfil == 'Administrador' || this.usuario.noPerfil == 'SEMED') {
      this.form = this.fb.group({
        periodo: [null, [Validators.required]],
      });

      this.carregarPeriodoLetivo();
    } else {
      this.form = this.fb.group({
        unidade: [null, [Validators.required]],
        periodo: [null, [Validators.required]],
        subdivisao: [null, [Validators.required]]
      });

      this.carregarUnidadesEnsino();
    }
  }

  carregarUnidadesEnsino() {
    let usuario = this.sessionService.getItem("currentUser");
    this.dadosEscolaresService.getUnidadesEnsino(usuario.codSecretariaEnsino).subscribe(list => {
      list.forEach(sec => this.unidades.push({ name: sec['descricao'], value: sec['id'] }))

      if (this.unidades.length > 0) {
        this.form.controls['unidade'].setValue(this.unidades[0].value);
      }
      this.carregarPeriodoLetivo();
    });
  }

  carregarPeriodoLetivo() {
    this.dadosEscolaresService.getPeriodoLetivo(this.usuario.codSecretariaEnsino).subscribe(list => {
      list.forEach(sec => this.periodos.push({ name: sec['descricao'], value: sec['id'] }))

      if (this.periodos.length > 0) {
        this.form.controls['periodo'].setValue(this.periodos[this.periodos.length - 1].value);
      }

      this.carregarSubdivisao();
    });

  }

  carregarSubdivisao() {
    if (this.unidades.length > 0) {
      this.dadosEscolaresService.getSubdivisoes(this.usuario.codSecretariaEnsino, this.form.controls['unidade'].value, this.form.controls['periodo'].value).subscribe(list => {
        list.forEach(sec => this.subdivisoes.push({ name: sec['descricao'], value: sec['id'] }))

        if (this.subdivisoes.length > 0) {
          this.form.controls['subdivisao'].setValue(this.subdivisoes[this.subdivisoes.length - 1].value);
        }
      });
    }
  }

  onChangeUnidade($event) {
    this.periodos = [];
    this.carregarPeriodoLetivo();
  }

  onChangePeriodo($event) {
    console.log(event)
    this.subdivisoes = [];
    this.carregarSubdivisao();
  }

  logon() {
    console.log(this.form)
    if (this.form.valid) {
      if (this.form.controls['periodo']) {
        this.usuario.codPeriodo = this.form.controls['periodo'].value;
        this.usuario.noPeriodo = this.periodos.find(p => p.value == this.form.controls['periodo'].value).name;
      }

      if (this.form.controls['subdivisao']) {
        this.usuario.codSubdivisao = this.form.controls['subdivisao'].value;
        this.usuario.noSubdivisao = this.subdivisoes.find(p => p.value == this.form.controls['subdivisao'].value).name;
      }

      if (this.form.controls['unidade']) {
        this.usuario.codUnidade = this.form.controls['unidade'].value;
        this.usuario.noSecretaria = this.unidades.find(p => p.value == this.form.controls['unidade'].value).name;
      }
      this.userContextService.setUser(this.usuario);

      this.routeStateService.add("Home", '', null, true);
    }
  }

  required(field: string) {
    return this.form != null && (this.isSubmit || (this.form.controls[field].dirty || this.form.controls[field].touched)) && (this.form.controls[field].errors != null && this.form.controls[field].invalid && this.form.controls[field].errors.required);
  }

  voltar() {
    this.sessionService.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
