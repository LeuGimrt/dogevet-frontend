import { Navigate, Route, Routes as ReactRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ProtectedRoutes from "./ProtectedRoute";
import NewPetPage from "../../pages/NewPetPage";
import MyPetsPage from "../../pages/MyPetsPage";
import HomePage from "../../pages/HomePage";
import LandingPage from "../../pages/LandingPage";
import SearchPetsPage from "../../pages/SearchPetsPage";
import NewConsultPage from "../../pages/NewConsultPage";
import PetDetailsPage from "../../pages/PetDetailsPage";
import ProfilePage from "../../pages/ProfilePage";

const Routes = () => {
  return (
    <ReactRouter>
      <Route element={<PublicRoutes />}>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path='/home' element={<HomePage />} />
        <Route path='/pets'>
          <Route path='new' element={<NewPetPage />} />
          <Route path='search' element={<SearchPetsPage />} />
          <Route path='my-pets' element={<MyPetsPage />} />
          <Route path=':petId' element={<PetDetailsPage />} />
        </Route>
        <Route path='/consultations'>
          <Route path='new' element={<NewConsultPage />} />
        </Route>
        <Route path='/profile' element={<ProfilePage />} />
      </Route>

      {/* Fallback */}
      <Route path='*' element={<Navigate to='/login' />} />
    </ReactRouter>
  );
};

export default Routes;
