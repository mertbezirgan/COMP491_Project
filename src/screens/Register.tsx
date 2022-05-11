import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import IUser from "../types/user.type";
import { register } from "../services/auth.service";
import { Button } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { storageKeys } from "../services/storage.service";
import "../css/register.css";

interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

const Register: React.FC<Props> = ({ history }) => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [, setCurrentUser] = useLocalStorage(storageKeys.user, null);
  const [, setLogged] = useLocalStorage(storageKeys.logged, false);

  const initialValues: IUser = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleRegister = async (formValue: IUser) => {
    const { username, email, password } = formValue;
    setLoading(true);

    let data = await register(username, email, password);
    if (!data || !data.success) {
      setSuccessful(false);
      setMessage(data.message);
    } else {
      setCurrentUser(data.data);
      setLogged(true);
      history.push("/profile");
    }
    setLoading(false);
  };

  return (
    <div id="register" className="container">
      <div className="col-md-5 register-card-container">
        <div className="card card-container p-5">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <h3>Create New Account</h3>
                  </div>
                  <div className="form-group">
                    <label className="mt-4 mb-2" htmlFor="username">
                      {" "}
                      Full Name{" "}
                    </label>
                    <Field
                      name="username"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label className="mt-4 mb-2" htmlFor="email">
                      {" "}
                      Email{" "}
                    </label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label className="mt-4 mb-2" htmlFor="password">
                      {" "}
                      Password{" "}
                    </label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group mt-4 mb-2">
                    <Button
                      disabled={loading}
                      type="submit"
                      style={{ display: "block", marginLeft: "auto" }}
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        <>Sign Up</>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
