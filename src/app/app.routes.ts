import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { CochesComponent } from './componentes/coches/coches.component';
import { MarcasComponent } from './componentes/marcas/marcas.component';
import { TiposComponent } from './componentes/tipos/tipos.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Bienvenido'
    },
    {
        path: 'coches',
        component: CochesComponent,
        title: 'Coches'
    },
    {
        path: 'marcas',
        component: MarcasComponent,
        title: 'Marcas'
    },
    {
        path: 'tipos',
        component: TiposComponent,
        title: 'Tipos'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
