import React, { Suspense, lazy, Fragment } from "react";
import Loading from "./components/Loading/loading";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import "./App.css";
import { Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import UserTemplate from "./templates/UserTemplate/UserTemplate";
import HomeTemplate from "./templates/Home/HomeTemplate";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import AdminTemplate from "./templates/Admin/AdminTemplate";
import Dashboard from "./templates/Admin/Pages/Dashboard";
import Courses from "./templates/Admin/Pages/Courses/Courses";
import Users from "./templates/Admin/Pages/Users/Users";
import AddNewCourses from "./templates/Admin/Pages/Courses/addNewCourses";
import EditCourse from "./templates/Admin/Pages/Courses/editCourse";
import CoursesTemplate from "./templates/Home/Pages/Courses/CoursesTemplate";
import addNewUser from "./templates/Admin/Pages/Users/addNewUser";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu4wdLSdqfKe7a7X1sLZC7TytJ6mQP6ic",
  authDomain: "bc05-nhom8-elearning.firebaseapp.com",
  projectId: "bc05-nhom8-elearning",
  storageBucket: "bc05-nhom8-elearning.appspot.com",
  messagingSenderId: "172004485377",
  appId: "1:172004485377:web:02a94e08b0e16dc6ef5300",
  measurementId: "G-TW9TLWRD7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const history = createBrowserHistory();

function App() {
  return (
    <Fragment>
      <Router history={history}>
        <Suspense fallback={<Loading />}>
          <ScrollToTop />
          <Switch>
            <HomeTemplate
              path="/"
              exact
              Component={lazy(() =>
                import("./templates/Home/Pages/HomeContent")
              )}
            />
            <HomeTemplate
              path="/courses"
              exact
              Component={lazy(() => import("./templates/Home/Pages/Courses"))}
            />
            <HomeTemplate
              path="/courses/detail/:id"
              exact
              Component={lazy(() =>
                import("./templates/Home/Pages/DetailsCourse")
              )}
            />
            <CoursesTemplate
              path="/courses/:cate"
              exact
              Component={lazy(() =>
                import("./templates/Home/Pages/Courses/CourseEachCate")
              )}
            />
            <HomeTemplate
              path="/contact"
              exact
              Component={lazy(() => import("./templates/Home/Pages/Contact"))}
            />
            <HomeTemplate
              path="/profile"
              exact
              Component={lazy(() =>
                import("./templates/Home/Pages/UserPages/Profile")
              )}
            />
            <HomeTemplate
              path="/alert"
              exact
              Component={lazy(() =>
                import("./templates/PageNotFound/AlertPage")
              )}
            />
            <UserTemplate
              path="/signup"
              exact
              Component={lazy(() =>
                import("./templates/Home/Pages/UserPages/SignUp")
              )}
            />
            <UserTemplate
              path="/signin"
              exact
              Component={lazy(() =>
                import("./templates/Home/Pages/UserPages/SignIn")
              )}
            />
            <AdminTemplate path="/admin" exact Component={Dashboard} />
            <AdminTemplate path="/admin/dasboard" exact Component={Dashboard} />
            <AdminTemplate path="/admin/courses" exact Component={Courses} />
            <AdminTemplate
              path="/admin/courses/add-new"
              exact
              Component={AddNewCourses}
            />
            <AdminTemplate
              path="/admin/courses/edit/:id"
              exact
              Component={EditCourse}
            />
            <AdminTemplate path="/admin/users" exact Component={Users} />
            <AdminTemplate
              path="/admin/users/add-new"
              exact
              Component={addNewUser}
            />

            <CheckoutTemplate
              path="/checkout/:id"
              exact
              Component={lazy(() =>
                import("./templates/CheckoutTemplate/CheckoutPage/checkout")
              )}
            />
          </Switch>
        </Suspense>
      </Router>
    </Fragment>
  );
}

export default App;
