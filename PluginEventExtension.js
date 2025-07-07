sap.ui.define([
    "sap/dm/dme/podfoundation/extension/PluginControllerExtension",
    "sap/ui/core/mvc/OverrideExecution",
    "sap/dm/dme/plugins/headerInformationPlugin/controller/extensions/PluginEventExtensionConstants",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (PluginControllerExtension, OverrideExecution, PluginEventConstants, JSONModel,MessageToast) {
    "use strict";

    return PluginControllerExtension.extend("ritsdmc-az12fc9w.execution.eu20-quality.web.dmc.cloud.sap.customdevplugin.sfcCardExtensionProvider.PluginEventExtension", {
        constructor: function (oExtensionUtilities, oSfcCardUtility) {
            this._oExtensionUtilities = oExtensionUtilities;
            this._oSfcCardUtility = oSfcCardUtility;
        },

        getOverrideExecution: function(sOverrideMember) {
            if (sOverrideMember === PluginEventConstants.ON_SELECTION_CHANGE_EVENT) {
                return OverrideExecution.After;
            } else if (sOverrideMember === PluginEventConstants.ON_QUANTITY_CHANGE_EVENT) {
                return OverrideExecution.After;
            } else if (sOverrideMember === PluginEventConstants.ON_PAGE_CHANGE_EVENT) {
                return OverrideExecution.After;
            } else if (sOverrideMember === PluginEventConstants.REFRESH_HEADER_INFORMATION) {
                return OverrideExecution.After;
            };
            return null;
        },
        
        /**
         * Returns the name of the core extension this overrides
         *
         * @returns {string} core extension name
         * @public
         */
        getExtensionName: function () {
            return PluginEventConstants.EXTENSION_NAME;
        },

        onSelectionChangeEvent: function(oEvent){
            this.updateCustomData();
            this._oExtensionUtilities.logMessage("PluginEventExtension.onSelectionChangeEvent: hi");
        },

        onQuantityChangeEvent: function(oEvent){
            this._oExtensionUtilities.logMessage("PluginEventExtension.onQuantityChangeEvent: hi");
        },

        onPageChangeEvent: function(oEvent){
            this.updateCustomData();
            this._oExtensionUtilities.logMessage("PluginEventExtension.onPageChangeEvent: hi");
        },

        refreshHeaderInformation: function(bInitialLoading){
            this.updateCustomData();
            this._oExtensionUtilities.logMessage("PluginEventExtension.refreshHeaderInformation: bInitialLoading = " + bInitialLoading);
            let oConfigurationData, oData;
            let oConfigurationModel = this.getCoreExtension().getInformationConfigurationModel();
            if (oConfigurationModel) {
                oConfigurationData = oConfigurationModel.getData();
            }
            let oDataModel = this.getCoreExtension().getInformationDataModel();
            if (oDataModel) {
                oData = oDataModel.getData();
            }
        },

        updateCustomData: function(){
            let oController = this.getController();
            if (!oController) {
                return;
            }
            let oPodSelectionModel = oController.getPodSelectionModel();
            if (oPodSelectionModel) {
                let shopOrder = oPodSelectionModel.getSelections()[0].getShopOrder().getShopOrder();
				let currentPlant = oController.getPodController().getUserPlant();
                if (shopOrder) {
					if (!oPodSelectionModel.customData) {
						var sUrl = this.getController().getPublicApiRestDataSourceUri() + '/order/v1/orders';
						var oPayload = {
						  plant: currentPlant,
						  order: shopOrder,
						};
						return new Promise((resolve, reject) => {
						  this.getController().ajaxGetRequest(sUrl, oPayload, resolve, reject);
						}).then(function(oResponse) {
						  if(typeof oResponse !== "undefined"){
							  let customer = oResponse.customer;
							  if(typeof customer === "undefined"){
								  customer = "NA";
							  }
							  oPodSelectionModel.customData = {orderAvailableQty: oResponse.buildQuantity-oResponse.releasedQuantity,orderDoneQty:  oResponse.doneQuantity,customerInfo: customer};
							  console.log(oPodSelectionModel.customData);
							}
						}.bind(this),
						function (oError, sHttpErrorMessage){
							MessageToast.show("Error during Retrieve Order Details API Call : Plant( "+currentPlant+" ) & Shop Order( "+shopOrder+" ).");
						}
						);
					}
                    let oModel = new JSONModel(oPodSelectionModel.customData);
                    oController.getView().setModel(oModel, "customData");
                }
            }
		}
    })
});
