import { Outlet } from "react-router-dom";
const Admin = () => {
  return (
    <div>
      <div>Top bar</div>
      <div>Sidebar</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
