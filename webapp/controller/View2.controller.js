sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.demo.zn07ui5app.controller.View2", {
        onInit: function () {
            this.getOwnerComponent().getRouter().getRoute("RouteView2").attachPatternMatched(this.onPatternMatched, this);
        },

        onObjectMatched: function (oEvent) {
            var empId = oEvent.getParameter("arguments").key;
            this.getView().bindElement({
                path: "/EmployeeSet/" + empId,
                model: "empModel"
            });

            sap.m.MessageToast.show("Navigated with EmpID: " + empId);
        },

        onBackToView1: function () {
            // this.getOwnerComponent().getRouter().navTo("RouteView1")
            history.go(-1)
        }
    });
});