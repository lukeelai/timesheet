import React, { Component } from "react";
import BootstrapTable, { TableHeaderColumn } from "react-bootstrap-table-next";

const cellEditProp = {
  mode: "click",
  blurToSave: true
};

class Timesheet extends Component {
  times = [
    {
      id: 1,
      name: "Luke",
      date: "Jan 01",
      minutes: 120,
      desp: "Code",
      total: this.handleTotal,
      rate: 10,
      cost: 1200
    }
  ];

  render() {
    return (
      <BootstrapTable
        data={this.times}
        cellEdit={cellEditProp}
        insertRow={true}
      >
        <TableHeaderColumn dataFiield="id" isKey={true}>
          {" "}
          ID{" "}
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name" editable={true}>
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="date">Date</TableHeaderColumn>
        <TableHeaderColumn dataField="minutes">
          Time (Minutes)
        </TableHeaderColumn>
        <TableHeaderColumn dataField="desp">Description</TableHeaderColumn>
        <TableHeaderColumn dataField="total" editable={false}>
          Total Time
        </TableHeaderColumn>
        <TableHeaderColumn dataField="rate">Rate</TableHeaderColumn>
        <TableHeaderColumn dataField="cost" editable={false}>
          Total Cost
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default Timesheet;
