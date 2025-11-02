sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.demo.zn07ui5app.controller.View2", {
        onInit: function () {
            this.getOwnerComponent()
                .getRouter()
                .getRoute("RouteView2")
                .attachPatternMatched(this.onObjectMatched, this);
        },

        onObjectMatched: function (oEvent) {
            var empId = oEvent.getParameter("arguments").key;
            var oModel = this.getView().getModel("empModel");
            var aData = oModel.getProperty("/EmployeeSet");

            var iIndex = aData.findIndex(emp => emp.Empid === empId);

            if (iIndex !== -1) {
                // ✅ Correct binding path with model name
                this.getView().bindElement({
                    path: "empModel>/EmployeeSet/" + iIndex
                });
            } else {
                sap.m.MessageToast.show("Employee not found: " + empId);
            }
        },

        onBackToView1: function () {
            history.go(-1);
        }
    });
});
