sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "com/demo/zn07ui5app/model/formatter",
    "sap/ui/export/Spreadsheet",
    "sap/ui/model/Filter"
], function (Controller, JSONModel, formatter, Spreadsheet, Filter) {
    "use strict";

    return Controller.extend("com.demo.zn07ui5app.controller.View1", {
        f: formatter,

        onInit: function () {
            var oData = {
                "EmployeeSet": [
                    {
                        "SNo": 1,
                        "Empid": "E001",
                        "Name": "Amit",
                        "Designation": "Developer",
                        "Skill": "UI5",
                        "Email": "amit@example.com",
                        "Phone": "9991112222",
                        "Salary": "50000",
                        "Status": "PERMANENT",
                        "Doj": "2025-10-06T10:00:00"
                    },
                    {
                        "SNo": 2,
                        "Empid": "E002",
                        "Name": "Nikhil",
                        "Designation": "Backend Engineer",
                        "Skill": "Java",
                        "Email": "nikhil@example.com",
                        "Phone": "8887776666",
                        "Salary": "60000",
                        "Status": "CONTRACT",
                        "Doj": "2025-10-16T14:30:00"
                    },
                    {
                        "SNo": 3,
                        "Empid": "E003",
                        "Name": "Rahul",
                        "Designation": "UI Designer",
                        "Skill": "Figma",
                        "Email": "priya@example.com",
                        "Phone": "7775554444",
                        "Salary": "55000",
                        "Status": "PERMANENT",
                        "Doj": "2025-12-24T17:30:00"
                    },
                    {
                        "SNo": 4,
                        "Empid": "E004",
                        "Name": "Roshan",
                        "Designation": "Tester",
                        "Skill": "Selenium",
                        "Email": "ravi@example.com",
                        "Phone": "9993332222",
                        "Salary": "42000",
                        "Status": "CONTRACT",
                        "Doj": "2025-01-02T17:30:00"
                    },
                    {
                        "SNo": 5,
                        "Empid": "E005",
                        "Name": "Sujit",
                        "Designation": "DevOps Engineer",
                        "Skill": "Docker",
                        "Email": "sujit@example.com",
                        "Phone": "6664441111",
                        "Salary": "65000",
                        "Status": "PERMANENT",
                        "Doj": "2025-02-02T17:30:00"
                    }
                ]
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "empModel");
        },

        // onsubmit read function

        onSubmit: function () {
            var oView = this.getView();
            var SelBoxValue = oView.byId("idSelect").getSelectedKey();  
            var ComboBoxValues = oView.byId("idCb").getSelectedKey();   
            var mcbValues = oView.byId("idMcb").getSelectedKeys();       

            alert("Selected: " + SelBoxValue + " | " + ComboBoxValues + " | " + mcbValues);
        },

        // F4Help Functionality

        onPressF4Help: function () {
            if (!this._oDialog) {
                this._oDialog = sap.ui.xmlfragment(
                    this.getView().getId(),
                    "com.demo.zn07ui5app.view.EmpidF4Help",
                    this
                );
                this.getView().addDependent(this._oDialog);
            }
            this._oDialog.open();
        },
         onPressClose: function() {
            this._oDialog.close();
         },

        onPressRowFromF4Help: function (oEvent) {
            var oSelected = oEvent.getSource().getBindingContext("empModel").getObject();
            sap.m.MessageToast.show("Selected: " + oSelected.Name + " (" + oSelected.Empid + ")");
            this.byId("idEmpId").setValue(oSelected.Empid);
            this._oDialog.close();
        },

        //Reset & Clear the Filters By Reset

        onPressReset: function(){
            this.getView().byId("idEmpId").setValue("");
            this.getView().byId("idName").setValue("");
            this.getView().byId("idDesig").setValue("");
            this.getView().byId("idSkill").setValue("");
             this.getView().byId("idTable").getBinding("items").filter([]);
        },

        // Adding the Filters

        onPressGo: function() {
            var aFilters = [];
            var empId = this.getView().byId("idEmpId").getValue();
            var name = this.getView().byId("idName").getValue();
            var desig = this.getView().byId("idDesig").getValue();
            var skill = this.getView().byId("idSkill").getValue();
            if (empId !== "" ){
                aFilters.push(new Filter("Empid", "EQ", empId));
            }
            if (name !== "" ){
                aFilters.push(new Filter("Name", "Contains", name));
            } 
            if (desig !== "" ){
                aFilters.push(new Filter("Designation", "Contains", desig));
            }
            if (skill !== "" ){
                aFilters.push(new Filter("Skill", "Contains", skill));
            }   
            this.getView().byId("idTable").getBinding("items").filter(aFilters);
        },

        // Export to Excel

        onExportToXL: function () {
            var aCols = [
                { label: 'S.No', property: 'SNo' },
                { label: 'Employee ID', property: 'Empid' },
                { label: 'Name', property: 'Name' },
                { label: 'Designation', property: 'Designation' },
                { label: 'Skill', property: 'Skill' },
                { label: 'Email', property: 'Email' },
                { label: 'Phone', property: 'Phone' },
                { label: 'Salary', property: 'Salary', type: 'Number', delimiter: true, scale: 2 },
                { label: 'Status', property: 'Status' },
                { label: 'Date of joining', property: 'Doj', type: 'Date', format: 'dd-MM-yyyy' }
            ];

            var oRowBinding = this.getView().byId("idTable").getBinding("items");
            var fileName = "Employees.xlsx";

            var oSettings = {
                workbook: { columns: aCols },
                dataSource: oRowBinding,
                fileName: fileName,
                worker: true
            };

            var oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function () {
                oSheet.destroy();
            });
        }
    });
});
