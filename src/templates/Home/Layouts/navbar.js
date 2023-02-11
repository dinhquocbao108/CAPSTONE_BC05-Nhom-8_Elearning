import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import "./Style/navbar.css";
import { getCateCoursesAction } from "../../../redux/actions/coursesActions";
import SignInModal from "../Pages/SignInModal/SignInModal";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { history } from "../../../App";
import { TOKEN, USER_SIGNIN } from "../../../utilities/Settings/config";

export default function Navbar({ toggle }) {
  const HeaderFixed = () => {
    window.onscroll = function () {
      const header = document.querySelector(".header");
      if (window.pageYOffset > 0) {
        header.classList.add("headerFixed");
      } else {
        header.classList.remove("headerFixed");
      }
    };
  };
  HeaderFixed();

  const { arrCateCourse } = useSelector(
    (state) => state.CategoryCoursesReducer
  );

  const { userSignIn } = useSelector((state) => state.UserManagermentReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCateCoursesAction);
  }, []);

  const [showModal, setShowModal] = useState(false);

  const { t } = useTranslation();

  const renderSignIn = () => {
    if (_.isEmpty(userSignIn)) {
      return (
        <div className="flex ml-auto">
          <button
            className="text-main-500 w-max sm:px-4 sm:py-2 p-3 text-xs lg:text-md xl:text-lg 
            mr-2 rounded-md ring-1 ring-main-500 hover:bg-main-500 hover:text-white transition-colors duration-150"
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            {t("Đăng nhập")}
          </button>
          {showModal && (
            <SignInModal setShowModal={setShowModal} showModal={showModal} />
          )}
          <Link
            activeClassName="active"
            className="w-max text-center font-normal hover:shadow-xl lg:text-md xl:text-lg sm:px-4 sm:py-2 p-3 text-xs rounded-md bg-main-500 text-white hover:text-white"
            to="/signup"
          >
            {t("Đăng ký")}
          </Link>
        </div>
      );
    } else {
      return (
        <div
          tabindex="0"
          className="inline-flex group ml-auto sm:mx-2 relative"
        >
          <button
            id="user-menu"
            className=" ring-main-500 w-max ring-1 place-self-stretch hover:bg-main-500 text-main-500 hover:text-white 
            transition-colors duration-150 px-4 py-2 lg:text-md xl:text-lg relative rounded-md"
          >
            {userSignIn?.taiKhoan}
          </button>

          <ul
            id="user-menu-dropdown"
            className=" bg-white z-10 border rounded-lg transform lg:text-md xl:text-lg scale-0 focus:scale-100 sm:group-hover:scale-100 absolute 
            transition duration-150 ease-in-out origin-top-right min-w-[200px]"
            style={{ right: 0, top: 55, padding: 10 }}
          >
            <li>
              <button
                className="py-2 px-4 block text-black transition duration-200 rounded-md w-full hover:bg-main-500 hover:text-white text-left"
                onClick={() => {
                  history.push("/about");
                }}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                className="py-2 px-4 block text-black transition duration-200 rounded-md w-full hover:bg-main-500 hover:text-white text-left"
                onClick={() => {
                  localStorage.removeItem(USER_SIGNIN);
                  localStorage.removeItem(TOKEN);
                  window.location.replace("/");
                }}
              >
                Đăng xuất
              </button>
            </li>
            {userSignIn.maLoaiNguoiDung !== "GV" ? (
              ""
            ) : (
              <li>
                <button
                  className="py-2 px-4 block text-black transition duration-200 rounded-md w-full hover:bg-main-500 hover:text-white text-left"
                  onClick={() => {
                    history.push("/admin");
                  }}
                >
                  Admin
                </button>
              </li>
            )}
          </ul>
        </div>
      );
    }
  };

  const renderTabCateCourses = () => {
    return arrCateCourse?.map((cateCourses, index) => {
      return (
        <li key={index}>
          <NavLink
            activeClassName="active"
            className="sub-link-menu my-1 lg:text-md xl:text-lg py-2 px-4 block text-black transition duration-200 rounded-md w-full;"
            to={`/courses/${cateCourses.maDanhMuc}`}
          >
            {cateCourses.tenDanhMuc}
          </NavLink>
        </li>
      );
    });
  };

  return (
    // <div
    //   className="z-10 flex justify-between items-center w-full h-24
    // lg:fixed top-0 shadow-lg bg-white"
    // >
    //   <nav className="ml-3 sm:ml-5 flex justify-between items-center w-full bg-white text-black font-medium">
    //     <div className="lg:flex-none">
    //       <NavLink to="/">
    //         <h1 style={{ fontSize: 30 }}>CYBERSOFT LEARNING</h1>
    //       </NavLink>
    //     </div>

    //     <div className="lg:inline-flex hidden lg:flex-grow justify-end ml-auto">
    //       <NavLink
    //         activeClassName="active"
    //         exact={true}
    //         className="nav-links mx-1 xl:mx-2 my-4 px-4 p-4 lg:text-md xl:text-lg rounded-md font-medium text-black
    // hover:shadow-lg transition-colors duration-200"
    //         to="/"
    //       >
    //         {t("Trang chủ")}
    //       </NavLink>
    //       <div className="group inline-flex">
    //         <NavLink
    //           activeClassName="active"
    //           className="nav-links lg:mx-1 xl:mx-2 my-4 px-4 p-4 lg:text-md xl:text-lg rounded-md font-medium text-black
    // hover:shadow-lg transition-colors duration-200 group relative flex"
    //           to="/courses"
    //         >
    //           {t("Khoá học")}
    //           <svg
    //             className="w-6 h-6 inline"
    //             fill="none"
    //             stroke="currentColor"
    //             viewBox="0 0 24 24"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M19 9l-7 7-7-7"
    //             />
    //           </svg>
    //         </NavLink>
    //         <ul
    //           className="dropdown-nav bg-white border rounded-md transform scale-0 group-hover:scale-100 absolute
    //         transition duration-150 ease-in-out origin-top min-w-32"
    //         >
    //           {renderTabCateCourses()}
    //         </ul>
    //       </div>
    //       <NavLink
    //         activeClassName="active"
    //         className="nav-links lg:mx-1 xl:mx-2 my-4 px-4 p-4 lg:text-md xl:text-lg rounded-md font-medium text-black
    // hover:shadow-lg transition-colors duration-200"
    //         to="/contact"
    //       >
    //         {t("Liên hệ")}
    //       </NavLink>
    //     </div>
    //     {renderSignIn()}
    //     <div className="px-4 cursor-pointer lg:hidden ml-4">
    //       <i
    //         className="fa fa-bars text-2xl text-main-500"
    //         aria-hidden="true"
    //         onClick={toggle}
    //       />
    //     </div>
    //   </nav>
    // </div>

    <section className="header">
      <div className="headerLeft">
        <a aria-current="page" className="textLogo active" href="/">
          <div className="logo">BC05-NHOM8</div>
        </a>
        <form>
          <input
            action="#"
            className="searchForm"
            type="text"
            placeholder="Tìm kiếm"
          />
        </form>
      </div>
      <div className="headerRight lg:hidden">
        <ul className="menuHeader">
          <li className="courseCate">
            <i className="fas fa-bars mr-1" />
            <a href="/trangchu" aria-current="page" className="active">
              Danh mục
            </a>
            <ul className="courseCateList">
              <li>
                <a href="/danhmuckhoahoc/BackEnd">Lập trình Backend</a>
              </li>
              <li>
                <a href="/danhmuckhoahoc/Design">Thiết kế Web</a>
              </li>
              <li>
                <a href="/danhmuckhoahoc/DiDong">Lập trình di động</a>
              </li>
              <li>
                <a href="/danhmuckhoahoc/FrontEnd">Lập trình Front end</a>
              </li>
              <li>
                <a href="/danhmuckhoahoc/FullStack">Lập trình Full Stack</a>
              </li>
              <li>
                <a href="/danhmuckhoahoc/TuDuy">Tư duy lập trình</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/khoahoc">Khóa học</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li className="eventHeader courseCate">
            <a href="/sukien">Sự kiện</a>
            <ul className="courseCateList">
              <li>
                <a href="/sukien/lastYear">Sự kiện Sale Cuối Năm</a>
              </li>
              <li>
                <a href="/sukien/Noel">Sự kiện Giáng sinh</a>
              </li>
              <li>
                <a href="/sukien/Noel">Sự kiện Noel</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/thongtin">Thông tin</a>
          </li>
        </ul>
      </div>
      <div className="showIconHeader">
        <button className="btnGlobal">{renderSignIn()}</button>

        <div className="px-4 cursor-pointer lg:hidden flex justify-center items-center">
          <i
            className="fa fa-bars text-2xl text-main-500"
            aria-hidden="true"
            onClick={toggle}
          />
        </div>
      </div>
    </section>
  );
}
