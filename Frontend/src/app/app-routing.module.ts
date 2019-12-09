import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { SpecialDateComponent } from './special-date/special-date.component';


const routes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: 'user', component: UserComponent },
  { path: 'special-date', component: SpecialDateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
