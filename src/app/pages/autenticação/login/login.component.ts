import { Component, OnInit } from '@angular/core';
import { DadosEscolaresService } from 'src/app/shared/services/dados-escolares.service';
import { AutenticacaoService } from 'src/app/shared/services/autenticacao.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserContextService } from 'src/app/core/service/user-context.service';
import { RouteStateService } from 'src/app/core/service/route-state.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  secretarias = [];
  form: FormGroup;
  isSubmit: boolean = false;

  constructor(
    private dadosEscolaresService: DadosEscolaresService,
    private autenticacaoService: AutenticacaoService,
    private usuarioService: UsuarioService,
    private userContextService: UserContextService,
    private routeStateService: RouteStateService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(3)]],
      secretaria: [null, [Validators.required]]
    });
    this.userContextService.logout();

    this.carregarSecretariasEducacao();
  }

  carregarSecretariasEducacao() {
    this.dadosEscolaresService.getSecretarias().subscribe(secs => {
      secs.forEach(sec => this.secretarias.push({ name: sec['descricao'], value: sec['id'] }))

      if (this.secretarias.length === 1) {
        this.form.controls['secretaria'].setValue(this.secretarias[0].value);
      }
    });
  }

  verificaUsuario() {
    if (!this.form.valid) {
      this.isSubmit = true;
      return;
    }

    this.autenticacaoService.login(this.form.controls['username'].value, this.form.controls['password'].value).subscribe(user => {
      this.usuarioService.getUsuario(this.form.controls['username'].value, this.form.controls['secretaria'].value).subscribe(usuario => {
        console.log('User',usuario)
        usuario.codSecretariaEnsino = this.form.controls['secretaria'].value;
        this.userContextService.setUser(usuario);
        this.routeStateService.add("Dados Escolares", 'login/login-dados-escolares', null, false);
      });
    });

  }

  required(field: string) {
    return this.form != null && (this.isSubmit || (this.form.controls[field].dirty || this.form.controls[field].touched)) && (this.form.controls[field].errors != null && this.form.controls[field].invalid && this.form.controls[field].errors.required);
  }

}
