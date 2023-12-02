import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeModule } from './welcome/welcome.module';
import { LayoutModule } from './layout/layout.module';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { fetchCurrentUserResolver } from '../resolver/user.resolver';
import { authGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: "welcome",
    component: WelcomeComponent,
    canActivate: [authGuard],
    resolve: {
      resolvedData: fetchCurrentUserResolver
    },
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WelcomeModule,
    LayoutModule
  ]
})
export class ViewModule { }
