import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';
import { Auth } from '../../interfaces/auth';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(public authService: AuthService) {}

  /**
   *
   * Function to login a user
   * @param string email
   * Example: angelitojpcmantilla22@gmail.com
   * @param string password
   */

  auth() {
    if (this.email.value && this.password.value) {
      console.log(this.authService.isLogged());
      
      this.authService.login(this.email.value, this.password.value).subscribe(
        (authOrFalse: Auth) => {
          // authOrFalse es de tipo Auth
          Swal.fire({
            icon: 'success',
            title: '¡Atención!',
            text: `Bienvenido al sistema ${authOrFalse.user.full_name}`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        },
        (error) => {
          if (error.status === 401) {
            Swal.fire({
              icon: 'error',
              title: '¡Atención!',
              text: 'Usuario o contraseña incorrectos',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          }
        }
      );
    } else {
      console.log('Email or password is missing');
    }
  }
}
