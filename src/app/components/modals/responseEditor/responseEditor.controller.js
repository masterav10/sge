// import angular from "angular";

"use strict";

let ResponseEditorController = ["$scope", "$log", "$mdDialog", ResponseModalCtrl];

export default ResponseEditorController;

function ResponseModalCtrl($scope, $log, $mdDialog){

    // this.tempResponse = {
    //     httpCode:null,
    //     response:null
    // };
    //
    // let originalResponse = {
    //     responses:null,
    //     httpCode:null
    // };

    // $scope.$watch(function(){return rms.responseContext;}, onModalInit.bind(this), true);
    //
    // function onModalInit(newVal){
    //
    //     if(newVal.responses){
    //         // debugger;
    //         originalResponse = newVal;
    //         this.tempResponse.httpCode = newVal.httpCode;
    //         this.tempResponse.response = angular.copy(newVal.responses.getResponse(newVal.httpCode));
    //     }
    //
    // }

    this.updateResponse = function(newResponse){
        // try{
        //     // swaggerPaths.updateParameter(originalParamData, paramModal.tempParam);
        //     PathService.updateResponse(originalResponse, newResponse);
        // }catch(e){
        //     $log.log(e);
        //     // Materialize.toast("Parameter name/query combo' already exists", 3000);
        //     UtilitiesService.toast(e);
        // }
        debugger;
        $mdDialog.hide(newResponse);
    };

    this.cancel = function(){
        $mdDialog.cancel();
    };

    // this.setResponseInModal = function(inLocation){
    //   console.log("setting response modal");
    //   if(inLocation === 'path'){
    //     this.tempResponse.required = true;
    //     console.log(this.tempResponse);
    //   }
    //
    // }

}
