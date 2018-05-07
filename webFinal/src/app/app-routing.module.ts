import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { LoginComponent }   from './login/login.component';
import { HeroService } from './hero.service';

// import { AddHeroComponent } from './add-hero/add-hero.component';


const routes: Routes = [
  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'heroes', component: HeroesComponent }
  // { path: 'hero-service', component: HeroService }
  // { path: 'addHero', component: AddHeroComponent }

];

@NgModule({
  // The method is called forRoot() because you configure the router 
  // at the application's root level. The forRoot() method supplies 
  // the service providers and directives needed for routing, 
  // and performs the initial navigation based on the current browser URL.
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  
})


export class AppRoutingModule {}