sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/demo/zn07ui5app/model/formatter",
    "sap/m/MessageBox"
], function (Controller, formatter, MessageBox) {
    "use strict";

    return Controller.extend("com.demo.zn07ui5app.controller.View3", {
        formatter: formatter,

        onInit: function () {
            // initialization if needed
        },

        onPressSave: function () {
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

            MessageBox.success("Employee created successfully!");

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

        onPressCancel: function () {
            MessageBox.information("Action cancelled by user.");
        },

        onBackToView1: function () { 
            history.go(-1); 
        }
    });
});
