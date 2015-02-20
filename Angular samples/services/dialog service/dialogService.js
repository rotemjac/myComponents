/**
 * Created by rotem.jackoby on 18/12/2014.
 */


(function (angular) {
    "use strict";

    /* ------ AngularJS code ------*/
    angular.module('dialogModule', ['ui.bootstrap'])
            .service('dialogService',DialogService);


    /* ------ JavaScript code ------*/
    //Constructor
    function DialogService(alertService, popupService) {
        this.alertService = alertService;
        this.popupService = popupService;
    }

    //Prototype
    DialogService.prototype = {
        buildBtnObj      : buildBtnObjFunc,
        openAlertWindow  : openAlertWindowFunc,
        openPopUpWindow  : openPopUpWindowFunc
    };


    /* --------------------- Functions --------------------- */

    /*
     Notice:
     buttonsData should contains objects with the following fields:
     text - the text that will appear on the button
     type - the bootstrap class (btn-something)
     func - the function to execute after ng-click
     */

    function buildBtnObjFunc(arrayToPush,text,styleClass,onClickHandler,handlerContext) {
        arrayToPush.push(
            {
                text    : text,
                type    : styleClass,
                func    : onClickHandler,
                context : handlerContext
            }
        );
        return arrayToPush;
    }

    function openAlertWindowFunc (header,body, buttonsData) {
        this.alertService.openAlertWindow(header,body, buttonsData);
    }

    function openPopUpWindowFunc (header,body,nameOfCloseEvent) {
        this.popupService.openPopupWindow(header,body,nameOfCloseEvent);
    }

})(angular);

