import { AdminName } from "../../api/Admin";
import { DashboardTop } from "../../components/TopComponents/DashboardTop/DashboardTop";

export const Admin = () => {
  const adminName = AdminName();


  return (
    <div>
      <DashboardTop userName={adminName} addtitle="Gestión"/>
      <h1>Nombre del administrador: {adminName}</h1>
    </div>
  );
};

