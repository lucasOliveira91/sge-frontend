import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-dados-escolares',
  templateUrl: './login-dados-escolares.component.html',
  styleUrls: ['./login-dados-escolares.component.scss']
})
export class LoginDadosEscolaresComponent implements OnInit {
  form: FormGroup;

  constructor(
    public router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.form = this.fb.group({
    
    });
  }

}
