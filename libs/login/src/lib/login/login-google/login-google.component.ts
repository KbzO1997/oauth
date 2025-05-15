import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment, Util } from '@oauth/shared-config';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';

@Component({
  selector: 'app-login-google',
  standalone: true,
  imports: [CommonModule],

  template: `
    <style>
      #login-google {
        display: flex;
        background-color: #4285f4;
        justify-content: center !important;
        color: white;
        font-size: 14px !important;
        border: none;
        padding: 8px 20px !important;
        border-radius: 5px;
        cursor: pointer;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s ease;
        margin-top: 1rem;
      }

      #login-google:hover {
        background-color: #357ae8;
      }

      #login-google img {
        width: 20px;
        margin-right: 10px;
      }
    </style>
    <button type="button"
      id="login-google"
      class="w-full p-3 text-xl text-center"
      (click)="loginWithGoogle()"
    >
      <i class="pi pi-google px-2"></i> Iniciar sesión con Google
    </button>
  `,
})
export class LoginGoogleComponent {
  util: Util = new Util();
  private app = initializeApp(environment.firebase);
  private auth = getAuth(this.app);
  private router = inject(Router);

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        if (result.user != null) {
          const user = result.user;
          this.util.sessionStorage(
            user.displayName ?? '',
            user.photoURL ?? '',
            user.email ?? ''
          );
        }
      })
      .catch((err) => {
        this.util.NotificationError(err);
      });
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.util.deleteStorage();
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
