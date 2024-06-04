import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentComponent } from './components/rent/rent.component';
import { SeguraNuevoComponent } from './components/rent/segura-nuevo/segura-nuevo.component';
import { SeguraListarComponent } from './components/rent/segura-listar/segura-listar.component';

const routes: Routes = [
  {
    path: 'segura',
    component: RentComponent,
    children: [
      {
        path: 'nuevo',
        component: SeguraNuevoComponent,
      },
      {
        path: 'listar',
        component: SeguraListarComponent,
      },
      {
        path: '**',
        redirectTo: 'listar',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'segura',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
