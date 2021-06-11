import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { Formik } from "formik";
import { useMutation, gql } from "@apollo/client";
import { AUTH_TOKEN } from "../constants";
import { LoginContext } from "../LoginContext";

interface errorType {
  email: String;
  password: String;
  name: String;
  confirmPassword: String;
}

const SIGNUP_MUTATION = gql`
  mutation SignupMuattion($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        role
      }
    }
  }
`;

const Login = () => {
  const value = useContext(LoginContext);
  const [formState, setFormState] = useState({
    login: true,
    name: "",
    email: "",
    password: "",
  });
  const history = useHistory();

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    },
    onCompleted: async ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      alert("User Sucessfully Signedup!");
      try {
        await login();
      } catch (e) {}
      history.push("/");
    },
  });
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      if (login.user.role == "admin") {
        localStorage.setItem("isAdmin","true");
        value.setLoginStatus({ isLoggedin: true, isAdmin: true });
      } else {
        value.setLoginStatus({ isLoggedin: true, isAdmin: false });
      }
      localStorage.clear();
      localStorage.setItem("AUTH_TOKEN", login.token);

      alert("User Sucessfully Loggedin!");
      history.push("/");
    },
  });
  const submit=()=>{
    
  }

  return (
    <div>
      <h4 className="mv3">{formState.login ? "Login" : "Sign Up"}</h4>
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          confirmPassword: "",
        }}
        validate={values => {
          const errors: Partial<errorType> = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.name && !formState.login) {
            errors.name = "Invalid email address";
          }
          if (values.password.length < 6) {
            errors.password = "Password must have more than 6 characters";
          }
          if (values.password !== values.confirmPassword && !formState.login) {
            errors.confirmPassword = "Password does not match";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            formState.name = values.name;
            formState.email = values.email;
            formState.password = values.password;

            if (formState.login) {
              try {
                await login();
              } catch (e) {
                alert(e.message);
              }
            } else {
              try {
                await signup();
              } catch (e) {}
            }

            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-column h4 justify-around"
          >
            {!formState.login && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            )}
            {errors.name && touched.name && errors.name}

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            {!formState.login && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
            )}
            {errors.confirmPassword && touched.confirmPassword}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-25 pointer"
            >
              Submit
            </button>

            <button
              className="w-25 pointer"
              type="button"
              onClick={e => {
                setFormState({
                  ...formState,
                  login: !formState.login,
                });
              }}
            >
              {formState.login
                ? "need to create an account?"
                : "already have an account?"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
