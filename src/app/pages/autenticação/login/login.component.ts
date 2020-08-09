import { Component, OnInit } from '@angular/core';
import { DadosEscolaresService } from 'src/app/shared/service/dados-escolares.service';
import { AutenticacaoService } from 'src/app/shared/service/autenticacao.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { UserContextService } from 'src/app/core/service/user-context.service';
import { RouteStateService } from 'src/app/core/service/route-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  secretarias = [];
  form: FormGroup;

  constructor(
    private dadosEscolaresService: DadosEscolaresService,
    private autenticacaoService: AutenticacaoService,
    private usuarioService: UsuarioService,
    private userContextService: UserContextService,
    private routeStateService: RouteStateService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(2)]],
      password: [null, [Validators.required]],
      secretaria: [null]
    });
    console.log(this.form.value)
    this.carregarSecretariasEducacao();
  }

  carregarSecretariasEducacao() {
    this.dadosEscolaresService.getSecretarias().subscribe(secs => {
      secs.forEach(sec => this.secretarias.push({ name: sec['descricao'], value: sec['id'] }))

      if(this.secretarias.length === 1) {
        this.form.controls['secretaria'].setValue(this.secretarias[0].value);
      }
    });
  }

  verificaUsuario() {
    console.log(this.form.value)
    if(this.form.valid) {
      this.autenticacaoService.login(this.form.controls['username'].value, this.form.controls['password'].value).subscribe(user => {
        this.usuarioService.getUsuario(this.form.controls['username'].value).subscribe(usuario => {
          this.userContextService.setUser(usuario);
          this.routeStateService.add("Dados Escolares", 'login/login-dados-escolares', null, true);
        });
      });
    }
  }

  comboSecretariaChange(event) {
    console.log(event)
  }

}
