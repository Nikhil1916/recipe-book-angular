import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OnInit, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'recipe-book';
  createform: FormGroup;
  file: any;
  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}
  ngOnInit(): void {}
}
