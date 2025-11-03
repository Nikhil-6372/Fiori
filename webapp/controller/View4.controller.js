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

        onBackToView1: function () {
            history.go(-1);
        }
    });
});
