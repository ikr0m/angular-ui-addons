/*
 * angular-ui-addons
 * http://angular-ui-addons.github.io

 * Version: 0.1.0 - 2014-01-15
 * License: MIT
 */
angular.module("angular-ui-addons", ["angular-ui-addons.templates", "angular-ui-addons.inclist"]);
angular.module("angular-ui-addons.templates", ["template/inclist/inclist-input.html","template/inclist/inclist-out-list.html"]);
angular.module('angular-ui-addons.inclist', [])

    .directive('inclistInput', function () {
      return {
        restrict: "E",

        scope: {
          list: '=inclistInputList',
          propSelection: '=inclistInputPropSelection'
        },

        templateUrl: 'template/inclist/inclist-input.html',

        controller: ["$scope", function ($scope) {

          $scope.addPropertyToList = function () {
            if ($scope.propSelection !== "" && $scope.propSelection !== undefined) {
              $scope.list.push({id: Date.now(), name: $scope.propSelection});
              $scope.propSelection = "";
            }
          };

        }],

        link: function (scope, element, attrs) {


        }
      };

    })

    .directive('inclistOut', function () {

      return {
        restrict: "E",

        scope: {list: '=inclistOutList'},

        templateUrl: 'template/inclist/inclist-out-list.html',

        controller: ["$scope", function ($scope) {
          $scope.removeItem = function (itemId) {

            var _res = [];

            angular.forEach($scope.list, function (item) { if (item.id != itemId) { _res.push(item); } });

            $scope.list = _res;

          };
        }],

        link: function (scope, element, attrs) {


        }
      };
    });


angular.module("template/inclist/inclist-input.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/inclist/inclist-input.html",
    "<form ng-submit=\"addPropertyToList()\">\n" +
    "  <div class=\"input-group\">\n" +
    "    <input id=\"inputPropsList\" type=\"text\" ng-model=\"propSelection\"\n" +
    "           placeholder=\"Type here and press enter to add property\"\n" +
    "           autocomplete=\"off\" class=\"form-control\">\n" +
    "\n" +
    "    <span class=\"input-group-btn\">\n" +
    "      <button class=\"btn btn-default\" type=\"submit\">+</button>\n" +
    "    </span>\n" +
    "  </div>\n" +
    "</form>\n" +
    "");
}]);

angular.module("template/inclist/inclist-out-list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/inclist/inclist-out-list.html",
    "<ul class=\"list-inline plates\">\n" +
    "  <li ng-repeat=\"item in list\">{{ item.name }}\n" +
    "    <button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"removeItem(item.id)\">&times;</button>\n" +
    "  </li>\n" +
    "</ul>");
}]);