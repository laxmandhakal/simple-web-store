import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/user/home',
        pathMatch: 'full'
    },
    
    {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
    },
    {
        path:'product',
        loadChildren:'./product/product.module#ProductModule'
    }


]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

