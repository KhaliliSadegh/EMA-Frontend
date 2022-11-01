import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../slices/message";
import { createbatchemployee } from "../../slices/employees";
import "./upload-batch.css"
export default function CsvReader() {
    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);
    const [csvImportResult, setImportResult] = useState([]);

    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);



    const postcsv = () => {
        if (csvArray.length > 0) {
            setSuccessful(false);
            var value = JSON.stringify(csvArray);
            dispatch(createbatchemployee({ value }))
                .unwrap()
                .then((data) => {
                    setImportResult(data.data)
                    setSuccessful(true);
                })
                .catch((e) => {
                    setImportResult({success:0,failed:csvArray.length})
                    setSuccessful(true);
                });
        }
    };



    const processCSV = (str, delim = ';') => {
        const headers = str.slice(0, str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n') + 1).split('\n');
        console.log('EEE' + rows.length)
        const newArray = rows.map(row => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header.toString().replace(/\r?\n|\r/g, "")] = values[i]?.toString().replace(/\r?\n|\r/g, "") || '';
                console.log(values[i])
                return obj;
            }, {})
            return eachObject;
        })
        clearMessage()
        setImportResult(null)
        setCsvArray(newArray)
    }

    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function (e) {
            const text = e.target.result;
            console.log(text);
            processCSV(text)
        }
        setSuccessful(false)
        reader.readAsText(file, "ISO-8859-15");
    }


    return (
        <div class="card card-container">
        <form id='csv-form'>
            {/* <input
                type='file'
                accept='.csv'
                id='csvFile' hidden
                
            >
            </input>

<label for="csvFile">Choose File</label> */}




<label for="csvFile" class="drop-container">
  <span class="drop-title">Drop files here</span>
  or
  <input type="file" id='csvFile' accept=".csv" onChange={(e) => {
                    setCsvFile(e.target.files[0]);

                }} required/>
</label>


            <br />
            <button class="btn btn-primary"
                onClick={(e) => {
                    e.preventDefault()
                    if (csvFile) submit()
                }}
            >
                Preview
            </button>
            <br />
            <br />
            {csvArray.length > 0 ?
                <>
                    Total Rows in the CSV files is:  {csvArray.length}

                    {/* <table>
                        <thead>
                            <th>Nachname</th>
                            <th>Vorname</th>
                            <th>Strasse</th>
                            <th>Nr</th>
                            <th>PLZ</th>
                            <th>Ort</th>
                            <th>Land</th>
                            <th>Rolle</th>
                        </thead>
                        <tbody>
                            {
                                csvArray.map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.Nachname}</td>
                                        <td>{item.Vorname}</td>
                                        <td>{item.Strasse}</td>
                                        <td>{item.Nr}</td>
                                        <td>{item.PLZ}</td>
                                        <td>{item.Ort}</td>
                                        <td>{item.Land}</td>
                                        <td>{item.Rolle}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table> */}

                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th className="text-center">#</th>
                          <th className="text-center">Vorname</th>
                          <th className="text-center">Nachname</th>
                          <th className="text-center">Strasse</th>
                          <th className="text-center">Nr</th>
                          <th className="text-center">PLZ</th>
                          <th className="text-center">Ort</th>
                          <th className="text-center">Land</th>
                          <th className="text-center">Rolle</th>


                        </tr>
                      </thead>
                      <tbody>

                        {csvArray &&
                          csvArray.map((employee, index) => (
                            <EmployeeItem key={index} employee={employee} index={index} />
                          ))}
                      </tbody>
                    </table>


                    {!successful ?
                        <>  <button class="btn btn-primary"
                            onClick={(e) => {
                                e.preventDefault()
                                if (csvFile) postcsv()
                            }}
                        >
                            Import all as new employees
                        </button>
                        </> : csvImportResult &&
                        <p>{csvImportResult.failed + ' Rows not inserted/encountered errors  ' } <br/> { csvImportResult.success + ' Rows Inserted Successfuly'}</p>


                    } </> : null}
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
        </form>
        </div>
    );

}

function EmployeeItem({ employee, index, setActiveemployee }) {


    return (
      <tr>
        <td className="col_order text-center">{index + 1}</td>
        <td className="col_name">
          {employee.Vorname}
          {/* (id={employee._id}) */}
        </td>
        <td className="col_name">
          {employee.Nachname}
        </td>
        <td className="col_name">
          {employee.Strasse}
        </td>
        <td className="col_name">
          {employee.Nr}
        </td>
        <td className="col_name">
          {employee.PLZ}
        </td>
        <td className="col_name">
          {employee.Ort}
        </td>
        <td className="col_name">
          {employee.Land}
        </td>
        <td className="col_name">
          {employee.Rolle}
        </td>
      </tr>
    );
  }