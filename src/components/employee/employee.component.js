import React, { Component } from "react";
import { connect } from "react-redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { updateemployee, deleteemployee,addcomment } from "../../slices/employees";
import employeeDataService from "../../services/employee.service";
import { withRouter } from '../../common/with-router';
import { Formik, Field, Form, ErrorMessage } from "formik";

import "./employee.css";

class employee extends Component {
  constructor(props) {
    super(props);
    this.handleChangeComment = this.handleChangeComment.bind(this);

    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.getemployee = this.getemployee.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.postComment = this.postComment.bind(this);
    this.removeemployee = this.removeemployee.bind(this);

    this.state = {
      currentemployee: {
        _id: null,
        firstname: "",
        username: "",
        lastname: "",
        email: "",
        password: "",
        position: "",
        street: "",
        ort: "",
        nr: "",
        plz: "",
        country: "",
        comments:
          [{
            author: "",
            comment: "",
            cretaed_at: "",

          }]

      },
      message: "",
      comment: "s"
    };
  }




  componentDidMount() {
    this.getemployee(this.props.router.params.id);
  }
  handleChangeComment(e) {
    const comment = e.target.value;

    this.setState({
      comment: comment,
    });
  }
  onChangeFirstname(e) {
    const firstname = e.target.value;

    this.setState(function (prevState) {
      return {
        currentemployee: {
          ...prevState.currentemployee,
          firstname: firstname,
        },
      };
    });
  }

  onChangeLastname(e) {
    const lastname = e.target.value;

    this.setState((prevState) => ({
      currentemployee: {
        ...prevState.currentemployee,
        lastname: lastname,
      },
    }));
  }

  getemployee(id) {
    employeeDataService.get(id)
      .then((response) => {
        this.setState({
          currentemployee: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentemployee._id,
      firstname: this.state.currentemployee.firstname,
      lastname: this.state.currentemployee.lastname,
      street: this.state.currentemployee.street,
      ort: this.state.currentemployee.ort,
      nr: this.state.currentemployee.nr,
      plz: this.state.currentemployee.plz,
      email: this.state.currentemployee.email,
      country: this.state.currentemployee.country,
      position: this.state.currentemployee.position,
    };

    this.props
      .updateemployee({ id: this.state.currentemployee._id, data })
      .unwrap()
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentemployee: {
            ...prevState.currentemployee,
            published: status,
          },
        }));

        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateemployee({ id: this.state.currentemployee._id, data: this.state.currentemployee })
      .unwrap()
      .then((reponse) => {
        console.log(reponse);

        this.setState({ message: "The employee was updated successfully!" });

      })
      .catch((e) => {
        console.log(e);
      });
  }


  postComment() {
    this.props
      .addcomment({ id: this.state.currentemployee._id, data: { _id: this.state.currentemployee._id, comment: this.state.comment, author: JSON.parse(localStorage.getItem("user")) } })
      .unwrap()
      .then((reponse) => {
        console.log(reponse);
        this.setState({
          comment: '',
        });
        this.getemployee(this.props.router.params.id);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  removeemployee() {
    this.props
      .deleteemployee({ id: this.state.currentemployee._id })
      .then(() => {
        this.props.router.navigate('/employees');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentemployee } = this.state;
    
    return (
      <div class="row">
        {currentemployee ? (
          <div class="column">
            {/* <form>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  value={currentemployee.firstname}
                  onChange={this.onChangeFirstname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  value={currentemployee.lastname}
                  onChange={this.onChangeLastname}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentemployee.published ? "Published" : "Pending"}
              </div>
            </form> */}
            <div className="col-md-12 edit-form">
              <div className="card card-container">
                <img
                  src="//gstatic.com/identity/boq/accountsettingsmobile/menu_home_selected_96x96_5c998d9ce8f4b27ea44275549a45a597.png"
                  alt="profile-img"
                  className="profile-img-card"
                />
                <Formik
                  initialValues={currentemployee}
                  //validationSchema={validationSchema}
                  onSubmit={updateemployee}
                >
                  <Form>
                    <Container>
                      <Row>
                        <Col><div className="form-group">
                          <label class="required" htmlFor="firstname">First Name</label>
                          <Field
                            name="firstname"
                            type="text"
                            // value={currentemployee.firstname}
                            className="form-control"
                            value={currentemployee.firstname}
                            onChange={e =>
                              this.setState((prevState) => ({
                                currentemployee: {
                                  ...prevState.currentemployee,
                                  firstname: e.target.value,
                                },
                              }))
                            }
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
                              value={currentemployee.lastname}
                            onChange={e =>
                              this.setState((prevState) => ({
                                currentemployee: {
                                  ...prevState.currentemployee,
                                  lastname: e.target.value,
                                },
                              }))
                            }
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
                              value={currentemployee.street}
                            onChange={e =>
                              this.setState((prevState) => ({
                                currentemployee: {
                                  ...prevState.currentemployee,
                                  street: e.target.value,
                                },
                              }))
                            }
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
                              value={currentemployee.nr}
                            onChange={e =>
                              this.setState((prevState) => ({
                                currentemployee: {
                                  ...prevState.currentemployee,
                                  nr: e.target.value,
                                },
                              }))
                            }
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
                              value={currentemployee.plz}
                            onChange={e =>
                              this.setState((prevState) => ({
                                currentemployee: {
                                  ...prevState.currentemployee,
                                  plz: e.target.value,
                                },
                              }))
                            }
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
                              value={currentemployee.ort}
                            onChange={e =>
                              this.setState((prevState) => ({
                                currentemployee: {
                                  ...prevState.currentemployee,
                                  ort: e.target.value,
                                },
                              }))
                            }
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
                              value={currentemployee.country}
                            onChange={e =>
                              this.setState((prevState) => ({
                                currentemployee: {
                                  ...prevState.currentemployee,
                                  country: e.target.value,
                                },
                              }))
                            }
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
                            <Field name="email" type="email" className="form-control" 
                            value={currentemployee.email}
                            onChange={e =>
                              this.setState((prevState) => ({
                                currentemployee: {
                                  ...prevState.currentemployee,
                                  email: e.target.value,
                                },
                              }))
                            }/>
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
                            <Field name="position" type="text" className="form-control" 
                            value={currentemployee.position}
                            onChange={e =>
                              this.setState((prevState) => ({
                                currentemployee: {
                                  ...prevState.currentemployee,
                                  position: e.target.value,
                                },
                              }))
                            }/>
                            <ErrorMessage
                              name="position"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </Col>
                        <Col>
                          <div className="form-group">
                            <label class="required" htmlFor="username">Username</label>
                            <label name="username" type="text" val className="form-control" >
                            {currentemployee.username}
                            </label>
          
                          </div>
                        </Col>
                      </Row>
                      
                      <Row>

                        <Col>
                          <div className="form-group">
                            <button type="submit" 
                              onClick={this.updateContent}
                           
                           className="btn btn-primary">Update</button>
                            <button
                              className="btn btn-danger" 
                              onClick={this.removeemployee}
                            >
                              Delete
                            </button>
                          </div>
                        </Col>
                      </Row>
                      {this.state.message&&  <p class="alert alert-success">{this.state.message}</p>}
                    </Container>

                  </Form>
                </Formik>
              </div>
            </div>
         
          </div>
        ) : (
          <div class="column">
            <br />
            <p>Please select an employee...</p>
          </div>
        )}
        <div class="column">
          <div class="card card-container ">
            <div className="comment-number">{'View all ' + currentemployee.comments.length + ' comments in the below'} </div>

            {/* {currentemployee.comments &&
          currentemployee.comments.map((comment, index) => (
          comment.comment ,
           comment.created_at,
           comment.author.fullname
            ))} */}



            {currentemployee.comments && currentemployee.comments.map((val, key) => {
              return (
                <div class="comment-thread">

                  {/* <td>{val.author.fullname + ': ' + val.created_at}</td> */}
                  <div class="comment-info">
                    <p class="comment">Author: {val.author.fullname}
                      <br />
                      Text: {val.comment}
                      <br />
                      Date: {val.created_at}
                    </p>

                  </div>
                </div>

              )
            })}

            <form>
              <div className="form-group">
                <label htmlFor="comment">Leave your comment</label>
                <textarea
                  type="textarea"
                  className="form-control"
                  id="comment"
                  placeholder="Write your comment here"
                  // value={comment}
                  onChange={this.handleChangeComment}
                />
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={this.postComment}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { updateemployee, deleteemployee,addcomment })(withRouter(employee));
