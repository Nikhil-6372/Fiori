sap.ui.define([
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/format/NumberFormat" 
], function (DateFormat, NumberFormat) {
    "use strict";

    return {

        formatDate: function (Doj) {

            if (!Doj) { return ""; }

            if (typeof Doj === "string") {
                Doj = new Date(Doj);
            }

            var oDateFormatter = DateFormat.getDateTimeInstance({
                pattern: "dd-MM-yyyy"
            });

            return oDateFormatter.format(Doj);
        },

        colorStatus: function (Status) {
            if (Status === "PERMINANT") {
                return "Success";
            } else if (Status === "CONTRACT") {
                return "Error";
            } else {
                return "Warning";
            }
        },

        formatSalary: function (Salary) {
            if (!Salary) { return ""; }

            var oCurrencyFormatter = NumberFormat.getCurrencyInstance({
                showMeasure: false,
                pattern: "#,##,##0.00"
            });

            return "₹ " + oCurrencyFormatter.format(Salary);
        },
        colorSkill: function(Skill){
            if (Skill === "UI5") {
                return "Success";
            }else if (Skill === "Java") {
                return "Error";
            }else {
                return "Warning";
            }
        }
    };
});
