import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api, IloginDetails } from '../../services/api';
import { Router } from '@angular/router';
import { Data } from '../../services/data';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[A-Z])(?=.*[0-9]).{8,}$")])
  });

  constructor(private apiservice: Api, private router: Router, private dataService: Data) {
  }

  ngOnInit() {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid)
      this.apiservice.loginPost(this.loginForm.value as IloginDetails).subscribe({
        next: (res) => {
          const tokenString = res[0]?.token;
          const personalDetails = res[0]?.personalDetails;
          if (tokenString) {
            localStorage.setItem('token', tokenString);
            localStorage.setItem('personDetails', JSON.stringify(personalDetails));
            this.dataService.setPersonDetails(res[0].personalDetails);
            this.router.navigateByUrl('info');
          }
        },
        error: (err) => {
          console.error("Login error:", err);
        }
      })
  }
}
