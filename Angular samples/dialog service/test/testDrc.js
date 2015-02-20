    /**
 * Created by rotem.jackoby on 23/12/2014.
 */


(function (angular) {
    "use strict";

    /* ------ AngularJS code ------*/
    angular.module('dialogModule')
        .directive('testDrc',testDrc);

    /* ------ JavaScript code ------*/
    function testDrc($rootScope) {
        var directiveDefinitionObject = {
            restrict: 'E',
            replace: true,
            template: "<div>{{drcCtrl.someField}}</div>",
            controller: function () {
                this.someField  = "DirectiveText";
                this.OK         = show;
                this.Cancel     = dontShow;
            },
            controllerAs : 'drcCtrl'
        };

        function show () {
            console.log("OK!");
            setTimeout(function () {
                $rootScope.$broadcast("closeTestDrc");
            }, 2000)
        }
        function dontShow () {
            console.log("111!");
        }

        return directiveDefinitionObject;
    }

    /* ----- Functions ----- */

})(angular);


