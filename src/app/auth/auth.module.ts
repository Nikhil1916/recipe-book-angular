import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { sharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';
const routes = [{ path: 'auth', component: AuthComponent }];
@NgModule({
  imports: [FormsModule, sharedModule, RouterModule.forChild(routes)],
  declarations: [AuthComponent],
})
export class AuthModule {}
