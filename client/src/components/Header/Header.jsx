import React, { useRef } from "react";

import { Container, Row, Col } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../styles/header.css";
import { useState } from "react";
import { Button, Form, Input, Modal, notification, message } from "antd";
import { customerRegister, login, logout } from "../../services/auth.services";
import { checkLoggedIn, getUserInfo } from "../../utils/user";
import Logo from "../UI/atom/logo/logo";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },

  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = ({ content }) => {
  const ADMIN = 1;
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(checkLoggedIn());
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [username, setUserName] = useState(getUserInfo()?.name);
  const [messageApi, contextHolder] = message.useMessage();
  // const [userInfo, setUserInfo] = useState();
  const userInfo = getUserInfo();

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const changeFormType = () => {
    setIsLoginForm(!isLoginForm);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = async (values) => {
    const response = await login(values.phone, values.password);
    if (response) {
      setOpen(false);
      setIsLoggedIn(true);
      setUserName(getUserInfo()?.name);
      if (getUserInfo()?.role === ADMIN) {
        navigate("/admin");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onRegisterFinish = async (values) => {
    const customerObject = {
      name: values.name,
      password: values.password,
      passwordConfirmation: values.password,
      phone: values.phone,
      role: 2,
      email: values.email,
      address: values.address,
    };
    const registerResponse = await customerRegister(customerObject);
    if (!registerResponse.hasError) {
      await onFinish({ phone: values.phone, password: values.password });
    } else {
      console.log(registerResponse.errors);
      errorPopUp(registerResponse.errors["email"]);
      errorPopUp(registerResponse.errors["phone"]);
      errorPopUp(registerResponse.errors["password"]);
    }
  };

  const errorPopUp = (errMessage) => {
    if (errMessage) {
      messageApi.open({
        type: "error",
        content: errMessage,
      });
    }
  };

  const onRegisterFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const handleLogout = async () => {
    const response = await logout();
    if (response) {
      setIsLoggedIn(false);
    }
  };

  return (
    <header className="header">
      {contextHolder}
      <Modal
        title="Login"
        open={open}
        onCancel={handleCancel}
        okText={isLoginForm ? "Rgister" : "Login"}
        onOk={changeFormType}
        // okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        {isLoginForm ? (
          <Form
            name="login"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form
            name="register"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onRegisterFinish}
            onFinishFailed={onRegisterFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
      {/* ============ header top ============ */}

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <Logo isSecondary />
                  </Link>
                </h1>
              </div>
            </Col>
            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Bangladesh</h4>
                  <h6>Noakhali, Bangladesh</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Friday</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i class="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <div className="mobile__menu">
              <span class="icon-wrapper">
                <i class="ri-menu-line" onClick={toggleMenu}></i>
              </span>
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                {isLoggedIn ? (
                  <>
                    <Link to="#" className=" d-flex align-items-center gap-1">
                      {username}
                    </Link>

                    <Link
                      to="#"
                      className=" d-flex align-items-center gap-1"
                      onClick={handleLogout}
                    >
                      <i class="ri-logout-circle-line"></i> Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="#"
                      className=" d-flex align-items-center gap-1"
                      onClick={showModal}
                    >
                      <i class="ri-login-circle-line"></i> Login or Register
                    </Link>
                    {/* /
                    <Link
                      to="#"
                      className=" d-flex align-items-center gap-1"
                      onClick={showModal}
                    >
                      <i class="ri-user-line"></i> Register
                    </Link> */}
                  </>
                )}
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
                {userInfo?.role === 2 && (
                  <NavLink
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    to={`/all-ride/${userInfo.id}`}
                  >
                    Your Rides
                  </NavLink>
                )}
                {userInfo?.role === 3 && (
                  <NavLink
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    to={`/all-request/${userInfo.id}`}
                  >
                    Check Your Drive
                  </NavLink>
                )}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
