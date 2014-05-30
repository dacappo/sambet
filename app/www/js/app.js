angular.module('sambet', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "event-menu.html"
    })
    .state('eventmenu.dashboard', {
      url: "/dashboard",
      views: {
          'menuContent':{
              templateUrl: "dashboard.html"
          }
      }
    })

    .state('eventmenu.about', {
      url: "/about",
      views: {
          'menuContent':{
              templateUrl: "about.html"
          }
      }
    })

      .state('eventmenu.groups', {
          url: "/groups",
          views: {
              'menuContent':{
                  templateUrl: "groups.html"
              }
          }
      })

      .state('eventmenu.tips', {
          url: "/tips",
          views: {
              'menuContent':{
                  templateUrl: "tips.html"
              }
          }
      })

      .state('eventmenu.settings', {
          url: "/settings",
          views: {
              'menuContent':{
                  templateUrl: "settings.html"
              }
          }
      })

    .state('eventmenu.contact', {
      url: "/contact",
      views: {
          'menuContent':{
              templateUrl: "contact.html"
          }
      }
    });


   $urlRouterProvider.otherwise("/event/dashboard");

})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate)
{
  $scope.toggleLeft = function()
  {
      $ionicSideMenuDelegate.toggleLeft();
  }
});