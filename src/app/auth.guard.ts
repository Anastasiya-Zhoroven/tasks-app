import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
}
)
export class AuthGuard implements CanActivate {
  constructor (private readonly router: Router) { }

  canActivate (): boolean {
    const storedToggleValue = localStorage.getItem('toggleValue')

    return storedToggleValue === 'true'
  }
}
