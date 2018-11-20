import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import axios from "axios";

class Timesheet extends Component {
  state = {
    times: []
  };

  onSelectAll = isSelected => {
    if (isSelected) {
      return this.state.times.map(row => row.id);
    } else {
      return [];
    }
  };

  componentDidMount() {
    axios.get("http://localhost:4000/data").then(response => {
      this.setState({
        times: response.data
      });
    });
  }

  render() {
    const selectRowProp = {
      mode: "checkbox",
      clickToSelect: true,
      onSelectAll: this.onSelectAll
    };

    return (
      <div>
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
          <TableHeaderColumn isKey dataField="id">
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
            dataField="minutes"
            editable={{ type: "textarea", validator: rateValidator }}
          >
            Time Worked (minutes)
          </TableHeaderColumn>
          <TableHeaderColumn dataField="desp">Description</TableHeaderColumn>
          <TableHeaderColumn dataField="total" hiddenOnInsert>
            Total Time Worked
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="rate"
            editable={{ type: "textarea", validator: rateValidator }}
          >
            Rate
          </TableHeaderColumn>
          <TableHeaderColumn dataField="cost" hiddenOnInsert defaultValue>
            Cost
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

function dateFormatter(cell, row) {
  return `${("0" + cell.getDate()).slice(-2)}/${(
    "0" +
    (cell.getMonth() + 1)
  ).slice(-2)}/${cell.getFullYear()}`;
}

function afterSave(row, cell, value) {
  row["total"] = row["minutes"] / 60;
  row["cost"] = row["rate"] * row["total"];
}

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

function rateValidator(value, row) {
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
    response.notification.msg = "Value can't have numbers";
    response.notification.title = "Invalid Value";
  }
  return response;
}

const options = {
  afterInsertRow: afterSave,
  insertText: "Insert",
  deleteText: "Delete",
  saveText: "Save",
  closeText: "Close"
};

const cellEditProp = {
  mode: "dbclick",
  blurToSave: true,
  afterSaveCell: afterSave
};

export default Timesheet;
