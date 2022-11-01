import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveemployees,
  findemployeesByTitle,
  deleteAllemployees,
} from "../../slices/employees";
import { Link } from "react-router-dom";
import Pagination from "../Tool/Pagination";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class employeesList extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    // this.removeAllemployees = this.removeAllemployees.bind(this);

    this.state = {
      currentemployee: null,
      currentIndex: -1,
      totalRecords: "",
      totalPages: "",
      pageLimit: "",
      currentPage: "",
      startIndex: "",
      endIndex: ""
    };
  }



  componentDidMount() {
    this.props.retrieveemployees();
    this.setState({
      totalRecords: this.props.employees.length
    });
  }


  
  onChangePage = data => {
    this.setState({
      pageLimit: data.pageLimit,
      totalPages: data.totalPages,
      currentPage: data.page,
      startIndex: data.startIndex,
      endIndex: data.endIndex
    });
  };
  refreshData() {
    this.setState({
      currentemployee: null,
      currentIndex: -1,
    });
  }


  // removeAllemployees() {
    
  //   this.props
  //     .deleteAllemployees()
  //     .then((response) => {
  //       console.log(response);
  //       this.refreshData();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  findByTitle() {
    this.refreshData();

    this.props.findemployeesByTitle({ title: this.state.searchTitle });
  }

  render() {
    const { employees } = this.props;
    var {
      totalPages,
      currentPage,
      pageLimit,
      startIndex,
      endIndex
    } = this.state;
   
    const setActiveemployee = (employee, index) => {
      this.setState({
        currentemployee: employee,
        currentIndex: index,
      });
    }
    return (
      <div className="card">

        <div className="card-header">
          <h4>Employees List</h4>
        </div>
        <div className="card-body">
          <ul className="card-body">

            <div className="section product_list_mng">
              <div className="container-fluid">
                <div className="box_product_control mb-15">
                  <div className="row">

                    <div className="col dropdown">
                    Display
                       <select
                        className="btn btn-primary dropdown-toggle"
                        value={pageLimit}
                        onChange={e =>
                          this.setState({ pageLimit: parseInt(e.target.value) })
                        }
                      >
                        
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>
                    {/* Its dangerous so I've comment out this */}
                    {/* <div className="col">
                      <button
                        className="btn btn-outline-danger right"
                        onClick={this.removeAllemployees}
                      >
                        Remove All
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="box_tbl_list">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">First Name</th>
                        <th className="text-center">Last Name</th>
                        <th className="text-center">User name</th>
                        <th className="text-center">Ort</th>
                        <th className="text-center">PLZ</th>
                        <th className="text-center">Country</th>
                        <th className="text-center">Position</th>
                      </tr>
                    </thead>
                    <tbody>

                      {employees &&
                        employees.slice(startIndex, endIndex + 1).map((employee, index) => (
                          <ProductItem key={index} employee={employee} index={index} setActiveemployee={setActiveemployee} />
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="">
                  <div className="row">
                    <div className="col">
                      <p>
                        {employees.length} Employees | Page  {currentPage}/{totalPages}
                      </p>
                    </div>
                    <div className="col">
                      <Pagination
                        totalRecords={employees.length}
                        pageLimit={pageLimit || 5}
                        initialPage={1}
                        pagesToShow={5}
                        onChangePage={this.onChangePage}
                      />

                    </div>
                  </div>
                </div>
              </div>
            </div>



          </ul>

        </div>

      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
  };
};

function ProductItem({ employee, index, setActiveemployee }) {


  return (
    <tr onClick={() => setActiveemployee(employee, index)}>
      <td className="col_order text-center">{index + 1}</td>
      <td className="col_name">
        {employee.firstname}
        {/* (id={employee._id}) */}
      </td>
      <td className="col_name">
        {employee.lastname}
      </td>
      <td className="col_name">
        {employee.username}
      </td>
      <td className="col_name">
        {employee.ort}
      </td>
      <td className="col_name">
        {employee.plz}
      </td>
      <td className="col_name">
        {employee.country}
      </td>
      <td className="col_name">
        {employee.position}
      </td>
      <Link to={"/employees/" + employee._id} className="badge badge-warning">
        See Details/Edit
      </Link>
    </tr>
  );
}

export default connect(mapStateToProps, {
  retrieveemployees,
  findemployeesByTitle,
  deleteAllemployees,
})(employeesList);
