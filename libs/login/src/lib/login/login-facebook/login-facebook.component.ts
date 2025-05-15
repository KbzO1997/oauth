import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment, Util } from '@oauth/shared-config';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  signOut
} from 'firebase/auth';

@Component({
  selector: 'app-login-facebook',
  standalone: true,
  imports: [CommonModule],

  template: `
    <style>
      #login-facebook {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        background-color: #1877f2;
        color: white;
        font-size: 14px !important;
        border: none;
        padding: 8px 20px !important;
        border-radius: 5px;
        cursor: pointer;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s ease;
      }

      #login-facebook:hover {
        background-color: #155dbb;
      }

      #login-facebook img {
        width: 20px;
        margin-right: 10px;
      }
    </style>
    <button type="button"
      id="login-facebook"
      class="w-full p-3 text-xl text-center"
      (click)="loginWithFacebook()"
    >
      <i class="pi pi-facebook px-2"></i> Iniciar sesión con Facebook
    </button>
  `,
})
export class LoginFacebookComponent {
  util: Util = new Util();
  private app = initializeApp(environment.firebase);
  private auth = getAuth(this.app);
  private router = inject(Router);
 
  loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        if (result.user != null) {
          const user = result.user;
          this.util.sessionStorage(
            user.displayName ?? '',
            user.photoURL ?? '',
            user.email ?? ''
          );
          this.router.navigateByUrl('/personal-info/actualizar-informacion');
        }
      })
      .catch((err) => {
        this.util.NotificationError(err);
      });
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.util.deleteStorage();
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log(error);
    });
  }
}
