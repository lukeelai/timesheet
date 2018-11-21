import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import axios from "axios";
import PropTypes from "prop-types";

class Timesheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: []
    };
  }

  // select all check box
  onSelectAll = isSelected => {
    if (isSelected) {
      return this.state.times.map(row => row.id);
    } else {
      return [];
    }
  };

  // getTableResult = () => {
  //   this.refs.getTableDataIgnorePaging();
  //   console.log(this.refs.getTableDataIgnorePaging());
  // };

  // get data base file from local host
  componentDidMount() {
    axios.get("http://localhost:4000/data").then(response => {
      this.setState({
        times: response.data
      });

      for (let i = 0; i < response.data.length; i++) {
        dataTable[i] = response.data[i];
      }
      for (let i = 0; i < dataTable.length; i++) {
        if (dataTable[i].name in nameMap) {
          nameMap[dataTable[i].name] += dataTable[i].hours;
          counter++;
        } else {
          nameMap[dataTable[i].name] = dataTable[i].hours;
          counter++;
        }
      }
    });
  }

  // update json file and table if changes were made
  // componentDidUpdate() {
  //   axios.post("http://localhost:4000/data").then(response => {
  //     console.log(response.data);
  //   });
  // }

  //checkboxes to select rows to delete
  render() {
    const selectRowProp = {
      mode: "checkbox",
      clickToSelect: true,
      onSelectAll: this.onSelectAll
    };

    return (
      <div>
        {/* table styling/comamands */}
        <BootstrapTable
          data={this.state.times}
          striped
          hover
          selectRow={selectRowProp}
          pagination
          options={options}
          insertRow
          deleteRow
          cellEdit={cellEditProp}
        >
          <TableHeaderColumn
            isKey
            dataField="id"
            autoValue={true}
            hiddenOnInsert
            editable={false}
          >
            ID
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="name"
            filter={{ type: "TextFilter" }}
            editable={{ type: "textarea", validator: nameValidator }}
          >
            Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="date"
            editable={{ type: "date" }}
            format={dateFormatter}
          >
            Date
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="hours"
            editable={{ type: "textarea", validator: numValidator }}
          >
            Time Worked (hours)
          </TableHeaderColumn>
          <TableHeaderColumn dataField="desp">Description</TableHeaderColumn>
          <TableHeaderColumn
            dataField="totalTime"
            hiddenOnInsert
            editable={false}
          >
            Total Time Worked
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="rate"
            editable={{ type: "textarea", validator: numValidator }}
          >
            Rate
          </TableHeaderColumn>
          <TableHeaderColumn dataField="cost" hiddenOnInsert editable={false}>
            Cost
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

let dataTable = [];
let nameMap = {};
let counter = 0;

//get and save table values
function getTable() {
  axios.get("http://localhost:4000/data").then(response => {
    for (let i = 0; i < response.data.length; i++) {
      dataTable[i] = response.data[i];
    }
  });
}

//update table after insert
// Timesheet.propTypes = {};

// function setTable() {
//   axios.post("http://localhost:4000/data").then(response => {
//     console.log(dataTable);
//     response.data = dataTable;
//     for (let i = dataTable.length; i <= response.data.length; i++) {
//       //response.data[dataTable.length] = dataTable[dataTable.length];
//     }
//   });
// }

//delete row from json file when row is deleted
function deleteTable() {
  axios.delete("http://localhost:4000/data").then(response => {
    console.log(response);
    console.log(response.data);
  });
}

function dateFormatter(cell, row) {
  return `${("0" + cell.getDate()).slice(-2)}/${(
    "0" +
    (cell.getMonth() + 1)
  ).slice(-2)}/${cell.getFullYear()}`;
}

//do this after inserting row/editing row
function afterSave(row, table) {
  getTable();
  //setTable();
  //setTimeout(getTotalTime(), 100);
  setTimeout(setValues(row), 10000);
  console.log(dataTable);
}

//change values based on total time and cost
function setValues(row) {
  row["cost"] = row["rate"] * row["totalTime"];
  row["totalTime"] = nameMap[row["name"]];
  console.log(row["cost"]);
  console.log(row["totalTime"]);
}

//ensures name doesnt contain numbers
function nameValidator(value, row) {
  const response = {
    isValid: true,
    notification: { type: "success", msg: "", title: "" }
  };
  if (!value) {
    response.isValid = false;
    response.notification.type = "error";
    response.notification.msg = "Value must be inserted";
    response.notification.title = "Requested Value";
  } else if (/\d/.test(value)) {
    response.isValid = false;
    response.notification.type = "error";
    response.notification.msg = "Value can't have numbers";
    response.notification.title = "Invalid Value";
  }
  return response;
}

//ensure rate can only be numbers
function numValidator(value, row) {
  const response = {
    isValid: true,
    notification: { type: "success", msg: "", title: "" }
  };
  if (!value) {
    response.isValid = false;
    response.notification.type = "error";
    response.notification.msg = "Value must be inserted";
    response.notification.title = "Requested Value";
  } else if (!/^\d+$/.test(value)) {
    response.isValid = false;
    response.notification.type = "error";
    response.notification.msg = "Value can't have letters";
    response.notification.title = "Invalid Value";
  }
  return response;
}

//what to do after changes
const options = {
  afterInsertRow: afterSave,
  //afterDeleteRow: deleteTable,
  insertText: "Insert",
  deleteText: "Delete",
  saveText: "Save",
  closeText: "Close"
};

//allows users to edit cells by double clicking
const cellEditProp = {
  mode: "dbclick",
  blurToSave: true,
  afterSaveCell: afterSave
};

export default Timesheet;
