 sap.ui.define([
    "sap/dm/dme/podfoundation/extension/PluginExtensionProvider",
    "ritsdmc-az12fc9w/execution/eu20-quality/web/dmc/cloud/sap/customdevplugin/sfcCardExtensionProvider/LifecycleExtension",
    "ritsdmc-az12fc9w/execution/eu20-quality/web/dmc/cloud/sap/customdevplugin/sfcCardExtensionProvider/PluginEventExtension",
    "ritsdmc-az12fc9w/execution/eu20-quality/web/dmc/cloud/sap/customdevplugin/sfcCardExtensionProvider/PropertyEditorExtension",
    "ritsdmc-az12fc9w/execution/eu20-quality/web/dmc/cloud/sap/customdevplugin/utils/ExtensionUtilities",
    "ritsdmc-az12fc9w/execution/eu20-quality/web/dmc/cloud/sap/customdevplugin/sfcCardExtensionProvider/SfcCardUtility"
], function (PluginExtensionProvider, LifecycleExtension, PluginEventExtension, 
             PropertyEditorExtension, ExtensionUtilities, SfcCardUtility) {
    "use strict";
    return PluginExtensionProvider.extend("ritsdmc-az12fc9w.execution.eu20-quality.web.dmc.cloud.sap.customdevplugin.sfcCardExtensionProvider.ExtensionProvider", {
        constructor: function () {
            this.oExtensionUtilities = new ExtensionUtilities();
            this.oSfcCardUtility = new SfcCardUtility();
        },
        getExtensions: function () {
            let oLifecycleExtension = new LifecycleExtension(this.oExtensionUtilities, this.oSfcCardUtility);
            let oPluginEventExtension = new PluginEventExtension(this.oExtensionUtilities, this.oSfcCardUtility);
            this.oSfcCardUtility.setPluginEventExtension(oPluginEventExtension);
            let oPropertyEditorExtension = new PropertyEditorExtension(this.oExtensionUtilities);
            return [oLifecycleExtension, oPluginEventExtension, oPropertyEditorExtension];
        }
    })
});
