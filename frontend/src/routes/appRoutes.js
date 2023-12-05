import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import { PublicRouteUser, PublicRouteAdmin, PublicRouteTrainer } from './publicRoute';
import { ProtectedRouteUser, ProtectedRouteAdmin, ProtectedRouteTrainer } from './protectedRoute';

import Login from '../pages/User/login';
import Register from '../pages/User/register';
import OtpPage from '../pages/User/otpPage';
import Home from '../pages/User/home';
import ForgotPassword from '../pages/User/forgotPassword';
import ResetPassword from '../pages/User/resetPassword';
import Profile from '../pages/User/profile'
import EditProfile from '../pages/User/EditProfile';
import Courses from '../pages/User/courses'
import CourseDetailedPage from '../pages/User/CourseDetailedPage';
import Purchases from '../pages/User/Purchases';
import Rating from '../pages/User/Rating';
import Notifications from "../pages/User/notifications"
import RoomUser from '../pages/User/RoomUser';
import VideoCallUsers from '../pages/User/VideoCallUsers';


import AdminHome from '../pages/Admin/AdminHome';
import Adminlogin from '../pages/Admin/Adminlogin';
import UsersList from '../pages/Admin/UsersList';
import TrainersList from '../pages/Admin/TrainersList';
import CategoryList from '../pages/Admin/CategoryList';
import AddCategory from '../pages/Admin/AddCategory'
import Chats from '../pages/Admin/Chats'
import ChatPersonal from '../pages/Admin/ChatPersonal';

import TrainerHome from '../pages/Trainer/TrainerHome'
import TrainerLogin from '../pages/Trainer/TrainerLogin'
import TrainerRegister from '../pages/Trainer/TrainerRegister'
import TrainerOtpPage from '../pages/Trainer/TrainerOtpPage';
import TrainerforgotPassword from '../pages/Trainer/TrainerforgotPassword';
import TrainerResetPassword from '../pages/Trainer/TrainerResetPassword';
import TrainerProfile from '../pages/Trainer/TrainerProfile';
import TrainerAddService from '../pages/Trainer/TrainerAddService';
import TrainerEditProfile from '../pages/Trainer/TrainerEditProfile';
import TrainerServices from '../pages/Trainer/TrainerServices';
import TrainerEditCourse from '../pages/Trainer/TrainerEditCourse';
import Reviews from '../pages/Trainer/Reviews';
import TrainerNotofication from '../pages/Trainer/TrainerNotofication';
import Classes from '../pages/Trainer/classes';
import Room from '../pages/Trainer/Room';
import VideoCall from '../pages/Trainer/VideoCall';

import { RouteObjects } from './RouteObjects';

function AppRoutes() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
        {loading && (
          <div className='spinner-parent'>
            <div className='spinner-border' role='status'></div>
          </div>
        )}
        <Toaster position='top-center' reverseOrder={false} />

        <Routes>

        {/* USER SIDE */}
          <Route path='/' element={<Home /> } />
          <Route path={RouteObjects.Login} element={<PublicRouteUser> <Login /> </PublicRouteUser>} />
          <Route path={RouteObjects.ForgetPassword} element={<PublicRouteUser> <ForgotPassword /> </PublicRouteUser>} />
          <Route path={RouteObjects.ResetPassword} element={<PublicRouteUser> <ResetPassword /> </PublicRouteUser>} />
          <Route path={RouteObjects.Register} element={<PublicRouteUser> <Register /> </PublicRouteUser>} />
          <Route path={RouteObjects.OTP} element={<PublicRouteUser> <OtpPage /> </PublicRouteUser>} />
          <Route path={RouteObjects.Profile} element={<ProtectedRouteUser> <Profile /> </ProtectedRouteUser>} />
          <Route path={RouteObjects.EditProfile} element={<ProtectedRouteUser> <EditProfile /> </ProtectedRouteUser>} />
          <Route path={RouteObjects.Courses} element={<ProtectedRouteUser> <Courses /> </ProtectedRouteUser>} />
          <Route path={RouteObjects.CourseDetailedPage} element={<ProtectedRouteUser> <CourseDetailedPage /> </ProtectedRouteUser>} />
          <Route path={RouteObjects.Purchase} element={<ProtectedRouteUser> <Purchases /> </ProtectedRouteUser>} />
          <Route path={RouteObjects.Rating} element={<ProtectedRouteUser> <Rating /> </ProtectedRouteUser>} />
          <Route path={RouteObjects.Notifications} element={<ProtectedRouteUser> <Notifications /> </ProtectedRouteUser>} />
          <Route path={RouteObjects.RoomForUsers} element={<ProtectedRouteUser> <RoomUser /> </ProtectedRouteUser>} />
          <Route path={RouteObjects.VideoCallUsers} element={<ProtectedRouteUser> <VideoCallUsers /> </ProtectedRouteUser>} />

         {/* ADMIN SIDE */}
         <Route path={RouteObjects.AdminLogin} element={<PublicRouteAdmin>< Adminlogin /></PublicRouteAdmin >} />
         <Route path={RouteObjects.Adminhome} element={<ProtectedRouteAdmin>< AdminHome /></ProtectedRouteAdmin>} />
         <Route path={RouteObjects.UserList} element={<ProtectedRouteAdmin>< UsersList /></ProtectedRouteAdmin>} />
         <Route path={RouteObjects.TrainerList} element={<ProtectedRouteAdmin>< TrainersList /></ProtectedRouteAdmin>} />
         <Route path={RouteObjects.CategoryList} element={<ProtectedRouteAdmin>< CategoryList /></ProtectedRouteAdmin>} />
         <Route path={RouteObjects.AddCategory} element={<ProtectedRouteAdmin>< AddCategory /></ProtectedRouteAdmin>} />
         <Route path={RouteObjects.Chats} element={<ProtectedRouteAdmin>< Chats /></ProtectedRouteAdmin>} />
         <Route path={RouteObjects.ChatPersonal} element={<ProtectedRouteAdmin>< ChatPersonal /></ProtectedRouteAdmin>} />

         {/* TRAINER SIDE */}
         <Route path={RouteObjects.TrainerHome} element={<ProtectedRouteTrainer> <TrainerHome /> </ProtectedRouteTrainer>} />
         <Route path={RouteObjects.TrainerLogin} element={<PublicRouteTrainer> <TrainerLogin /> </PublicRouteTrainer>} />
          <Route path={RouteObjects.TrainerRegister} element={<PublicRouteTrainer> <TrainerRegister /> </PublicRouteTrainer>} />
          <Route path={RouteObjects.TrainerOTP} element={<PublicRouteTrainer> <TrainerOtpPage /> </PublicRouteTrainer>} />
          <Route path={RouteObjects.TrainerForgetPassword} element={<PublicRouteTrainer> <TrainerforgotPassword /> </PublicRouteTrainer>} />
          <Route path={RouteObjects.TrainerResetPassword} element={<PublicRouteTrainer> <TrainerResetPassword /> </PublicRouteTrainer>} />
          <Route path={RouteObjects.TrainerProfile} element={<ProtectedRouteTrainer> <TrainerProfile /> </ProtectedRouteTrainer>} />
          <Route path={RouteObjects.TrainerAddService} element={<ProtectedRouteTrainer> <TrainerAddService /> </ProtectedRouteTrainer>} />
          <Route path={RouteObjects.TrainerEditProfile} element={<ProtectedRouteTrainer> <TrainerEditProfile /> </ProtectedRouteTrainer>} />
          <Route path={RouteObjects.TrainerListServices} element={<ProtectedRouteTrainer> <TrainerServices /> </ProtectedRouteTrainer>} />
          <Route path={RouteObjects.ReviewsListOnTrainerSide} element={<ProtectedRouteTrainer> <Reviews /> </ProtectedRouteTrainer>} />
          <Route path={RouteObjects.EditCourse} element={<ProtectedRouteTrainer> <TrainerEditCourse /> </ProtectedRouteTrainer>} />
          <Route path={RouteObjects.TrainerNotifications} element={<ProtectedRouteTrainer> <TrainerNotofication /> </ProtectedRouteTrainer>} />
          <Route path={RouteObjects.ClassesTrainer} element={<ProtectedRouteTrainer> <Classes /> </ProtectedRouteTrainer>} />
          <Route path={RouteObjects.RoomCreation} element={<ProtectedRouteTrainer> <Room /> </ProtectedRouteTrainer>} />
          <Route path={RouteObjects.Videocall} element={<ProtectedRouteTrainer> <VideoCall /> </ProtectedRouteTrainer>} />

         </Routes>
    </div>
  );
}

export default AppRoutes;
