/* components > Layouts > Pages > routes */
import { LayoutGenreal } from "../layouts/GeneralLayout/LayoutGenreal";
import { Admin } from "../pages/admin/Admin";
import  SignIn  from "../pages/SignIn/SignIn";
import AdminRegister from "../pages/AdminRegister/AdminRegister";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import Fevolution from "../pages/Fevolution/Fevolution";
import { Contact } from "../pages/Contact";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound/NotFound";

const AdminRoutes = [
    {path: '/admin', component: Admin, layout: LayoutGenreal},
    {path: '/admin/sign-in', component: SignIn,layout: LayoutGenreal},
    {path: '/admin/admin-register', component: AdminRegister,layout: LayoutGenreal}
];
const GeneralRoutes = [
    {path: '/',component: Home,layout: LayoutGenreal},
    {path: '/contact',component: Contact,layout: LayoutGenreal},
    {path: '*',component: NotFound,layout: LayoutGenreal},
    {path: 'change-password',component: ChangePassword,layout: LayoutGenreal},
    {path: 'fevolution',component: Fevolution,layout: LayoutGenreal}
];

const allRoutesProject = [...AdminRoutes,...GeneralRoutes];
export default allRoutesProject;
