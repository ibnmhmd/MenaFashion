import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HeaderComponent } from './partials/header/header.component';
import { MainBannerComponent } from './partials/main-banner/main-banner.component';
import { FooterComponent } from './partials/footer/footer.component';
import { TrendingSliderComponent } from './partials/trending-slider/trending-slider.component';
import { RecentlyViewedSliderComponent } from './partials/recently-viewed-slider/recently-viewed-slider.component';
import { CategorySelectionComponent } from './category-selection/category-selection.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ContactComponent } from './contact/contact.component';
import { StaticPageComponent } from './static-page/static-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardNavComponent } from './partials/dashboard-nav/dashboard-nav.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { ClientAddressComponent } from './client-address/client-address.component';
import { ClientCardComponent } from './client-card/client-card.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ClientPasswordComponent } from './client-password/client-password.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { BreadcrumbsComponent } from './partials/breadcrumbs/breadcrumbs.component';

import { ShareModule } from 'ng2share/share.module';
import { SingleProductDetailsService } from '../app/services/single-product-details.service';
import { CustomerDataService } from "app/services/customer-data.service";
import { AddressDetailComponent } from "app/client-address/address-detail/address-detail.component";
import { CustomerDetailsService } from "app/services/customer-details.service";

import { ValuesPipe } from './values.pipe';
import { MiniCartComponent } from './partials/mini-cart/mini-cart.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { SafePipe } from './safe.pipe';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {enableProdMode} from '@angular/core';
import { NguiAutoCompleteModule } from '@ngui/auto-complete'

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CategoryLandingPageComponent } from './category-landing-page/category-landing-page.component';
import {GoogleAnalyticsEventsService} from "app/services/google-analytics-events.service";
import {OrderListModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {newrelic} from 'newrelic-angular/dist/newrelic-angular.min';
import { APP_BASE_HREF } from '@angular/common';
import {PasswordResetComponent } from './password-reset/password-reset.component';
import { Title }     from '@angular/platform-browser';
import { GlobalTitleInjectorComponent } from './global-title-injector/global-title-injector.component';
const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};



const appRoutes: Routes = [
   { path: '', component: HomeComponent,  pathMatch: 'full'},
   { path: 'selection/men', component: CategorySelectionComponent },
   { path: 'shop/:category', component: CategoryLandingPageComponent },
   { path: 'shop/:category/:subcategory', component: CategoryListComponent },
   { path: 'shop/:category/:subcategory/:subcategory2', component: CategoryListComponent },
   { path: 'shop/:category/:subcategory/:subcategory2', component: CategoryListComponent,data: {
    name: 'My Route Name'
} },
   { path: 'sale/:category', component: CategoryListComponent },
   { path: 'sale/:category/:subcategory', component: CategoryListComponent },
   { path: 'sale/:category/:subcategory/:subcategory2', component: CategoryListComponent },
   { path: 'sale/:category/:subcategory/:subcategory2', component: CategoryListComponent },
   { path: 'detail/:product/:sku', component: ProductDetailComponent },
   { path: 'detail/:product/:cartEdit/:sku', component: ProductDetailComponent },
   { path: 'detail/:category/:subcategory/:product/:sku', component: ProductDetailComponent },
   { path: 'detail/:category/:subcategory/:subcategory2/:product/:sku', component: ProductDetailComponent },
   { path: 'cart/checkout', component: CheckoutComponent },
   { path: 'cart/thankyou', component: ThankYouComponent },
   { path: 'contact', component: ContactComponent },
   { path: 'dashboard', component: DashboardComponent },
   { path: 'orders', component: ClientOrdersComponent },
   { path: 'address', component: ClientAddressComponent },
   { path: 'card', component: ClientCardComponent },
   { path: 'wishlist', component: WishlistComponent },
   { path: 'password', component: ClientPasswordComponent },
   { path: 'profile', component: ClientProfileComponent },
   { path: 'search/:product', component: ProductSearchComponent },
   { path: 'terms-of-use', component: StaticPageComponent },
   { path: 'about-us', component: StaticPageComponent },
   { path:  'careers', component: StaticPageComponent },
   { path: 'carrer', component: StaticPageComponent },
   { path: 'faq', component: StaticPageComponent },
   { path: 'privacy-policy', component: StaticPageComponent },
   { path: 'contact-us', component: StaticPageComponent },
   { path: 'delivery-time', component: StaticPageComponent },
   { path: 'shipment-location', component: StaticPageComponent },
   { path: 'search/:product/:fullMatch', component: ProductSearchComponent },
   { path: 'resetPassword/:userId/:userToken', component: PasswordResetComponent },
  
  
];

enableProdMode();
@NgModule({
  declarations: [
    ValuesPipe,
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MainBannerComponent,
    FooterComponent,
    TrendingSliderComponent,
    RecentlyViewedSliderComponent,
    CategorySelectionComponent,
    CategoryListComponent,
    ProductDetailComponent,
    CheckoutComponent,
    ThankYouComponent,
    ContactComponent,
    StaticPageComponent,
    DashboardComponent,
    DashboardNavComponent,
    ClientOrdersComponent,
    ClientAddressComponent,
    ClientCardComponent,
    WishlistComponent,
    ClientPasswordComponent,
    ClientProfileComponent,
    ProductSearchComponent,
    BreadcrumbsComponent,
    MiniCartComponent,
    AddressDetailComponent,
    NewsletterComponent,
    SafePipe,
    CategoryLandingPageComponent,
    PasswordResetComponent,
    GlobalTitleInjectorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    HttpModule,
    ShareModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    NgbModule.forRoot(),
    NguiAutoCompleteModule  ,
    SliderModule,
    PaginatorModule
   
  ],
  providers: [
    CustomerDataService,
    CustomerDetailsService,
    DashboardComponent,
    ClientAddressComponent,
    SingleProductDetailsService,
    GoogleAnalyticsEventsService,
    Title,
	{provide: APP_BASE_HREF, useValue: '!'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
