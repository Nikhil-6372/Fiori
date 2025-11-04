sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/demo/zn07ui5app/model/formatter",
    "sap/m/MessageToast"
], function (Controller, formatter, MessageToast) {
    "use strict";

    return Controller.extend("com.demo.zn07ui5app.controller.View4", {
        formatter: formatter,

        onInit: function () {
            this.getOwnerComponent().getRouter()
                .getRoute("RouteView4")
                .attachPatternMatched(this.onObjectMatched, this);
        },

        onObjectMatched: function (oEvent) {
            var empId = oEvent.getParameter("arguments").key;
            var oModel = this.getOwnerComponent().getModel("empModel");

            // get JSON array
            var aData = oModel.getProperty("/EmployeeSet");
            if (!aData) {
                MessageToast.show("Employee data not loaded!");
                return;
            }

            // find matching employee
            var empIndex = aData.findIndex(emp => emp.Empid === empId);
            if (empIndex !== -1) {
                // rebind model to view and path correctly
                this.getView().setModel(oModel, "empModel");
                this.getView().bindElement({
                    model: "empModel",
                    path: "/EmployeeSet/" + empIndex
                });
            } else {
                MessageToast.show("Employee not found: " + empId);
            }
        },

         onPressUpdate: function () {
            var oView = this.getView();
            var oModel = this.getOwnerComponent().getModel("empModel"); // JSON model

            var data = {
                Empid: oView.byId("idEmp").getValue(),
                Name: oView.byId("idName").getValue(),
                Designation: oView.byId("idDesig").getValue(),
                Skill: oView.byId("idSkill").getValue(),
                Email: oView.byId("idEmail").getValue(),
                Phone: oView.byId("idPhone").getValue(),
                Salary: oView.byId("idSalary").getValue(),
                Status: oView.byId("idStatus").getValue()
                // Doj: formatter.formatDateForCreateNUpdate(oView.byId("idDoj").getValue())
            };

            // ✅ Get existing data and update model
            var aData = oModel.getProperty("/EmployeeSet") || [];
            aData.push(data);
            oModel.setProperty("/EmployeeSet", aData);

            MessageBox.success("Employee updated successfully!");

            // Optional: Clear form fields
            oView.byId("idEmp").setValue("");
            oView.byId("idName").setValue("");
            oView.byId("idDesig").setValue("");
            oView.byId("idSkill").setValue("");
            oView.byId("idEmail").setValue("");
            oView.byId("idPhone").setValue("");
            oView.byId("idSalary").setValue("");
            oView.byId("idStatus").setValue("");
        },


        onBackToView1: function () {
            history.go(-1);
        }
    });
});
