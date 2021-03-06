import saveLocalTemplate from "../../../components/modals/saveFile/saveFile.html";
import saveLocalcontroller from "../../../components/modals/saveFile/saveFile.controller.js";
import swaggerHubOpenTemplate from "../../../components/modals/openFromSwaggerHub/openFromSwaggerHub.html";
import swaggerHubOpenController from "../../../components/modals/openFromSwaggerHub/openFromSwaggerHub.controller.js";
import swaggerHubSaveTemplate from "../../../components/modals/saveToSwaggerHub/saveToSwaggerHub.html";
import swaggerHubSaveController from "../../../components/modals/saveToSwaggerHub/saveToSwaggerHub.controller.js";

let sideNavArray = ["$scope", "$element", "$timeout", "CompilerService", "$mdDialog", "$document", SidenavCtrl];

export default sideNavArray;

/**
 */
function SidenavCtrl($scope, $element, $timeout, cs, $mdDialog, $document) {

    this.content = {
        open: [
            {
                title: "From Local",
                op: openFile
            },
            {
                title: "From SwaggerHub",
                op: swaggerHubOpen
            }
        ],
        save: [
            {
                title: "To Local",
                op: downloadLocal
            },
            {
                title: "To SwaggerHub",
                op: swaggerHubSave
            }
        ]
    };

    this.show = {
        open: false,
        save: false
    };

    this.toggleDropdown = function toggleDropdown(key) {
        // debugger;
        this.show[key] = !this.show[key];
    };

    this.isOpenLocal = function isOpenLocal(key, title) {
        return (key === "open" && title === "From Local");
    };

    this.onChange = function onChangeHandler(event) {
        // return if the even is unidentified or null
        if (!event) {
            return;
        }

        // debugger;
        let file = event.target.files[0];
        let reader = new FileReader();

        // set up the onload property to fire when readAsText() below is compeleted;
        // reader.onload = function __onload_handler__(event){ original handler can take an event
        reader.onload = function onLoadHandler() {
        // debugger;

            $scope.$apply(function applyHndler() {

                let fileContent = angular.copy(reader.result);
                fileContent = angular.fromJson(fileContent);

                cs.distributeImportedDefinitionToServices(fileContent);

            }.bind(this));

        }.bind(this);

        // read in the file as a string -> sets of reader.onload() when complete.
        reader.readAsText(file);

    }.bind(this);

    // this.download = function download(text) {
    //     this.compiledDocument = cs.compiled;
    //     this.recompile();
    //     text = cs.compiled;
    //
    //     if (Object.keys(text).length === 0) {
    //         // UtilitiesService.toast("Definition Cannot be empty", 3000);
    //         return;
    //     }
    //
    //     var data = new Blob([angular.toJson(text, true)], { type: "application/json" });
    //     FileSaver.saveAs(data, "swagger.json");
    // };
    /**
     */
    function downloadLocal(ev) {

        var dialogeContext = {
            controller: saveLocalcontroller,
            controllerAs: "$ctrl",
            template: saveLocalTemplate,
            parent: angular.element($document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true // useFullScreen
        };

        $mdDialog
            .show(dialogeContext)
            .then(function() {
            }, function() {
            });

        // $scope.$watch(function() {
        //     return $mdMedia("xs") || $mdMedia("sm");
        // }, function(wantsFullScreen) {
        //     $scope.customFullscreen = (wantsFullScreen === true);
        // });
    }

    /**
     */
    function swaggerHubOpen(ev) {

        var dialogeContext = {
            template: swaggerHubOpenTemplate,
            controllerAs: "$ctrl",
            controller: swaggerHubOpenController,
            parent: angular.element($document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true // useFullScreen
        };

        $mdDialog
            .show(dialogeContext)
            .then(function() {
            }, function() {
            });

    }

    /**
     */
    function swaggerHubSave(ev) {

        var dialogeContext = {
            template: swaggerHubSaveTemplate,
            controllerAs: "$ctrl",
            controller: swaggerHubSaveController,
            parent: angular.element($document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true // useFullScreen
        };

        $mdDialog
            .show(dialogeContext)
            .then(function() {
            }, function() {
            });

    }

    /**
     */
    function openFile() {
        // debugger;
        let opener = $element.find("#file-input");

        $timeout(function() {
            opener.click();
        });

    }

}
