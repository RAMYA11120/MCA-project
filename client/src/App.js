import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Donar from "./pages/Dashboard/Donar";
import Hospitals from "./pages/Dashboard/Hospitals";
import OrganisationPage from "./pages/Dashboard/OrganisationPage";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Donation";
import Analytics from "./pages/Dashboard/Analytics";
import DonarList from "./pages/Admin/DonarList";
import HospitalList from "./pages/Admin/HospitalList";
import OrgList from "./pages/Admin/OrgList";
import AdminHome from "./pages/Admin/AdminHome";
import DonationHistory from "./pages/Admin/History";

import RequestForm from "./pages/Request/Request";
import RequestAdminDashboard from "./pages/Request/Requestlist";
import CampaignCard from "./pages/campign/CampignView";
import CampaignForm from "./pages/campign/CreateNewcampign";
import MyCampaigns from "./pages/campign/mycampign";
import CampaignList from "./pages/campign/Campignlist";
function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donar-list"
          element={
            <ProtectedRoute>
              <DonarList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital-list"
          element={
            <ProtectedRoute>
              <HospitalList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/org-list"
          element={
            <ProtectedRoute>
              <OrgList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hospital"
          element={
            <ProtectedRoute>
              <Hospitals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consumer"
          element={
            <ProtectedRoute>
              <Consumer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donation"
          element={
            <ProtectedRoute>
              <Donation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orgnaisation"
          element={
            <ProtectedRoute>
              <OrganisationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donar"
          element={
            <ProtectedRoute>
              <Donar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/histoy"
          element={

            // <Register />
            <DonationHistory />

          }
        />

        <Route
          path="/recipient"
          element={
            <ProtectedRoute>

            </ProtectedRoute>
          }
        />


        <Route
          path="/request"
          element={
            <ProtectedRoute>
              <RequestForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Requestlist"
          element={
            <ProtectedRoute>
              <RequestAdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/allCampigns"
          element={
            <ProtectedRoute>
              <CampaignCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createCampigns"
          element={
            <ProtectedRoute>
              <CampaignForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-campaigns"
          element={
            <ProtectedRoute>
              <MyCampaigns />
            </ProtectedRoute>
          }
        />

<Route
          path="/campaignList"
          element={
            <ProtectedRoute>
              <CampaignList />
            </ProtectedRoute> 
          }
        />



      </Routes>




    </>
  );
}

export default App;
