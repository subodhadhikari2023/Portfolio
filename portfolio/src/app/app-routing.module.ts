import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { ResumeComponent } from './components/resume/resume.component';

const routes: Routes = [
{path:'home',component:HomeComponent},
{path:'portfolio',component:PortfolioComponent},
{path:'contact',component:ContactComponent},
{path:'resume',component:ResumeComponent},
{path:'**',component:HomeComponent,pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
