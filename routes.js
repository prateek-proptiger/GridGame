"use strict";

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
      .when("/", {
          controller: "GridGameCtrl",
          templateUrl: "/views/gridGame.html"
      });
}]);
