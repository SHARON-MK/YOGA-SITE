export const RouteObjects = {
    // ===========USER============
    Login: "/login",
    Register: "/register",
    OTP: "/OtpPage",
    ForgetPassword: "/forgotPassword",
    ResetPassword: "/resetPassword",
    Profile: "/profile",
    EditProfile: "/profile/editprofile",
    Purchase: "/profile/purchases",
    RoomForUsers: "/profile/purchases/room",
    VideoCallUsers: "/profile/purchases/room/videocall/:roomId",
    Rating: "/profile/purchases/rating",
    Courses: "/courses",
    CourseDetailedPage: "/courses/detailed",
    Notifications: "/notifications",
  
    // ===========TRAINER============
  
    TrainerHome : "/trainer",
    TrainerLogin : "/trainer/login",
    TrainerRegister : "/trainer/register",
    TrainerForgetPassword : "/trainer/forgotPassword",
    TrainerResetPassword : "/trainer/resetPassword",
    TrainerOTP : "/trainer/OtpPage",
    TrainerProfile : "/trainer/profile",
    TrainerAddService: '/trainer/profile/addservice',
    TrainerListServices: '/trainer/profile/services',
    ReviewsListOnTrainerSide: '/trainer/profile/services/reviews',
    ClassesTrainer: '/trainer/profile/services/classes',
    RoomCreation: '/trainer/profile/services/classes/room',
    Videocall: '/trainer/profile/services/classes/room/videocall/:roomId',
    EditCourse: '/trainer/profile/services/edit',
    TrainerEditProfile : "/trainer/profile/edit",
    TrainerNotifications : "/trainer/notification",
    
    
    // ===========ADMIN============
    AdminLogin: "/admin/Login",
    Adminhome: "/admin",
    UserList: "/admin/users",
    Chats: "/admin/chats",
    ChatPersonal: "/admin/chats/personal",
    TrainerList: "/admin/trainers",
    CategoryList: "/admin/categories",
    AddCategory: "/admin/categories/add"

  };
  

  