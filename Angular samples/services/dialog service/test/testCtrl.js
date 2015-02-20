/**
 * Created by rotem.jackoby on 22/12/2014.
 */
(function (angular) {
    "use strict";

    angular.module('dialogModule').controller('testCtrl', function ($scope,dialogService) {

            //Testing the 'openAlertWindow' function in dialogService (we need to create buttons data here)
            var someButtonsData = [];
            someButtonsData = dialogService.buildBtnObj(someButtonsData,"btn1","primary",func1,this);
                              dialogService.buildBtnObj(someButtonsData,"btn2","warning",func2,this);

            this.openAlert = function () {
                dialogService.openAlertWindow('someHeaderString', "SomeBody", someButtonsData);
            };

            //Testing the 'openPopUpWindow' function in dialogService (NO need to create buttons data here)
            this.openPopUp = function () {
                var element = '<div><test-drc></test-drc></div>';
                dialogService.openPopUpWindow('someHeaderString', element, "closeTestDrc");
            };

    });

    function func1() {
         console.log("Func1 executed!");
    }

    function func2() {
         console.log("Func2 executed!");
    }

})(angular);



