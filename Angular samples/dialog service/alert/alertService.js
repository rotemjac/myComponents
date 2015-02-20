/**
 * Created by rotem.jackoby on 18/12/2014.
 */


(function (angular) {
    "use strict";

    /* ------ AngularJS code ------*/
    angular.module('dialogModule')
            .service('alertService',AlertService);


    /* ------ JavaScript code ------*/
    //Constructor
    function AlertService($modal) {
        this.$modal = $modal;
        this.tempData = {};
        this.modalInstance;
    }

    //Prototype
    AlertService.prototype = {
        openAlertWindow   : openAlertWindowFunc,
        getTempData       : getTempData,
        saveModalInstance : saveModalInstance
    };



    /* --------------------- Functions --------------------- */

    function openAlertWindowFunc (header,body, buttonsData) {
        saveAlertParam.apply(this,[header,body, buttonsData]);
        this.$modal.open(
            {
                templateUrl: "src/components/dialog/alert/templates/alertModalTemplate.html",
                controller : 'alertModalInstanceCtrl',
                backdrop   : 'static'
                //windowClass: 'xx-dialog'
            }
        )
    }

    function saveModalInstance(modalInstance) {
        this.modalInstance = modalInstance;
    }

    function saveAlertParam(header,body, buttonsData ) {
        this.tempData.header      = header ;
        this.tempData.body        = body ;
        this.tempData.buttonsData = buttonsData ;
    };

    function getTempData () {
        //Save temp data
        var res = this.tempData;

        //Clear temp data
        this.tempData = {};

        return res;
    }




})(angular);

