import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/config/error.interceptor';
import { AuthInterceptor } from './core/config/auth.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminComponent } from './shared/layout/admin/admin.component';
import { AuthComponent } from './shared/layout/auth/auth.component';
import { NavigationComponent } from './shared/layout/admin/navigation/navigation.component';
import { NavContentComponent } from './shared/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './shared/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './shared/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './shared/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './shared/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './shared/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './shared/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './shared/layout/admin/configuration/configuration.component';
import { ToggleFullScreenDirective } from './shared/full-screen/toggle-full-screen';
import { SharedModule } from './shared/shared.module';
import { NavigationItem } from './shared/layout/admin/navigation/navigation';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/config/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavRightComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective,
    HomeComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      countDuplicates: true,
      closeButton: true,
      preventDuplicates: true
    }),
    NgxSpinnerModule
  ],
  providers: [
    NavigationItem,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
