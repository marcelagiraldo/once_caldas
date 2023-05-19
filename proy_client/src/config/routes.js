/* components > Layouts > Pages > routes */
import { LayoutGeneral } from "../layouts/LayoutGeneral/LayoutGeneral";
import { Admin } from "../pages/admin/Admin";
import  {SignIn}  from "../pages/SignIn/SignIn";
import {AdminRegister} from "../pages/AdminRegister/AdminRegister";
import {ChangePassword} from "../pages/ChangePassword/ChangePassword";
import { Contact } from "../pages/Contact";
import { NotFound } from "../pages/NotFound/NotFound";

const AdminRoutes = [
    {path: '/admin', component: Admin, layout: LayoutGeneral},
    {path: '/admin/sign-in', component: SignIn,layout: LayoutGeneral},
    {path: '/admin/admin-register', component: AdminRegister,layout: LayoutGeneral}
];
const GeneralRoutes = [
    {path: '/',component: SignIn,layout: LayoutGeneral},
    {path: '/contact',component: Contact,layout: LayoutGeneral},
    {path: '*',component: NotFound,layout: LayoutGeneral},
    {path: 'change-password',component: ChangePassword,layout: LayoutGeneral}
];

const allRoutesProject = [...AdminRoutes,...GeneralRoutes];
export default allRoutesProject;
