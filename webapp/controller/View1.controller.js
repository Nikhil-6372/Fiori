sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "com/demo/zn07ui5app/model/formatter"
], function (UIComponent, JSONModel, formatter) {
    "use strict";

    return UIComponent.extend("com.demo.zn07ui5app.Component", {
        metadata: {
            manifest: "json"
        },
        f: formatter,  

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);

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
                        "Status": "PERMINANT",
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
                        "Status": "PERMINANT",
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
                        "Status": "PERMINANT",
                        "Doj": "2025-02-02T17:30:00"
                    }
                ]
            };

            var oModel = new JSONModel(oData);
            this.setModel(oModel, "empModel");
        },

        onSubmit: function () {
            var SelBoxValue = this.getRootControl().byId("idSelect").getSelectedKey();  
            var ComboBoxValues = this.getRootControl().byId("idCb").getSelectedKey();   
            var mcbValues = this.getRootControl().byId("idMcb").getSelectedKeys();       

            alert("Selected: " + SelBoxValue + " | " + ComboBoxValues + " | " + mcbValues);
        }
    });
});
