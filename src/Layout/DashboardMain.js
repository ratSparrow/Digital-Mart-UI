import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import logo from "../images/favicon.jpg";
import auth from "../firebase.init";
import useAdmin from "../hooks/useAdmin";
import useVendor from "../hooks/useVendor";

const DashboardMain = () => {
  const [user] = useAuthState(auth);
  const [isUserAdmin] = useAdmin(user?.email);
  const [isVendor] = useVendor(user?.email);
  return (
    <section className="mx-auto">
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content ">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-70  text-base-content bg-orange-500">
            <Link to="/">
              <img src={logo} className="h-2/3 mx-auto" alt="" />
              <hr className="mt-1" />
            </Link>

            <h1 className="text-2xl mb-3 text-center text-white font-semibold">
              ADMIN DASHBOARD
            </h1>

            <li>
              <Link to="/dashboard">Review</Link>
            </li>
            {isUserAdmin ? (
              <React.Fragment>
                <li>
                  <Link to="/dashboard/user">All User</Link>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            {isVendor && (
              <li>
                <Link to="/dashboard/addproduct">Add Product</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DashboardMain;
