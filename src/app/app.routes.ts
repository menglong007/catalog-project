import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";

export const routes: Routes = [{
  path: '',
  loadChildren: () => import('./contain/contain.module').then(m => m.ContainModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class appRoutes {}
