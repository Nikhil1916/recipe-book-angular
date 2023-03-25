import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(
    private authS: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  isLoggedIn = true;
  isLoading: boolean = false;
  error: string = null;
  private sub: Subscription;
  @ViewChild(PlaceholderDirective) alert: PlaceholderDirective;
  ngOnInit(): void {
    this.authS.user.subscribe((res) => {});
  }
  onSwitchMode() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    const email = form.value.email;
    const password = form.value.password;
    if (!this.isLoggedIn) {
      authObs = this.authS.signup(email, password);
    } else {
      authObs = this.authS.logIn(email, password);
    }
    authObs.subscribe({
      next: (res) => {
        this.router.navigate(['/recipes']);
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      },
      error: (error) => {
        console.log(error);
        this.error = error;
        this.showErrorAlert(error);
        this.isLoading = false;
      },
    });
    form.reset();
  }

  private showErrorAlert(error) {
    const alertCompFac =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContRef = this.alert.viewContainerRef;
    hostViewContRef.clear();
    const componentRef = hostViewContRef.createComponent(alertCompFac);
    componentRef.instance.message = error;
    this.sub = componentRef.instance.close.subscribe((res) => {
      this.sub.unsubscribe();
      hostViewContRef.clear();
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
