/**
 * Created by Niyas on 12/12/2016.
 */

// Include all dependencies required for your app in the array
// Here we want to use the SPA, for which we need Route service.
var angularApp = angular.module('angularApp', ['ngRoute']);


// configure the routing part for Single Page Application
angularApp.config(function($routeProvider){

    $routeProvider

        .when('/main',{
            templateUrl: 'pages/main.html',
            controller: 'mainController'
        })

        .when('/second',{
            templateUrl: 'pages/second.html',
            controller: 'secondController'
        })

        // If we want to pass the query string SPA
        .when('/third/:num',{
            templateUrl: 'pages/third.html',
            controller: 'thirdController'
        })


});


angularApp.controller('mainController', ['$scope','$location','$log',function ($scope, $location, $log) {

    $log.info("This is for information from mainController");
    $log.info($location.path()); // returns the string after the # tag

    $scope.name = "Main";

    // to Proof AngularJS services are singletons.
    // AngularJS will create a singleton $log object and all the controllers will have the same copy
    // the $log.main will be overwrite when calling secondController, thirdController
    $log.main = "Property from main";
    $log.first = "Property from MAIN";
    $log.log($log);

    //Model data are in scope and custom directives have the visibility from the parent controller and make use of it.
    //We are using the Custom Directive 'searchResults' in main.html which is in 'mainController'
    //For Example:
    $scope.person = {
        name: 'John David',
        address: '222 Main Road, New York'
    }

}]);


angularApp.controller('secondController', ['$scope','$location','$log','nameService',function ($scope, $location, $log, nameService) {

    $log.info("This is for information from secondController");
    $log.info($location.path()); // returns the string after the # tag

    $scope.name = "Second";

    // to Proof AngularJS services are singletons.
    // AngularJS will create a singleton $log object and all the controllers will have the same copy
    $log.main = "Property from second";
    $log.second = "Property from SECOND";
    $log.log($log);

    //Custom Service
    $log.log(nameService.empname);
    //$log.log(nameService.namelength());

    $scope.empname = nameService.empname;
    //$scope.emplen = nameService.namelength();

    // Without below watch whatever empname changed in page third won;t be reflected/updated in page second and vice-cersa
    // Please $scope service is not Singleton, but the Custom Service nameService is Singleton
    $scope.$watch('empname',function(){
        nameService.empname = $scope.empname;
    });

}]);

// dependency inject your custom services like other  AngularJS services without the $ sign
angularApp.controller('thirdController', ['$scope','$location','$log','$routeParams','nameService', function ($scope, $location, $log, $routeParams, nameService) {

    $log.info("This is for information from thirdController");
    $log.info($location.path()); // returns the string after the # tag

    $scope.name = "Third";
    $scope.num = $routeParams.num;


    // to Proof AngularJS services are singletons.
    // AngularJS will create a singleton $log object and all the controllers will have the same copy
    $log.main = "Property from third";
    $log.third = "Property from THIRD";
    $log.log($log);

    //Custom Service
    $log.log(nameService.empname);
    $log.log(nameService.namelength());

    $scope.empname = nameService.empname;

    // Without below watch whatever empname changed in page third won;t be reflected/updated in page second and vice-cersa
    // Please $scope service is not Singleton, but the Custom Service nameService is Singleton
    $scope.$watch('empname',function(){
       nameService.empname = $scope.empname;
    });
    $scope.emplen = nameService.namelength();

}]);

// Writing your own Custom Services
// These custom services are Singleton objects by default
angularApp.service('nameService', function(){
   var self = this;
   this.empname = 'John Doe';
   this.namelength = function(){
      // alert("In NameService.")
       return self.empname.length;
   }
});

// Writing your own Custom Directives
// In javascript we cannot use the hyphen symbol in the variable as it is treated hyphen as minus sign
// So, in the below example we have given the directive name searchResults in the camel case.
// AngularJS will take the conversion and in html it will use as /look for search-results
// whatever html code in the template will be rendered / replaced in the html when using the searchResults custom directive
angularApp.directive("searchResults", function(){

    // return as javascript object
    return{

        // restrict is other Directive's property. we can use directive in Element (<search-results></search-results> or in Attribute (<div search-results></div>)
        // we can use restrict property, so that directive can be restricted to use in Element or Attribute. A stands for Attribute, E stands or Element, C stands for Class, M stands for comments
        // 'AE' is the default setting
        //restrict: 'AE',

        restrict: 'AECM',

        // template is one of Directive's Property - contains the html content
        // Since the html content can grow longer, we can remove the html content anf put it in separate html file using the property templateUrl
        //template: '<a href="#" class="list-group-item"><h4 class="list-group-item-heading">Doe, John</h4><p class="list-group-item-text"> 222, Main Toad, SIngapore </p> </a>',

        templateUrl: 'directives/searchresults.html',

        // replace is other Directive's property and default is false. When we use replace as true, then the html output wont's have the <search-results></search-results> tag.
        // Try with both true and false and check the htm content in F12 - developer console
        replace: true

    }

});