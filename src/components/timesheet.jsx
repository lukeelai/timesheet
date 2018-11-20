import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import bootstrapTable from "react-bootstrap-table-next/lib/src/bootstrap-table";

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
      <div className="container" style={{ marginTop: 50 }}>
        <BootstrapTable
          striped
          hover
          keyField="id"
          data={this.times}
          columns={this.columns}
        />
      </div>
    );
  }
}

export default Timesheet;
