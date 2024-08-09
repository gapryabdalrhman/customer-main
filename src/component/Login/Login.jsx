import React, { useState, useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, Navigate } from "react-router-dom";
import styles from "./signup.module.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PhoneIcon from "@mui/icons-material/Phone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import Loader from "../Loader/Loader";
import { loginHandler } from "../../store/auth-actions";
// import { authActions } from '../store/authSlice';

const steps = ["Personal Information"];

const initialPersonalInformationValues = {
  enteredName: "",
  enteredLastName: "",
  namePlaceholder: "",
  lastNamePlaceholder: "",
  enteredEmail: "",
  emailPlaceholder: "",
  emailIsValid: true,
  enteredPassword: "",
  passwordPlaceholder: "",
  nameIsValid: true,
  lastNameIsValid: true,
  passwordIsValid: true,
  enteredRePassword: "",
  rePasswordIsValid: true,
  enteredPhone: "",
  phoneIsValid: true,
  rePasswordPlaceholder: "",

  personalInformationIsValid: false,

  enteredAddress: "",

  addressIsValid: true,

  registerError: {},
};

const personalInformationReducer = (
  state = initialPersonalInformationValues,
  action
) => {
  const nameRegex = /^[A-Za-z]+$/;
  const emailRegex = /\S+@\S+\.\S+/;
  switch (action.type) {
    case "personalInformationValid":
      return {
        ...state,
        personalInformationIsValid:
          nameRegex.test(state.enteredName) &&
          state.enteredName.length > 3 &&
          state.enteredName.length < 20 &&
          nameRegex.test(state.enteredLastName) &&
          state.enteredLastName.length > 3 &&
          state.enteredLastName.length < 20 &&
          emailRegex.test(state.enteredEmail) &&
          state.enteredPassword.trim().length >= 8 &&
          state.enteredRePassword.trim() === state.enteredPassword.trim() &&
          state.enteredAddress.trim().length > 5 &&
          state.enteredAddress.trim().length < 30 &&
          state.enteredPhone.trim().length === 11 &&
          (state.enteredPhone.startsWith("011") ||
            state.enteredPhone.startsWith("010") ||
            state.enteredPhone.startsWith("012")),
      };

    case "setName":
      return {
        ...state,
        enteredName: action.payload.name,
        nameIsValid: true,
      };
    case "setLastName":
      return {
        ...state,
        enteredLastName: action.payload.name,
        lastNameIsValid: true,
      };
    case "setEmail":
      return {
        ...state,
        enteredEmail: action.payload.email,
        emailIsValid: true,
      };
    case "setPassword":
      return {
        ...state,
        enteredPassword: action.payload.password,
        passwordIsValid: true,
      };
    case "setRePassword":
      return {
        ...state,
        enteredRePassword: action.payload.rePassword,
        rePasswordIsValid: true,
      };
    case "nameValid":
      return {
        ...state,
        nameIsValid:
          nameRegex.test(state.enteredName) &&
          state.enteredName.trim().length < 20 &&
          state.enteredName.trim().length > 3,
        enteredName:
          nameRegex.test(state.enteredName) &&
          state.enteredName.trim().length < 20 &&
          state.enteredName.trim().length > 3
            ? state.enteredName
            : "",
        namePlaceholder:
          state.enteredName.trim().length === 0
            ? "Name Required "
            : !nameRegex.test(state.enteredName)
            ? "Numbers Or Symbols Not Valid"
            : state.enteredName.length < 3
            ? "Name Cannot be less 3 chars"
            : state.enteredName.length > 20
            ? "Name Cannot be More 20 chars"
            : "Enter Your Name",
      };
    case "lastNameValid":
      return {
        ...state,
        lastNameIsValid:
          nameRegex.test(state.enteredLastName) &&
          state.enteredName.trim().length < 20 &&
          state.enteredName.trim().length > 3,
        enteredLastName:
          nameRegex.test(state.enteredLastName) &&
          state.enteredLastName.trim().length < 20 &&
          state.enteredName.trim().length > 3
            ? state.enteredLastName
            : "",
        lastNamePlaceholder:
          state.enteredLastName.trim().length === 0
            ? "Name Required "
            : !nameRegex.test(state.enteredLastName)
            ? "Numbers Or Symbols Not Valid"
            : state.enteredLastName.length < 3
            ? "Name Cannot be less 3 chars"
            : state.enteredLastName.length > 20
            ? "Name Cannot be More 20 chars"
            : "Enter Your Name",
      };
    case "addressValid":
      return {
        ...state,
        addressIsValid:
          state.enteredAddress.trim().length > 8 &&
          state.enteredAddress.trim().length < 30,
        enteredAddress:
          state.enteredAddress.trim().length > 8 &&
          state.enteredAddress.trim().length < 30
            ? state.enteredAddress
            : "",
      };

    case "emailValid":
      return {
        ...state,
        emailIsValid: emailRegex.test(state.enteredEmail),
        enteredEmail: emailRegex.test(state.enteredEmail)
          ? state.enteredEmail
          : "",
        emailPlaceholder:
          state.enteredEmail.trim().length === 0
            ? "Email Required "
            : !emailRegex.test(state.enteredEmail)
            ? "Not Valid Email"
            : "Enter Your Email",
      };
    case "passwordValid":
      return {
        ...state,
        passwordIsValid: state.enteredPassword.trim().length >= 8,
        enteredPassword:
          state.enteredPassword.trim().length >= 8 ? state.enteredPassword : "",
        passwordPlaceholder:
          state.enteredPassword.trim().length === 0
            ? "Password Required "
            : state.enteredPassword.trim().length < 8
            ? "Password At Least 8 Chars"
            : "Enter Your Password",
      };
    case "rePasswordValid":
      return {
        ...state,
        rePasswordIsValid:
          state.enteredRePassword.trim().length !== 0 &&
          state.enteredRePassword.trim() === state.enteredPassword.trim(),
        enteredRePassword:
          state.enteredRePassword.trim() === state.enteredPassword.trim()
            ? state.enteredRePassword
            : "",
        rePasswordPlaceholder:
          state.enteredRePassword.trim().length === 0
            ? "Re-Password Required "
            : state.enteredRePassword.trim() !== state.enteredPassword.trim()
            ? "Not Matching With Password"
            : "Enter Your Re-Password",
      };
    case "setPhone":
      return {
        ...state,
        enteredPhone: action.payload.phone,
        phoneIsValid: true,
      };
    case "phoneValid":
      return {
        ...state,
        phoneIsValid:
          state.enteredPhone.trim().length === 11 &&
          (state.enteredPhone.startsWith("011") ||
            state.enteredPhone.startsWith("010") ||
            state.enteredPhone.startsWith("012")),
        enteredPhone:
          state.enteredPhone.trim().length === 11 &&
          (state.enteredPhone.startsWith("011") ||
            state.enteredPhone.startsWith("010") ||
            state.enteredPhone.startsWith("012"))
            ? state.enteredPhone
            : "",
      };

    case "setAddress":
      return {
        ...state,
        enteredAddress: action.payload.address,
      };
    case "registerValidation":
      if (action.payload.error.includes("email")) {
        return {
          ...state,
          formIsValid: false,
          registerError: {
            ...state.registerError,
            email: action.payload.error,
          },
          enteredEmail: "",
        };
      }
      return {
        ...state,
        registerError: {
          ...state.registerError,
          register: action.payload.error,
        },
      };

    default:
      return {
        state,
      };
  }
};

const Login = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector((state)=> state.auth.isLoggedIn)  
  
  const dispatch = useDispatch();
  const isLoading = useSelector((state)=>state.auth.isWaitingForLogin);
  const [personalInformationForm, dispatchPersonalInformation] = useReducer(
    personalInformationReducer,
    initialPersonalInformationValues
  );

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRewritePasswordVisible, setIsRewritePasswordVisible] =
    useState(false);

  

  useEffect(() => {
    const timeTocheckPersonalInformation = setTimeout(() => {
      dispatchPersonalInformation({ type: "personalInformationValid" });
    }, 500);
    return () => {
      clearTimeout(timeTocheckPersonalInformation);
    };
  }, [
    personalInformationForm.enteredName,
    personalInformationForm.enteredPassword,
    personalInformationForm.enteredRePassword,
    personalInformationForm.enteredEmail,
    personalInformationForm.enteredAddress,
    personalInformationForm.enteredPhone,
    personalInformationForm.enteredLastName,
  ]);

  // work for form and the validation

  const validateAddressHandler = () => {
    dispatchPersonalInformation({ type: "addressValid" });
  };

  // set name value and check for its validation
  const nameChangeHandler = (event) => {
    dispatchPersonalInformation({
      type: "setName",
      payload: { name: event.target.value },
    });
  };
  const validateNameHandler = () => {
    dispatchPersonalInformation({ type: "nameValid" });
  };

  const lastNameChangeHandler = (event) => {
    dispatchPersonalInformation({
      type: "setLastName",
      payload: { name: event.target.value },
    });
  };
  const validateLastNameHandler = () => {
    dispatchPersonalInformation({ type: "lastNameValid" });
  };
  // set email value and check for its validation
  const emailChangeHandler = (event) => {
    dispatchPersonalInformation({
      type: "setEmail",
      payload: { email: event.target.value },
    });
  };
  const validateEmailHandler = () => {
    dispatchPersonalInformation({ type: "emailValid" });
  };

  const phoneChangeHandler = (event) => {
    dispatchPersonalInformation({
      type: "setPhone",
      payload: { phone: event.target.value },
    });
  };
  const validatePhoneHandler = () => {
    dispatchPersonalInformation({ type: "phoneValid" });
  };
  // set password value and check for its validation
  const passwordChangeHandler = (event) => {
    dispatchPersonalInformation({
      type: "setPassword",
      payload: { password: event.target.value },
    });
  };
  const validatePasswordHandler = () => {
    dispatchPersonalInformation({ type: "passwordValid" });
  };
  // set re-password value and check for its validation
  const rePasswordChangeHandler = (event) => {
    dispatchPersonalInformation({
      type: "setRePassword",
      payload: { rePassword: event.target.value },
    });
  };
  const validateRePasswordHandler = () => {
    dispatchPersonalInformation({ type: "rePasswordValid" });
  };

  const addressChangeHandler = (event) => {
    dispatchPersonalInformation({
      type: "setAddress",
      payload: { address: event.target.value },
    });
  };

  const passwordVisibiltyHandler = () => {
    setIsPasswordVisible((prev) => {
      return !prev;
    });
  };

  const rewritePasswordVisibiltyHandler = () => {
    setIsRewritePasswordVisible((prev) => {
      return !prev;
    });
  };

  const signupHandler =  ()=>{
   
    dispatch(loginHandler({
      first_name : personalInformationForm.enteredName , 
      last_name : personalInformationForm.enteredLastName , 
      phone : personalInformationForm.enteredPhone , 
      email : personalInformationForm.enteredEmail , 
      password : personalInformationForm.enteredPassword ,
      confirm_password : personalInformationForm.enteredPassword , 
      address : personalInformationForm.enteredAddress
    } , dispatchPersonalInformation))
   

   

  }
  if(isUserLoggedIn)  return <Navigate to='/' replace/>
  return (
    <div className={styles.main}>
      {isLoading ? <Loader /> : null}
      <p>Sign Up</p>
      {/* first one  */}

      <Stepper sx={{ width: "100%" }} nonLinear alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton>{label}</StepButton>
          </Step>
        ))}
      </Stepper>

      {/* first one  */}

      {/* //  second one  */}

      <form className={styles.form}>
        {/* first slide */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            pt: 2,
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <div className={styles.inputBox}>
            <p>First Name :</p>
            <div
              className={
                personalInformationForm.nameIsValid
                  ? styles.inpuField
                  : `${styles.inpuField} + ${styles.error}`
              }
            >
              <input
                type="text"
                placeholder={
                  personalInformationForm.nameIsValid
                    ? "Enter Your First Name"
                    : personalInformationForm.namePlaceholder
                }
                value={personalInformationForm.enteredName}
                onChange={(e) => nameChangeHandler(e)}
                onBlur={validateNameHandler}
              />
              <PersonIcon />
            </div>
          </div>
          <div className={styles.inputBox}>
            <p>Last Name :</p>
            <div
              className={
                personalInformationForm.lastNameIsValid
                  ? styles.inpuField
                  : `${styles.inpuField} + ${styles.error}`
              }
            >
              <input
                type="text"
                placeholder={
                  personalInformationForm.lastNameIsValid
                    ? "Enter Your Last Name"
                    : personalInformationForm.lastNamePlaceholder
                }
                value={personalInformationForm.enteredLastName}
                onChange={(e) => lastNameChangeHandler(e)}
                onBlur={validateLastNameHandler}
              />
              <PersonIcon />
            </div>
          </div>
          <div className={styles.inputBox}>
            <p>email :</p>
            <div
              className={
                personalInformationForm.emailIsValid
                  ? personalInformationForm.registerError["email"]
                    ? `${styles.inpuField} + ${styles.error}`
                    : styles.inpuField
                  : `${styles.inpuField} + ${styles.error}`
              }
            >
              <input
                type="email"
                placeholder={
                  personalInformationForm.emailIsValid
                    ? personalInformationForm.registerError["email"]
                      ? personalInformationForm.registerError["email"]
                      : 'EX "ex@ex.com'
                    : personalInformationForm.emailPlaceholder
                }
                value={personalInformationForm.enteredEmail}
                onChange={(e) => emailChangeHandler(e)}
                onBlur={validateEmailHandler}
              />
              <EmailIcon />
            </div>
          </div>
          <div className={styles.inputBox}>
            <p>Phone :</p>
            <div
              className={
                personalInformationForm.phoneIsValid
                  ? styles.inpuField
                  : `${styles.inpuField} + ${styles.error}`
              }
            >
              <input
                type="text"
                placeholder={
                  personalInformationForm.phoneIsValid
                    ? "Enter Your Phone"
                    : "must 11 char start 011||012||010"
                }
                value={personalInformationForm.enteredPhone}
                onChange={(e) => phoneChangeHandler(e)}
                onBlur={validatePhoneHandler}
              />
              <PhoneIcon />
            </div>
          </div>
          <div className={styles.inputBox}>
            <p>password :</p>
            <div
              className={
                personalInformationForm.passwordIsValid
                  ? styles.inpuField
                  : `${styles.inpuField} + ${styles.error}`
              }
            >
              {isPasswordVisible ? (
                <VisibilityIcon onClick={passwordVisibiltyHandler} />
              ) : (
                <VisibilityOffIcon onClick={passwordVisibiltyHandler} />
              )}
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder={
                  personalInformationForm.passwordIsValid
                    ? "Enter Your Password"
                    : personalInformationForm.passwordPlaceholder
                }
                value={personalInformationForm.enteredPassword}
                onChange={(e) => passwordChangeHandler(e)}
                onBlur={validatePasswordHandler}
              />
              <LockIcon />
            </div>
          </div>
          <div className={styles.inputBox}>
            <p>re-password :</p>
            <div
              className={
                personalInformationForm.rePasswordIsValid
                  ? styles.inpuField
                  : `${styles.inpuField} + ${styles.error}`
              }
            >
              {isRewritePasswordVisible ? (
                <VisibilityIcon onClick={rewritePasswordVisibiltyHandler} />
              ) : (
                <VisibilityOffIcon onClick={rewritePasswordVisibiltyHandler} />
              )}
              <input
                type={isRewritePasswordVisible ? "text" : "password"}
                placeholder={
                  personalInformationForm.rePasswordIsValid
                    ? "Re-Write Your Password"
                    : personalInformationForm.rePasswordPlaceholder
                }
                value={personalInformationForm.enteredRePassword}
                onChange={(e) => rePasswordChangeHandler(e)}
                onBlur={validateRePasswordHandler}
              />
              <LockIcon />
            </div>
          </div>
          <div className={styles.inputBox}>
            <p>Address :</p>
            <div
              className={
                personalInformationForm.addressIsValid
                  ? styles.inpuField
                  : `${styles.inpuField} + ${styles.error}`
              }
            >
              <input
                type="text"
                value={personalInformationForm.enteredAddress}
                onChange={addressChangeHandler}
                onBlur={validateAddressHandler}
                placeholder={
                  personalInformationForm.addressIsValid
                    ? "Your Address"
                    : "It Must From 8 to 30 char"
                }
              />
              <LockIcon />
            </div>
          </div>
        </Box>
      </form>

      <div className={styles.actions}>
        <Box sx={{ flex: "1 1 auto", alignItems: "center" }} />

        {personalInformationForm.personalInformationIsValid ? (
          <div className={styles.discover}>
            <KeyboardDoubleArrowRightIcon />
          </div>
        ) : null}

        <button
          className={styles.registerBtn}
          disabled={!personalInformationForm.personalInformationIsValid}
          onClick={signupHandler}
        >
          SIGN UP
        </button>
        <Link to="/login">
          <button>Already Have Account ?</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
