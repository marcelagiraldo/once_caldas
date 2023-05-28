import { GetAdmin } from "../../api/Admin";
import { DashboardTop } from "../../components/TopComponents/DashboardTop/DashboardTop";

export const Admin = () => {
  const adminData = GetAdmin(); // Llamada a la función GetAdmin

  // Si la función GetAdmin devuelve solo el nombre del administrador, usa adminData directamente:
  // const adminName = GetAdmin();

  // Para acceder al nombre del administrador, asegúrate de que adminData tenga los datos primero
  const adminName = adminData.length > 0 ? adminData[0].name : "";

  return (
    <div>
      <DashboardTop userName={adminName} addtitle="Gestión"/>
      <h1>Nombre del administrador: {adminName}</h1>
    </div>
  );
};

