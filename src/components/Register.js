import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Register = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstname:Yup.string().required('This field is required!'),
    lastname:Yup.string().required('This field is required!'),
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
    ,
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("This field is required!"),
    re_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'

      ).required("This field is required!")
  });

  const handleRegister = (formValue) => {
    const roles = ["admin"]
    const { username, email, password, firstname, lastname, street, nr, plz, ort, country, position } = formValue;

    setSuccessful(false);

    dispatch(register({ username, email, password, firstname, lastname, street, nr, plz, ort, country, position, roles }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className="col-md-12 signup-form">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <Container>
                <Row>
                 <Col><div className="form-group">
                    <label class="required" htmlFor="firstname">First Name</label>
                    <Field
                      name="firstname"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  </Col> 
                  <Col> 
                  <div className="form-group">
                    <label class="required" htmlFor="lastname">Last Name</label>
                    <Field
                      name="lastname"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  </Col> 
                  </Row>
                  <Row>

                  <Col> 
                  <div className="form-group">
                    <label htmlFor="street">Street</label>
                    <Field
                      name="street"
                      type="street"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="street"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  </Col> 
                  <Col> 
                  <div className="form-group">
                    <label htmlFor="nr">Nr</label>
                    <Field
                      name="nr"
                      type="nr"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="nr"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  </Col> 
                  </Row>
                  <Row>

                  <Col> 
                  <div className="form-group">
                    <label htmlFor="plz">PLZ</label>
                    <Field
                      name="plz"
                      type="plz"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="plz"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  </Col> 
                  <Col> 
                  <div className="form-group">
                    <label htmlFor="ort">Ort</label>
                    <Field
                      name="ort"
                      type="ort"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="ort"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  </Col> 
                  </Row>
                  <Row>

                  <Col> 
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <Field
                      name="country"
                      type="country"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  </Col> 
                  <Col> 
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  </Col> 
                  </Row>
                  <Row>

                  <Col> 
                  <div className="form-group">
                    <label htmlFor="position">Position</label>
                    <Field name="position" type="text" className="form-control" />
                    <ErrorMessage
                      name="position"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  </Col> 
                  <Col> 
                  <div className="form-group">
                    <label  class="required" htmlFor="username">Username</label>
                    <Field name="username" type="text" className="form-control" />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  </Col> 
                </Row>
                <Row>
                <Col> 
                  <div className="form-group">
                    <label class="required" htmlFor="password">Password</label>
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
                  </Col> 
                  <Col> 
                  <div className="form-group">
                    <label class="required" htmlFor="re_password">Re-Password</label>
                    <Field
                      name="re_password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="re_password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  </Col> 
                  </Row>
                  <Row>

                  <Col> 
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                  </Col> 
                </Row>
              </Container>
            )}
          </Form>
        </Formik>
      </div>

      {message && (
        <div className="form-group">
          <div
            className={successful ? "alert alert-success" : "alert alert-danger"}
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
