    /**
 * Created by rotem.jackoby on 23/12/2014.
 */


(function (angular) {
    "use strict";

    /* ------ AngularJS code ------*/
    angular.module('dialogModule')
        .directive('popupTemplateInjectorDrc',popupTemplateInjectorFunc);

    /* ------ JavaScript code ------*/
    function popupTemplateInjectorFunc($compile,$rootScope,$filter, $parse ,popupService) {
        var directiveDefinitionObject = {
            restrict: 'A',
            require: '^popupTemplateInjectorDrc',
            controller: function () {
                this.data = popupService.getTempData();
            },
            link: function (scope,iElement,iAttr, localCtrl ) {
                //Step 1- Insert header to the template
                iElement.find(".modal-title").html($filter('translate')(localCtrl.data.header));

                //Step 2-  build body and footer
                //Create a new scope
                var scope = $rootScope.$new();

                //Insert a directive to the body and compile it
                iElement.find("#body").append(localCtrl.data.body);
                $compile(iElement.find("#body"))(scope);

                //Then listen to close event (the event is saved in the directive)
                scope.$on(localCtrl.data.nameOfCloseEvent, function (event) {
                    popupService.modalInstance.close();
                });

                //Insert a buttons to the footer and compile it
                createButtonAndAppendToFooter(iElement,scope, "OK");
                createButtonAndAppendToFooter(iElement,scope, "Cancel");
                $compile(iElement.find("#footer"))(scope);
            }
        };

        function createButtonAndAppendToFooter(iElement, scope, okOrCancel) {
            //--- Create the button and Attach click handler to it ---//
            var btnText = "btn" +okOrCancel;//Add 'btn' prefix (for the translation)
            var btn = $("<button></button>").html($filter('translate')(btnText)).addClass('btn btn-primary');

            //This callback is passed to 'bindHandlerToNgClick' below
            var callback = function () {
                $parse("drcCtrl."+okOrCancel+"()")(scope);

                //Close the popup only if you're creating the cancel button
                if  (okOrCancel == 'Cancel') {
                    popupService.modalInstance.close();
                }
            };

            btn = bindHandlerToNgClick(btn, callback );
            iElement.find("#footer").append(btn);
        }


        function bindHandlerToNgClick (btn , handler) {
            //Attach click handler only if a handler was specified
            if (handler) {
                btn.on('click', handler);
                return btn;
            }
        }

        return directiveDefinitionObject;
    }

    /* ----- Functions ----- */


})(angular);


