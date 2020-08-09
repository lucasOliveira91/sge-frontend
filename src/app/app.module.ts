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
import { NavSearchComponent } from './shared/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './shared/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './shared/layout/admin/configuration/configuration.component';
import { ToggleFullScreenDirective } from './shared/full-screen/toggle-full-screen';
import { SharedModule } from './shared/shared.module';
import { NavigationItem } from './shared/layout/admin/navigation/navigation';

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
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective
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
    HttpClientModule
  ],
  providers: [
    NavigationItem,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
