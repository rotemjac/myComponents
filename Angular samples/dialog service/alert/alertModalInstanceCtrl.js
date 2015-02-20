/**
 * Created by rotem.jackoby on 29/01/2015.
 */
(function (angular) {
    "use strict";

    /* ------ AngularJS code ------*/
    angular.module('dialogModule')
        .controller('alertModalInstanceCtrl',AlertModalInstanceCtrl);

    /* ------ JavaScript code ------*/
    function AlertModalInstanceCtrl($modalInstance , alertService) {
        //When controller is created - it immediately save the $modalInstance in the alertService
        alertService.saveModalInstance ($modalInstance);
    }


})(angular);