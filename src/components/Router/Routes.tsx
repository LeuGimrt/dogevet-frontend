import { Navigate, Route, Routes as ReactRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ProtectedRoutes from "./ProtectedRoute";
import RegisterDogPage from "../../pages/RegisterDogPage";
import ViewDogsPage from "../../pages/ViewDogsPage";
import HomePage from "../../pages/HomePage";
import LandingPage from "../../pages/LandingPage";
import SearchDogsPage from "../../pages/SearchDogsPage";
import NewConsultPage from "../../pages/NewConsultPage";
import DogDetailsPage from "../../pages/DogDetailsPage";
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
        <Route path='/register-dog' element={<RegisterDogPage />} />
        <Route path='/search-dogs' element={<SearchDogsPage />} />
        <Route path='/new-consultation' element={<NewConsultPage />} />
        <Route path='/view-dogs' element={<ViewDogsPage />} />
        <Route path='/dog-details/:dogId' element={<DogDetailsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>

      {/* Fallback */}
      <Route path='*' element={<Navigate to='/login' />} />
    </ReactRouter>
  );
};

export default Routes;
