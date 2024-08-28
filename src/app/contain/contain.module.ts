import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ContainComponent} from "./contain.component";


const routes: Routes = [{
  path: 'contain',
  component: ContainComponent,
},
  {
    path: '',
    redirectTo: 'contain',
    pathMatch: 'full',
  }]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
})
export class ContainModule {
}
