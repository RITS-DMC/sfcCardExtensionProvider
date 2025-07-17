**1. Clone the Repository**
    - Clone the repository into the following path inside your plugin project: (yourPlugin/webapp/sfcCardExtensionProvider)
    - Open and Identify data-name in your plugin’s index.html file.
    - Identify the value of the data-name attribute (e.g., rits.extension.plugin). This will be used in the upcoming search-and-replace operations
    
**2. Search and Replace in the Cloned Folder**
    - Right-click on the cloned folder sfcCardExtensionProvider.
    - Select "Find in Folder".
    - Perform the following search-and-replace operations:
        i. Replace 1:
            - Use this in the Search field: ritsdmc-az12fc9w.execution.eu20-quality.web.dmc.cloud.sap.customdevplugin
            - Use this in the replace field: rits.extension.plugin
            - Click "Replace All Icon".
        ii. Replace 2:
            - Use this in the Search field: ritsdmc-az12fc9w/execution/eu20-quality/web/dmc/cloud/sap/customdevplugin
            - Convert your data-name (e.g., rits.extension.plugin) to a folder path by replacing dots . with slashes / (e.g., rits/extension/plugin).
            - Use this in the replace field: rits/extension/plugin
            - Click "Replace All Icon".
            
**3. Update component.json**
    - Open the file: yourPlugin/webapp/designer/component.json
    - Inside the extensions list, add an entry for the plugin with the following structure:
    
          {
            "provider": "rits/extension/plugin/sfcCardExtensionProvider/ExtensionProvider",
            "controller": "sap.dm.dme.plugins.headerInformationPlugin",
            "inclusions": [{
              "pods": ["pod1", "pod2"],
              "plants": ["plant1", "plant2"]
            }]
          }
    **Important Note: After pasting the above JSON:
          i. Ensure provider matches the correct plugin path. It should be: <data-name with slashes>/sfcCardExtensionProvider/ExtensionProvider. For example, if your data-name is rits.extension.plugin, then it becomes: rits/extension/plugin/sfcCardExtensionProvider/ExtensionProvider.
          ii. Ensure pods and plants are updated based on your actual deployment targets. Replace "pod1", "pod2" and "plant1", "plant2" with real values.**
          
**4. Build and Deploy Your Plugin**
      - Build your plugin project using your standard build process.
      - Deploy it to your target environment.
      
**5. Verify the Result**
      - Navigate to the relevant section in your app.
      - Verify that the extension is functioning correctly and is visible for the specified pods and plants defined in the component.json file.
