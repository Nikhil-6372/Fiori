sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("com.demo.zn07ui5app.controller.View5", {
    onInit: function () {
      const oModel = this.getOwnerComponent().getModel("empModel");
      this.getView().setModel(oModel, "empModel");

      var oVizFrame = this.getView().byId("idVizFrame"); // <-- Move this UP first
      oModel.refresh(true); // Refresh actual model (not VizFrame model)

      oVizFrame.setVizProperties({
        plotArea: {
          dataLabel: {
            visible: true,
            type: "value"
          }
        },
        title: {
          visible: true,
          text: "Employee VS Salary"
        },
        valueAxis: {
          visible: true,
          title: {
            text: "Employee Salary"
          }
        },
        categoryAxis: {
          visible: true,
          title: {
            text: "Employee Name/ID"
          }
        }
      });
    },

    onChangeChartType: function () {
      var chartType = this.getView().byId("idChartType").getSelectedKey();
      this.getView().byId("idVizFrame").setVizType(chartType);
    },

    onBackToView1: function () {
      history.go(-1);
    }
  });
});
