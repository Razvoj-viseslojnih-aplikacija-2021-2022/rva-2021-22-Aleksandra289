import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';
import { HomeComponent } from './components/core/home/home.component';
import { RacunComponent } from './components/model/racun/racun.component';
import { ProizvodjacComponent } from './components/model/proizvodjac/proizvodjac.component';
import { ProizvodComponent } from './components/model/proizvod/proizvod.component';
import { StavkaRacunaComponent } from './components/model/stavka-racuna/stavka-racuna.component';


const routes: Routes = [
{path: 'racun', component: RacunComponent},
{path: 'proizvodjac', component: ProizvodjacComponent},
{path: 'proizvod', component: ProizvodComponent},
{path: 'author', component: AuthorComponent},
{path: 'about', component: AboutComponent},
{path: 'home', component: HomeComponent},
{path: '', redirectTo: '/home', pathMatch: 'full'},
{path: 'stavkaRacuna', component: StavkaRacunaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
