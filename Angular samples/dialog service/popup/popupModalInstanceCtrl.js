/**
 * Created by rotem.jackoby on 18/12/2014.
 */

(function (angular) {
    "use strict";

    /* ------ AngularJS code ------*/
    angular.module('dialogModule')
        .controller('popupModalInstanceCtrl',PopupModalInstanceCtrl);

    /* ------ JavaScript code ------*/
    function PopupModalInstanceCtrl($modalInstance , popupService) {
        //When controller is created - it immediately save the $modalInstance in the popupService
        popupService.saveModalInstance ($modalInstance);
    }


})(angular);
