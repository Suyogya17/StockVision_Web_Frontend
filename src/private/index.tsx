import { Outlet } from "react-router-dom";
function Admin() {
  return (
    <>
      <div>Top</div>
      <div>
        <Outlet />
      </div>
      <div>bottom</div>
    </>
  );
}

export default Admin;
