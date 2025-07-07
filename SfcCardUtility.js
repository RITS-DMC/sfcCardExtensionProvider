sap.ui.define([
    "sap/ui/base/Object",
    "sap/m/Button",
    "sap/m/Label",
    "sap/m/MessageToast",
    "sap/ui/layout/VerticalLayout"
], function (BaseObject, Button, Label, MessageToast, VerticalLayout) {
    "use strict";
    return BaseObject.extend("ritsdmc-az12fc9w.execution.eu20-quality.web.dmc.cloud.sap.customdevplugin.sfcCardExtensionProvider.SfcCardUtility", {
        constructor: function () {
        },

        setPluginEventExtension: function(oExtension){
            this.oPluginEventExtension = oExtension;
        },

        getPluginEventExtension: function(){
            return this.oPluginEventExtension;
        },

        getCoreExtension: function(){
            return this.oPluginEventExtension.getCoreExtension();
        },

        getController: function(){
            return this.getPluginEventExtension().getController();
        },

        getConfigurationValue: function(sProperty){
            let oController = this.getController();
            if (!oController) {
                return null;
            }
            return oController.getConfigurationValue(sProperty);
        },

        loadHeaderInformation: function(bShowHelp, bShowSupplier){
            let oInformationContainer = this.getCoreExtension().getPluginInformationContainer();
            let oToolbarContainer = this.getCoreExtension().getPluginToolbar();
            
            // Multiple SFC Card's can be defined, but only one extension, so
            // this will make sure new controls are created and added to the current displayed
            // SFC Card plugin
            if (!this.oChildControls) {
                this.oChildControls = {};
            }
            if (bShowHelp) {
                let oActionButton = null;
                if (oToolbarContainer && this.oChildControls[oToolbarContainer.getId()]) {
                    oActionButton = this.oChildControls[oToolbarContainer.getId()];
                }
                if (oToolbarContainer && !oActionButton) {
                    this.addActionButton(oToolbarContainer);
                }
            }
            if (bShowSupplier) {
                let oInformationControl = null;
                if (oInformationContainer && this.oChildControls[oInformationContainer.getId()]) {
                    oInformationControl = this.oChildControls[oInformationContainer.getId()];
                }
                if (oInformationContainer && !oInformationControl) {
                    this.addInformationControls(oInformationContainer);
                }
            }
        },

        addActionButton: function(oToolbar) {
            let that = this;
            let oActionButton = new Button({
                type: "Emphasized",
                text: "Help",
                press: [that.onHelpPress, that]
            });
            if (oToolbar.addAction) {
                oToolbar.addAction(oActionButton);
            } else if (oToolbar.addContent) {
                oToolbar.addContent(oActionButton);
            }
            this.oChildControls[oToolbar.getId()] = oActionButton;
        },
		onHelpPress: function (evt) {
			MessageToast.show("Custom Help button pressed");
		},

        addInformationControls: function(oInformationContainer) {
            let oInformationControl = new VerticalLayout();
            oInformationControl.addStyleClass("sapUiNoContentPadding");
            oInformationControl.addStyleClass("sapUiMediumMarginEnd");
            oInformationControl.addStyleClass("sapUiSmallMarginBottom");
            let oLabel = new Label({
                text: "Order Available Qty:",
                tooltip: "Order Available Qty"
            });
            let oLabelData = new Label({
                text: "{path: 'customData>/orderAvailableQty'}",
                tooltip: "Order Available Qty"
            });
            oInformationControl.addContent(oLabel);
            oInformationControl.addContent(oLabelData);
            oInformationContainer.addItem(oInformationControl);
            this.oChildControls[oInformationContainer.getId()] = oInformationControl;
             
            let oInformationControl1 = new VerticalLayout();
            oInformationControl1.addStyleClass("sapUiNoContentPadding");
            oInformationControl1.addStyleClass("sapUiMediumMarginEnd");
            oInformationControl1.addStyleClass("sapUiSmallMarginBottom");
            let oLabel1 = new Label({
                text: "Order Done Qty:",
                tooltip: "Order Done Qty"
            });
            let oLabelData1 = new Label({
                text: "{path: 'customData>/orderDoneQty'}",
                tooltip: "Order Done Qty"
            });
            oInformationControl1.addContent(oLabel1);
            oInformationControl1.addContent(oLabelData1);
            oInformationContainer.addItem(oInformationControl1);
            this.oChildControls[oInformationContainer.getId()] = oInformationControl1;

            let oInformationControl2 = new VerticalLayout();
            oInformationControl2.addStyleClass("sapUiNoContentPadding");
            oInformationControl2.addStyleClass("sapUiMediumMarginEnd");
            oInformationControl2.addStyleClass("sapUiSmallMarginBottom");
            let oLabel2 = new Label({
                text: "Customer:",
                tooltip: "Customer"
            });
            let oLabelData2 = new Label({
                text: "{path: 'customData>/customerInfo'}",
                tooltip: "Customer"
            });
            oInformationControl2.addContent(oLabel2);
            oInformationControl2.addContent(oLabelData2);
            oInformationContainer.addItem(oInformationControl2);
            this.oChildControls[oInformationContainer.getId()] = oInformationControl2;
        }
    })
});
