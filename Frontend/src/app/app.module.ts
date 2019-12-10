import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SpecialDateComponent } from './special-date/special-date.component';
import { DiscountInterceptor } from './services/discount-interceptor';
import { ProductModalComponent } from './product/product-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    UserComponent,
    SpecialDateComponent,
    ProductModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents: [
    ProductModalComponent
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: DiscountInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
