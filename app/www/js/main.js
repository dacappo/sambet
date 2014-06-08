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

      .state('init', {
          url: '/init',
          templateUrl: 'init.html',
          controller: 'startCtrl'
      })


   $urlRouterProvider.otherwise("/init");

})

.controller('startCtrl', function($scope, $state)
    {
        $scope.init=function()
        {
            ionic.Platform.ready(function(){
                var device = ionic.Platform.device();
                var uuid = device.uuid;
                $scope.data = { deviceid : uuid};
                goForward(uuid);
            });

            function goForward(deviceID)
            {
              /*
                if(deviceID == "916cd04fd5a08dbe")
                {
                    $state.go('eventmenu.dashboard');
                }
                else
                {
                    $state.go('intr');
                }
                */
            };


        };
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
                  points : 0};

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