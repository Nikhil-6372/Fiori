sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/demo/zn07ui5app/model/formatter",
    "sap/m/MessageBox"
], function (Controller, formatter, MessageBox) {
    "use strict";

    return Controller.extend("com.demo.zn07ui5app.controller.View4", {
        formatter: formatter,

        onInit: function () {
            // initialization if needed
        },
        onBackToView1: function () { 
            history.go(-1); 
        }
    });
});
