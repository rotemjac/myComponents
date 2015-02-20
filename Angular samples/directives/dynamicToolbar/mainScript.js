(function (angular) {
    "use strict";

    /* ------ AngularJS code ------*/
    angular.module('examplesModule')
        .directive('livechart', livechart)
        .directive('livechartToolbar', livechartToolbar)
        .directive('pair', pair)
        .directive('addPair', addPair);




    /* ------ JavaScript code ------*/
    function livechart() {
        var directiveDefinitionObject = {

            restrict: 'E',
            template: function () {
                var resString = '<div>'+
                                    '<livechart-toolbar></livechart-toolbar>'+
                                '</div>';
                return resString;
            },
            replace: true,

            //transclude : true,

            scope:{},
            link: function postLink(scope,iElement,iAttr,controller) {
                scope.$on("pairAddition" , function (event, pairName) {

                });

            },
            controller: function($scope, $element, $attrs){
                //Just to initialize 2 pairs for example - in real world cases - can be removed
                var pairs = [];

                //Should implement that..
/*                $scope.select = function(pair) {
                    angular.forEach(pairs, function(pair) {
                        pair.selected = false;
                    });
                    pair.selected = true;
                }*/

                //Used by the toolbar that is responsible to load all pairs from data into the markup when the app's loads
                this.getAllPairs = function () {
                    return pairs;
                }

                this.addPairData = function(title) {

                  //Should implement that (when a pair is added it should be the one that is shown (maybe this method belongs to the toolbar directive)
/*
                    if (pairs.length == 0) {
                        $scope.select(pair);
                    }
   */
                    pairs.push(title);
                }

                this.removePairData = function (title) {
                    for (var i=0; i<pairs.length;i++) {
                        if (pairs[i] == title) {
                            pairs.splice(i,1);
                            break;
                        }
                    }
                }
            }
        };

        return directiveDefinitionObject;
    }

    function livechartToolbar($compile) {
        var directiveDefinitionObject = {

            restrict: 'E',
            template: function () {
                var resString = '<div>'+
                                    '<span class="glyphicon glyphicon-circle-arrow-left"></span>'  +
                                    '<div id="pairsContainer" style="padding-left: 500px; display: inline;">' +
                                        '</div>'+
                                    '<span class="glyphicon glyphicon-circle-arrow-right"></span>' +
                                    '<add-pair></add-pair>' +
                                '</div>';
                return resString;
            },
            replace: true,
            require: "^livechart",

            link: function postLink(scope,iElement,iAttr,livechartCtrl) {
                var allPairs = [];

                scope.addPairToMarkup = function (titleParam) {
                    var el = $compile( '<pair title=' + titleParam + '></pair>')( scope );
                    iElement.find("#pairsContainer").append(el);
                    livechartCtrl.addPairData(titleParam);
                }

                var init = function () {
                    allPairs = livechartCtrl.getAllPairs();

                    for (var i=0; i<allPairs.length;i++) {
                        scope.addPairToMarkup(allPairs[i]);
                    }
                }();

                scope.removePairMarkup = function (titleOfBtnToRemove) {

                    //1 - Get all buttons
                    var allButtons = iElement.find("#pairsContainer").children();

                    //2- Remove the first button that has the same innerText as the button that was clicked (If there are 2 buttons or more with the same innerText - it will take the first one)
                    for (var i=0; i<allButtons.length; i++) {
                        if (allButtons[i].innerText == titleOfBtnToRemove) {
                            (angular.element(allButtons[i])).remove();
                            break;
                        }
                    }

                    //3 - Go tho parent controller and tell it to remove the pair's data
                    livechartCtrl.removePairData(titleOfBtnToRemove);

                }


                scope.$on('pairAddition', function (event,data) {
                    scope.addPairToMarkup(data);
                });

            }
        };

        return directiveDefinitionObject;
    }

    function pair() {
        var directiveDefinitionObject = {

            restrict: 'E',
            template: function () {
                var resString =
                    '<button type="button" class="btn btn-default btn-sm" style="margin: 0px 5px;">'+
                        '<span id="pairName" style="padding-right:8px; "></span>'+
                        '<span class="glyphicon glyphicon-remove"></span>'+
                    '</button>';
                return resString;
            },
            replace: true,
            link: function postLink(scope,iElement,iAttr) {

                //Reach the first span element and put the relevant text on it
                iElement.find("#pairName").html(iAttr.title);

                iElement.find(".glyphicon-remove").bind("click", function (event) {
                    scope.removePairMarkup(iAttr.title);
                } );
            }
        };

        return directiveDefinitionObject;
    }

    //This directive should open a modal window that allow to insert the pair's name, currently it doesn't do that and insert a default name
    function addPair() {
        var directiveDefinitionObject = {

            restrict: 'E',
            template: function () {
                var resString = '<span ng-click="add()" class="glyphicon glyphicon-plus-sign"></span>';
                return resString;
            },
            replace: true,
            link: function postLink(scope,iElement,iAttr,controller) {

                scope.add = function () {
                    //We do a broadcast here because the 'addPair' logic is on the rootScope (see batarang)
                    scope.$broadcast("pairAddition" , "P100");
                }
            }
        };

        return directiveDefinitionObject;
    }





    /* ----- Functions ----- */

    function innerFunc1 () {

    }
    function innerFunc2() {

    }

})(angular);