sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/demo/zn07ui5app/model/formatter",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, formatter, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("com.demo.zn07ui5app.controller.View4", {

        onInit: function () {
            this.getOwnerComponent().getRouter()
                .getRoute("RouteView4")
                .attachPatternMatched(this.onObjectMatched, this);
        },

        onObjectMatched: function (oEvent) {
            var empId = oEvent.getParameter("arguments").key;
            var oModel = this.getOwnerComponent().getModel("empModel");

            var aData = oModel.getProperty("/EmployeeSet");
            if (!aData) {
                MessageToast.show("Employee data not loaded!");
                return;
            }

            var empIndex = -1;
            for (var i = 0; i < aData.length; i++) {
                if (aData[i].Empid === empId) {
                    empIndex = i;
                    break;
                }
            }

            if (empIndex !== -1) {
                this.empIndex = empIndex; // ✅ store index for update
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
            var oModel = this.getOwnerComponent().getModel("empModel");
            var aData = oModel.getProperty("/EmployeeSet");

            // ✅ Prepare updated data
            var updated = {
                Empid: oView.byId("idEmp").getValue(),
                Name: oView.byId("idName").getValue(),
                Designation: oView.byId("idDesig").getValue(),
                Skill: oView.byId("idSkill").getValue(),
                Email: oView.byId("idEmail").getValue(),
                Phone: oView.byId("idPhone").getValue(),
                Salary: oView.byId("idSalary").getValue(),
                Status: oView.byId("idStatus").getValue()
            };

            // ✅ FIX: Replace existing record instead of push()
            aData[this.empIndex] = updated;

            // ✅ Update model
            oModel.setProperty("/EmployeeSet", aData);

            MessageBox.success("Employee updated successfully!");
        },

        onBackToView1: function () {
            history.go(-1);
        }
    });
});
