sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "com/demo/zn07ui5app/model/models",
    "sap/ui/export/Spreadsheet"
], function (UIComponent, JSONModel, models, Spreadsheet) {
    "use strict";

    return UIComponent.extend("com.demo.zn07ui5app.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
            this.setModel(models.createDeviceModel(), "device");
            this.getRouter().initialize();
            this.loadEmployeeModel();
        },

        loadEmployeeModel: function () {
            var oModel = new JSONModel();
            oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
            oModel.loadData("model/Employee.json");

            oModel.attachRequestCompleted(() => {
                let data = oModel.getData();

                data.EmployeeSet.forEach(emp => {
                    emp.Salary = Number(emp.Salary);
                });

                oModel.setData(data);

                this.setModel(oModel, "empModel");
                console.log("Employee JSON Loaded Successfully ✅");
            });

            oModel.attachRequestFailed(() => {
                console.error("🚫 Failed loading Employee.json");
            });
        }
    });
});
