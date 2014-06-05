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
    })

    .state('intro', {
      url: '/intro',
      templateUrl: 'intro.html',
      controller: 'IntroCtrl'
    })

   $urlRouterProvider.otherwise("/intro");

})

.controller('MainCtrl', function($scope, $state, $ionicSideMenuDelegate)
{
  $scope.hideBackButton = !$scope.hideBackButton;

  $scope.toggleLeft = function()
  {
      $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.data = { username : "Paxalu",
                  new_username : "",
                  points : 9};

  $scope.changeUsername = function() {
    $scope.data.username = $scope.data.new_username;
    $scope.data.new_username = "";
    $state.go('eventmenu.dashboard');
  };
})

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $scope.data.username = $scope.data.new_username;
    $scope.data.new_username = "";
    $state.go('eventmenu.dashboard');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})