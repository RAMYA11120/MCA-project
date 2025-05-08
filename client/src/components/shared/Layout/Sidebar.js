import React from "react";
// import { userMenu } from "./Menus/userMenu";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../styles/Layout.css";

const Sidebar = () => {
  //GET USER STATE
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {user?.role === "organisation" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/" && "active"}`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/">Inventory</Link>

              </div>
              <div
                className={`menu-item ${location.pathname === "/donar" && "active"
                  }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/donar">Donar</Link>
              </div>
              <div
                className={`menu-item ${location.pathname === "/hospital" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/hospital">Hospital</Link>
              </div>

              <div
                className={`menu-item ${location.pathname === "/histoy" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/histoy">histoy</Link>
              </div>

              <div
                className={`menu-item ${location.pathname === "/request" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/request">Request</Link>
              </div>
              <div
                className={`menu-item ${location.pathname === "/allCampigns" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/allCampigns">View allCampigns</Link>
              </div>
              <div
                className={`menu-item ${location.pathname === "/createCampigns" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/createCampigns">Create Campigns</Link>
              </div>

              <div
                className={`menu-item ${location.pathname === "/my-campaigns" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/my-campaigns">my-campaigns</Link>
              </div>



            </>
          )}
          {user?.role === "admin" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/donar-list" && "active"
                  }`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/donar-list">Donar List</Link>
              </div>
              <div
                className={`menu-item ${location.pathname === "/hospital-list" && "active"
                  }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/hospital-list">Hospital List</Link>
              </div>
              <div
                className={`menu-item ${location.pathname === "/org-list" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/org-list">Organisation List</Link>
              </div>

              <div
                className={`menu-item ${location.pathname === "/histoy" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/histoy">history</Link>
              </div>
              <div
                className={`menu-item ${location.pathname === "/allCampigns" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/allCampigns">View allCampaigns</Link>
              </div>

              <div
                className={`menu-item ${location.pathname === "/campaignlist" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/campaignlist">View allCampaigns List</Link>
              </div>
            </>
          )}

          {(user?.role === "donar" || user?.role === "hospital") && (
            <>
              <div
                className={`menu-item ${location.pathname === "/orgnaisation" && "active"
                  }`}
              >
                <i className="fa-sharp fa-solid fa-building-ngo"></i>
                <Link to="/orgnaisation">Orgnaisation</Link>
              </div>

            </>



          )}
          {user?.role === "hospital" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/consumer" && "active"
                  }`}
              >
                <i className="fa-sharp fa-solid fa-building-ngo"></i>
                <Link to="/consumer">Consumer</Link>
              </div>
              <div
                className={`menu-item ${location.pathname === "/histoy" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/histoy">history</Link>
              </div>

              <div
                className={`menu-item ${location.pathname === "/request" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/request">Request</Link>
              </div>
              <div
                className={`menu-item ${location.pathname === "/allCampigns" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/allCampigns">View allCampaigns</Link>
              </div>
              <div
                className={`menu-item ${location.pathname === "/allCampigns" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/createCampigns">Create Campaigns</Link>
              </div>

              <div
                className={`menu-item ${location.pathname === "/my-campaigns" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/my-campaigns">my-campaigns</Link>
              </div>

            </>
          )}

          {user?.role === "donar" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/donation" && "active"
                  }`}
              >
                <i className="fa-sharp fa-solid fa-building-ngo"></i>
                <Link to="/donation">Donation</Link>
              </div>
              <div
                className={`menu-item ${location.pathname === "/histoy" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/histoy">histoy</Link>
              </div>

              <div
                className={`menu-item ${location.pathname === "/Requestlist" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/Requestlist">Request list</Link>
              </div>
              <div
                className={`menu-item ${location.pathname === "/allCampigns" && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/allCampigns">View allCampigns</Link>
              </div>


            </>
          )}



          {/* {userMenu.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                className={`menu-item ${isActive && "active"}`}
                key={menu.name}
              >
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
