sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "com/demo/zn07ui5app/model/formatter",
    "sap/ui/export/Spreadsheet",
    "sap/ui/model/Filter",
    "sap/ui/model/Sorter",
    "sap/m/MessageBox"
], function (Controller, JSONModel, formatter, Spreadsheet, Filter, Sorter, MessageBox) {
    "use strict";

    return Controller.extend("com.demo.zn07ui5app.controller.View1", {
        f: formatter,

        onInit: function () {

            this.mGroupFunctions = {
                Designation: function (oContext) {
                    var desig = oContext.getProperty("Designation");
                    return {
                        key: desig,
                        text: desig
                    };
                },
                Skill: function (oContext) {
                    var skill = oContext.getProperty("Skill");
                    return {
                        key: skill,
                        text: skill
                    };
                }
            }
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
                        "Doj": "2020-10-06T10:00:00"
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
                        "Doj": "2022-10-16T14:30:00"
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
                        "Doj": "2023-12-24T17:30:00"
                    },
                    {
                        "SNo": 4,
                        "Empid": "E004",
                        "Name": "Roshan",
                        "Designation": "Developer",
                        "Skill": "UI5",
                        "Email": "rosh@example.com",
                        "Phone": "9993332222",
                        "Salary": "42000",
                        "Status": "CONTRACT",
                        "Doj": "2018-01-02T17:30:00"
                    },
                    {
                        "SNo": 5,
                        "Empid": "E005",
                        "Name": "Sujit",
                        "Designation": "Selenium Developer",
                        "Skill": "Selenium",
                        "Email": "sujit@example.com",
                        "Phone": "6664441111",
                        "Salary": "65000",
                        "Status": "PERMANENT",
                        "Doj": "2025-02-02T17:30:00"
                    },
                    {
                        "SNo": 6,
                        "Empid": "E006",
                        "Name": "Stuart",
                        "Designation": "Selenium Developer",
                        "Skill": "Selenium",
                        "Email": "stuart@example.com",
                        "Phone": "6454441111",
                        "Salary": "70000",
                        "Status": "PERMANENT",
                        "Doj": "2025-02-02T17:30:00"
                    }
                ]
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "empModel");
        },
        onPress: function () {
            this.getOwnerComponent().getRouter().navTo("RouteView2");
        },

        // onsubmit read function

        onSubmit: function () {
            var oView = this.getView();
            var SelBoxValue = oView.byId("idSelect").getSelectedKey();
            var ComboBoxValues = oView.byId("idCb").getSelectedKey();
            var mcbValues = oView.byId("idMcb").getSelectedKeys();

            alert("Selected: " + SelBoxValue + " | " + ComboBoxValues + " | " + mcbValues);
        },

        //Reading table row onclick

        onPressRow: function (oEvent) {
            var oSelected = oEvent.getSource().getBindingContext("empModel").getObject();
            var empId = oSelected.Empid; // or any unique key

            this.getOwnerComponent().getRouter().navTo("RouteView2", {
                key: empId
            });
        },

        //Create New Employee

        onCreate: function () {
            this.getOwnerComponent().getRouter().navTo("RouteView3");
        },


        onEdit: function () {
            var oTable = this.getView().byId("idTable");
            var selItem = oTable.getSelectedItem();

            if (!selItem) {
                sap.m.MessageBox.error("Select the Employee first");
                return;
            }

            // 👇 if your table binding uses empModel>/EmployeeSet
            var oContext = selItem.getBindingContext("empModel");
            if (!oContext) {
                sap.m.MessageBox.error("Binding context not found for selected item");
                return;
            }

            var empId = oContext.getProperty("Empid");

            this.getOwnerComponent().getRouter().navTo("RouteView4", {
                key: empId
            });
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
        onPressClose: function () {
            this._oDialog.close();
        },

        onPressRowFromF4Help: function (oEvent) {
            var oSelected = oEvent.getSource().getBindingContext("empModel").getObject();
            sap.m.MessageToast.show("Selected: " + oSelected.Name + " (" + oSelected.Empid + ")");
            this.byId("idEmpId").setValue(oSelected.Empid);
            this._oDialog.close();
        },

        //Reset & Clear the Filters By Reset

        onPressReset: function () {
            this.getView().byId("idEmpId").setValue("");
            this.getView().byId("idName").setValue("");
            this.getView().byId("idDesig").setValue("");
            this.getView().byId("idSkill").setValue("");
            this.getView().byId("idOpr").setValue("");
            this.getView().byId("idSalary").setValue("");
            this.getView().byId("idSortField").setSelectedKey("");
            this.getView().byId("idSortOrder").setSelectedIndex(-1);
            this.getView().byId("idGroupField").setSelectedKey("");
            this.getView().byId("idGroupOrder").setSelectedIndex(-1);

            this.getView().byId("idTable").getBinding("items").filter([]);
            this.getView().byId("idTable").getBinding("items").sort([]);


        },

        // Adding the Filters

        onPressGo: function () {
            var aFilters = [];
            var empId = this.getView().byId("idEmpId").getValue();
            var name = this.getView().byId("idName").getValue();
            var desig = this.getView().byId("idDesig").getValue();
            var skill = this.getView().byId("idSkill").getSelectedKey();
            // var desig = this.getView().byId("idDoj").getValue();

            // only for salary filter no need to add this if i dont want
            var salOpr = this.getView().byId("idOpr").getSelectedKey();
            var salary = this.getView().byId("idSalary").getValue();

            //  filter for date  (a little tricky , here it shows one day before data to not match with the frontend date filter
            // So it have the connection with the formatter we need to pass the date format which match to the odata format like(yyyy-MM-dd)

            // var doj = this.getView().byId("idDoj").getDateValue();
            // doj = formatter.formatDateForFiltering(doj);



            if (empId !== "") {
                aFilters.push(new Filter("Empid", "EQ", empId));
            }
            if (name !== "") {
                aFilters.push(new Filter("Name", "Contains", name));
            }
            if (desig !== "") {
                aFilters.push(new Filter("Designation", "Contains", desig));
            }
            if (skill !== "") {
                aFilters.push(new Filter("Skill", "Contains", skill));
            }
            if (salOpr !== "" && salary !== "") {
                aFilters.push(new Filter("Salary", salOpr, salary));
            }
            // if (doj!=="") {
            //     aFilters.push(new Filter("Doj","EQ",doj));
            // }

            //Sorting goes here


            var aSorters = [];
            var groupField = this.getView().byId("idGroupField").getSelectedKey();
            var groupOrder = this.getView().byId("idGroupOrder").getSelectedIndex();
            var vGroupFn = this.mGroupFunctions[groupField];

            if (groupField && groupOrder >= 0) {
                aSorters.push(new Sorter(groupField, (groupOrder === 0) ? false : true, vGroupFn));
            }


            var sortField = this.getView().byId("idSortField").getSelectedKey();
            var sortOrder = this.getView().byId("idSortOrder").getSelectedIndex();


            if (sortField && sortOrder >= 0) {
                aSorters.push(new Sorter(sortField, sortOrder === 1));
            }
            this.getView().byId("idTable").getBinding("items").filter(aFilters);
            this.getView().byId("idTable").getBinding("items").sort(aSorters);

            //  if (name === "") {
            //     this.getView().byId("idEmpId").setValueState("Error");
            //     this.getView().byId("idEmpId").setValueStateText("Employee ID is mandatory");
            // } else {
            //     this.getView().byId("idEmpId").setValueState("None");
            //     var nameRegExp = /^[0-8]+$/;
            //     if (!empId.match(empIdRegExp)) {
            //         this.getView().byId("idEmpId").setValueState("Error");
            //         this.getView().byId("idEmpId").setValueStateText("Employee ID must contain only Numbers");
            //     }
            // }
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
