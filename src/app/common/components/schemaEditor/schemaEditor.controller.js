"use strict";

let schemaEditorController = ["$scope", "$log", "$window", "UtilitiesService", "PathService", "ObjectFactory", schemaEditorCtrl];

export default schemaEditorController;

function schemaEditorCtrl($scope, $log, $window, UtilitiesService, PathService, ObjectFactory){

  /**
    * @name newResponseData
    * @desc Holds the state of the inputs. Only manipulated in the DOM
    * @type {Object}
   **/
    this.schema = {
        definition: this.sgSchemaObject
    };

    this.formats = ["int32","int64", "float", "double", "string", "byte", "binary", "boolean", "date", "date-time", "password", "email", "uuid"];
    this.types = ["integer", "number", "string", "boolean"];

    this.toggleRequired = function(propertyName, isRequired){
        // debugger;
        $log.log("TOGGLE PROPERTY REQUIRED");
        $log.log(propertyName, isRequired);
        if (isRequired) {
            this.sgSchemaObject.required.push(propertyName);
        } else {
            for (var i = 0; i < this.sgSchemaObject.required.length; i++) {
                if (this.sgSchemaObject.required[i] === propertyName) {
                    this.sgSchemaObject.required.splice(i, 1);
                    return;
                }
            }
        }
    };

    this.toast = function(msg){
        var message = msg || "No toast supplied, but hello!!";
        UtilitiesService.toast(message, 2000);
    };

    this.addProperty = function(definitionName, propertyName){
        // debugger;
        if (this.sgSchemaObject.properties.hasOwnProperty(propertyName)) {
            UtilitiesService.toast("Property already exists on this definition.");
        } else {
            this.sgSchemaObject.properties[propertyName] =  ObjectFactory.newSchema();
            //this.sgSchemaObject.properties[propertyName].type = null;
        }

        //if(tempDefniition.properties.hasOwnProperty)

        this.newProperty.name = "";

    };

    this.deleteProperty = function(propertyName){
        if ($window.confirm("Are you sure you want to delete the property?")) {
            delete this.sgSchemaObject.properties[propertyName];
        } else {
            $log.log("Don't delete property");
        }
    };

}