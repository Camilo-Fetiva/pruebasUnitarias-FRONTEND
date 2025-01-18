import { Routes } from '@angular/router';

// IMPORTAR LAS RUTAS
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { BuyComponent } from './pages/buy/buy.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { DashboardComponent } from './pages/dashboard/home/dashboard.component';
import { InventoryComponent } from './pages/dashboard/inventory/inventory.component';
import { OrdersComponent } from './pages/dashboard/orders/orders.component';
import { UsersComponent } from './pages/dashboard/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/dashboard/admin/admin.component';

// CREAR LAS RUTAS (REVISAR SI ESTAN CON EL MISMO PATH EN EL BACKEND)
export const routes: Routes = [
    {path: 'Acerca', component: AboutUsComponent, title:'AboutUs'},
    {path: 'Comprar', component: BuyComponent, title:'Buy'},
    {path: 'ResumenCompra', component: CheckoutComponent, title:'Checkout'},
    {path: '', component: HomeComponent, title:'Home'},
    {path: 'ListaProductos', component: ProductsListComponent, title:'ProductsList'},
    {path: 'Productos', component: ProductsComponent, title:'Products'},
    {path: 'Ingresar', component: SignUpComponent, title:'SignUp'},
    {path: 'Login', component: LoginComponent, title: 'Login'},

    //RUTAS HEREDADAS 
    {path: 'Dashboard', component: DashboardComponent, title:'Dashboard', children:[
        {path: 'Inventario', component: InventoryComponent, title:'Inventory'},
        {path: 'Ordenes', component: OrdersComponent, title:'Orders'},
        {path: 'Usuarios', component: UsersComponent, title:'Users'},
        {path: '', component: AdminComponent,},
    ]},

    //RUTA 404 NOT FOUND (USARLO AL FINAL DE LAS RUTAS)
    {path: '**', component: NotFoundComponent, title:'Error 404'},
];
