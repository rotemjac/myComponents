    /**
 * Created by rotem.jackoby on 23/12/2014.
 */


(function (angular) {
    "use strict";

    /* ------ AngularJS code ------*/
    angular.module('dialogModule')
        .directive('alertTemplateInjectorDrc',alertTemplateInjectorFunc);

    /* ------ JavaScript code ------*/
    function alertTemplateInjectorFunc($filter ,alertService) {
        var directiveDefinitionObject = {

            restrict: 'A',

            require: '^alertTemplateInjectorDrc',
            controller: function () {
               this.data       = alertService.getTempData();
               this.inputLogic = {};
               initClickLogic(this.data.buttonsData , this.inputLogic);
            },

            link: function (scope,iElement,iAttr, localCtrl ) {

                //Step 1- Insert header to the template
                iElement.find(".modal-title").html($filter('translate')(localCtrl.data.header));

                //Step 2- Insert text to the body
                iElement.find("#body p").html($filter('translate')(localCtrl.data.body));

                //Step 3- Insert buttons and corresponding events to the template's footer (notice that if its defaults buttons we need to inject the 'filter' service in order to translate th 'ok'
                if (!localCtrl.data.buttonsData ||localCtrl.data.buttonsData.length == 0 ) {
                    createDefaultButtons(iElement,$filter,localCtrl.inputLogic);
                }
                else {
                    createButtonsFromInput(iElement,$filter,localCtrl.data.buttonsData,localCtrl.inputLogic);
                }
            }
        };

        /* ----- Functions ----- */

        /* --- Used in the DDO controller --- */
        function initClickLogic (buttonsData , inputLogic) {

            // ----- Decide the number of buttons ----- //
            var numberOfBtns = 1;//We have at least the 'ok' buttons
            //If we have 'buttonsData' - take the number of buttons from there
            if (buttonsData) {
                numberOfBtns = buttonsData.length;
            }

            //Assign logic to each btn
            for (var i=0; i <numberOfBtns; i++ ) {
                assignLogic(i,buttonsData ,inputLogic);
            }
        };

        /* We separate the logic from the loop in order to avoid closures issues */
        function assignLogic(i,buttonsData , inputLogic) {

            if (buttonsData) {
                var funcToExecute    = buttonsData[i]['func'];
                var executionContext = buttonsData[i]['context'];

                inputLogic['func' + i] = function () {

                    //Check if there was a handler to execute (if there was one - execute it)
                    if (funcToExecute) {
                        //If a context was passed - perform a call on it
                        if (executionContext) {
                            funcToExecute.call(executionContext);
                        }
                        //If no context was passed - just execute it
                        else {
                            funcToExecute();
                        }

                    }
                    //Add the 'close' logic in the end
                    alertService.modalInstance.close();
                }
            }
            //If there was no function to execute - add close logic
            else {
                inputLogic['func'+i] = function () {
                    alertService.modalInstance.close();
                }
            }


        }

        /* --- Used in the DDO link --- */

        //Notice: "filter" is the $filter service passed as a parameter
        function createDefaultButtons (iElement,filter,inputLogic) {
            var btn1 = $("<button></button>").html(filter('translate')('OK')).addClass("btn btn-primary");
            bindHandlerToNgClick(btn1, inputLogic["func0"]  );
            iElement.find("#footer").append(btn1);
        }

        function createButtonsFromInput(iElement,filter,buttonsData,inputLogic) {
            for (var i=0; i <buttonsData.length; i++ ) {
                var btnText,className,currentBtn;

                //--- 1: Add text to button (if no text was specified - add the default text) ---//
                if (buttonsData[i]['text']) {
                    btnText =  filter('translate')(buttonsData[i]['text']);
                }
                else {
                    //Default text for first button
                    if (i==0) {
                        btnText = filter('translate')('OK');
                    }
                    //Default text for second button
                    else if  (i==1){
                        btnText = filter('translate')('btnCancel');
                    }
                }

                //--- 2: Add style (button type) to button ---//
                if (buttonsData[i]['type']) {
                    className = "btn btn-" + buttonsData[i]['type'];
                }
                else {
                    className = "btn btn-primary";
                }

                //--- 3: Create the button ---//
                currentBtn = $("<button></button>").html(btnText).addClass(className);

                //--- 4: Attach click handler to button ---//
                currentBtn = bindHandlerToNgClick(currentBtn, inputLogic["func" + i ] );

                iElement.find("#footer").append(currentBtn);
            }
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

})(angular);


