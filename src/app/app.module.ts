import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProgressBarComponent } from './demo/components/share/progress-bar/progress-bar.component';
import { AuthInterceptor } from './demo/http/auth.interceptor';
import { ProgressBarInterceptor } from './demo/http/progress-bar.interceptor';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { ProductService } from './demo/service/product.service';
import { GraphQLModule } from './graphql.module';
import { AppLayoutModule } from './layout/app.layout.module';

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [
    ProgressBarComponent,
    AppRoutingModule,
    AppLayoutModule,
    GraphQLModule,
    HttpClientModule,
    ToastModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    CountryService,
    CustomerService,
    EventService,
    IconService,
    NodeService,
    PhotoService,
    ProductService,
    MessageService,

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProgressBarInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
