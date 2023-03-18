import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'recipe-book';
  constructor(private authS: AuthService) {}
  ngOnInit(): void {
    this.authS.autoLogin();
  }
}
