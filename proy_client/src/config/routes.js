/* components > Layouts > Pages > routes */
<<<<<<< HEAD
import { LayoutGeneral } from "../layouts/LayoutGeneral/LayoutGeneral";
import { LayoutMenu } from "../layouts/LayoutMenu/LayoutMenu";
import { Admin } from "../pages/admin/Admin";
import  {Login}  from "../pages/Login/Login";
import {AdminRegister} from "../pages/AdminRegister/AdminRegister";
import {ChangePassword} from "../pages/ChangePassword/ChangePassword";
import {Fevolution} from "../pages/Fevolution/Fevolution";
=======
import { LayoutGenreal } from "../layouts/GeneralLayout/LayoutGenreal";
import { Admin } from "../pages/admin/Admin";
import  SignIn  from "../pages/SignIn/SignIn";
import AdminRegister from "../pages/AdminRegister/AdminRegister";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
>>>>>>> f337300 (register admin & change password)
import { Contact } from "../pages/Contact";
import { NotFound } from "../pages/NotFound/NotFound";
<<<<<<< HEAD
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
=======

const AdminRoutes = [
    {path: '/admin', component: Admin, layout: LayoutGenreal},
    {path: '/admin/sign-in', component: SignIn,layout: LayoutGenreal},
    {path: '/admin/admin-register', component: AdminRegister,layout: LayoutGenreal}
];
const GeneralRoutes = [
    {path: '/',component: Home,layout: LayoutGenreal},
    {path: '/contact',component: Contact,layout: LayoutGenreal},
    {path: '*',component: NotFound,layout: LayoutGenreal},
    {path: 'change-password',component: ChangePassword,layout: LayoutGenreal}
>>>>>>> f337300 (register admin & change password)
];

const allRoutesProject = [...AdminRoutes,...GeneralRoutes];
export default allRoutesProject;
