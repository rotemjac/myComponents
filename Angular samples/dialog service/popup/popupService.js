/**
 * Created by rotem.jackoby on 18/12/2014.
 */


(function (angular) {
    "use strict";

    /* ------ AngularJS code ------*/
    angular.module('dialogModule')
            .service('popupService',PopupService);


    /* ------ JavaScript code ------*/
    //Constructor
    function PopupService($modal) {
        this.$modal = $modal;
        this.tempData = {};
        this.modalInstance;
    }

    //Prototype
    PopupService.prototype = {
        openPopupWindow   : openPopupWindowFunc,
        getTempData       : getTempData,
        saveModalInstance : saveModalInstance
    };



    /* --------------------- Functions --------------------- */

    function openPopupWindowFunc (header,body, nameOfCloseEvent) {
        savePopupParam.apply(this,[header,body,nameOfCloseEvent]);
        this.$modal.open(
            {
                templateUrl: "src/components/dialog/popup/templates/popupModalTemplate.html",
                controller : 'popupModalInstanceCtrl',
                backdrop   : 'static'
                //windowClass: 'xx-dialog',
            }
        )
    }

    function saveModalInstance(modalInstance) {
        this.modalInstance = modalInstance;
    }

    function savePopupParam(header,body,nameOfCloseEvent) {
        this.tempData.header           = header ;
        this.tempData.body             = body ;
        this.tempData.nameOfCloseEvent = nameOfCloseEvent
    };

    function getTempData () {
        //Save temp data
        var res = this.tempData;

        //Clear temp data
        this.tempData = {};

        return res;
    }

})(angular);

