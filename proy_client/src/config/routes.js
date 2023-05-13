/* components > Layouts > Pages > routes */
import { LayoutGenreal } from "../layouts/GeneralLayout/LayoutGerenal";
import { Admin } from "../pages/admin/Admin";
import  SignIn  from "../pages/SIgIn/SignIn";
import { Contact } from "../pages/Contact";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound/NotFound";
const AdminRoutes = [
    {path: '/admin', component: Admin, layout: LayoutGenreal},
    {path: '/admin/sign-in', component: SignIn,layout: LayoutGenreal}
];
const GeneralRoutes = [
    {path: '/',component: Home,layout: LayoutGenreal},
    {path: '/contact',component: Contact,layout: LayoutGenreal},
    {path: '*',component: NotFound,layout: LayoutGenreal}
];

const allRoutesProject = [...AdminRoutes,...GeneralRoutes];
export default allRoutesProject;
