/* components > Layouts > Pages > routes */
import { LayoutGeneral } from "../layouts/LayoutGeneral/LayoutGeneral";
import { LayoutMenu } from "../layouts/LayoutMenu/LayoutMenu";
import { Admin } from "../pages/admin/Admin";
import  {Login}  from "../pages/Login/Login";
import {AdminRegister} from "../pages/AdminRegister/AdminRegister";
import {ChangePassword} from "../pages/ChangePassword/ChangePassword";
import {Fevolution} from "../pages/Fevolution/Fevolution";
import { Contact } from "../pages/Contact";
import { NotFound } from "../pages/NotFound/NotFound";
import { Dashboard } from "../layouts/Dashboard/Dashboard"


const AdminRoutes = [
    {path: '/admin', component: Admin, layout: Dashboard},
    {path: '/admin/admin-register', component: AdminRegister,layout: LayoutGeneral},
    {path: '/admin/admin-register', component: AdminRegister,layout: LayoutGeneral}
];
const GeneralRoutes = [
    {path: '/',component: Login,layout: LayoutGeneral},
    {path: '/contact',component: Contact,layout: LayoutGeneral},
    {path: '*',component: NotFound,layout: LayoutGeneral},
    {path: 'change-password',component: ChangePassword,layout: LayoutGeneral},
    {path: 'f-evolution',component: Fevolution,layout: LayoutMenu}
];

const allRoutesProject = [...AdminRoutes,...GeneralRoutes];
export default allRoutesProject;
