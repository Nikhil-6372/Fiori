sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "com/demo/zn07ui5app/model/models"
], function (UIComponent, JSONModel, models) {
    "use strict";

    return UIComponent.extend("com.demo.zn07ui5app.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init: function () {
            // Call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // Set the device model
            this.setModel(models.createDeviceModel(), "device");

            // Initialize routing
            this.getRouter().initialize();

            // Load Employee JSON model
            this.loadEmployeeModel();
        },

        loadEmployeeModel: function () {
            var oModel = new JSONModel();
            oModel.loadData("model/Employee.json");

            // After data loads, set to view
            oModel.attachRequestCompleted(() => {
                this.setModel(oModel, "empModel");
                console.log("Employee JSON Loaded Successfully ✅");
            });

            oModel.attachRequestFailed(() => {
                console.error("🚫 Failed loading Employee.json");
            });
        }
    });
});
