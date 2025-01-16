import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ArticleVenduComponent } from './article-vendu/article-vendu.component';
import { HomeclientComponent } from './homeclient/homeclient.component';
import { ReclamationformComponent } from './reclamationform/reclamationform.component';
import { PieceRechangeDetailsComponent } from './piece-rechange-details/piece-rechange-details.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { ClientComponent } from './client/client.component';
import { ArticleformComponent } from './articleform/articleform.component';
import { InterventionFormComponent } from './intervention-form/intervention-form.component';
import { InterventionComponent } from './intervention/intervention.component';

const routes: Routes = [
  {
    path: 'dashboardadmin',
    component: HomeadminComponent,
    children: [
      { path: 'articles', component: ArticleVenduComponent },
      { path: 'pieces', component: PieceRechangeDetailsComponent },
      { path: 'reclamations', component: ReclamationComponent },
      { path: 'interventions', component: InterventionComponent },
      { path: 'clients', component: ClientComponent },
      { path: 'addarticle', component: ArticleformComponent },
    ],
  },
  {
    path: 'dashboardclient/:id',
    component: HomeclientComponent
  },
  {
    path: 'reclamation/:userId/:articleId',
    component: ReclamationformComponent
  },
  // {
  //   path: 'dashboardadmin',
  //   component: FormPieceRechangeDetailsComponent
  // },
  {
    path: 'dashboardadmin/articles',
    component: ArticleVenduComponent
  },
  {
    path: 'dashboardadmin/pieces',
    component: PieceRechangeDetailsComponent
  },
  {
    path: 'dashboardadmin/reclamations',
    component: HomeadminComponent

  },
  {
    path: 'dashboardadmin/reclamations',
    component: InterventionComponent

  },
  { path: 'intervention-form/:reclamationId',
     component: InterventionFormComponent },
     {
      path: 'dashboardadmin/interventions',
      component: InterventionComponent
  
    },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegistrationComponent
  },
  {
    path: 'articles', 
    component: ArticleVenduComponent
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
