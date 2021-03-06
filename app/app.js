var app = angular.module('StarterApp', ['ngMaterial', 'ui.router', 'ngMdIcons']);

/*
 * App view config for left navigation bar
 *
 */
 app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');
    $stateProvider.state("home", {
        url: "/home", // the url you want to display
        templateUrl: "app/views/home.html"
    })
    $stateProvider.state("todoList", {
        url: "/todoList",
        templateUrl: "app/views/todoList.html"
    })
 })

app.controller('AppCtrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog', '$mdToast', '$state', '$stateParams',

    function($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $mdToast, $state, $stateParams){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
 	$scope.menu = [
    {
        title: 'Home',
        path: 'home',
        description: 'Home view',
        link : '',
        icon: 'home',
        selected: true
    },
    {
        title: 'Todo List',
        path: 'todoList',
        description: 'Todo List View',
        link : '',
        icon: 'message',
        selected: false
    }

  ];
  $scope.admin = [
    {
      link : '',
      title: 'Trash',
      icon: 'delete'
    }

  ];
  $scope.activity = [
      {
        what: 'Brunch this weekend?',
        who: 'Ali Conners',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"

      },
      {
        what: 'Summer BBQ',
        who: 'to Alex, Scott, Jennifer',
        when: '3:08PM',
        notes: "Wish I could come out but I'm out of town this weekend"
      },
      {
        what: 'Oui Oui',
        who: 'Sandra Adams',
        when: '3:08PM',
        notes: "Do you have Paris recommendations? Have you ever been?"
      },
      {
        what: 'Birthday Gift',
        who: 'Trevor Hansen',
        when: '3:08PM',
        notes: "Have any ideas of what we should get Heidi for her birthday?"
      },
      {
        what: 'Recipe to try',
        who: 'Brian Holt',
        when: '3:08PM',
        notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
      },
    ];

    $scope.todo = [
      {
        what: 'Brunch this weekend?',
        where: 'Irvine',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands",
          checkButtonVisible: false,
          checkBox: false,
          id: 1
      },
      {
        what: 'Summer BBQ',
        where: 'San Jose',
        when: '3:08PM',
        notes: "Wish I could come out but I'm out of town this weekend",
          checkButtonVisible: false,
          checkBox: false,
          id: 2
      },
      {
        what: 'Oui Oui',
        where: 'Santa Ana',
        when: '3:08PM',
        notes: "Do you have Paris recommendations? Have you ever been?",
          checkButtonVisible: false,
          checkBox: false,
          id: 3
      },
      {
        what: 'Birthday Gift',
        where: 'Anaheim',
        when: '3:08PM',
        notes: "Have any ideas of what we should get Heidi for her birthday?",
          checkButtonVisible: false,
          checkBox: false,
          id: 4
      },
      {
        what: 'Recipe to try',
        where: 'Lawndale',
        when: '3:08PM',
        notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos",
          checkButtonVisible: false,
          checkBox: false,
          id: 5
      },
    ];

    $scope.mouseHoverTodoItem = function(item){ // item is an todo
        item.checkButtonVisible = true;
    }
    $scope.mouseLeaveTodoItem = function(item){ // item is an todo
        item.checkButtonVisible = false;
    }
    $scope.removeItem = function(item){
        for (var i= 0; i < $scope.todo.length; ++i){
            if ($scope.todo[i] === item){
                if ($scope.todo[i].checkBox === true){
                    -- $scope.countItemSelected;
                }

                $scope.todo.splice(i,1);

                console.log(item.what + 'removed');
            }
        }

    }
    // handle check boxes
        $scope.oneItemSelected = false;
        $scope.countItemSelected = 0;
        $scope.oneCheck = function(item){
            if(item.checkBox === true){
                ++ $scope.countItemSelected;
                // item.checkBox = true;
            }else{
                -- $scope.countItemSelected;
                // item.checkBox = false;
            }
            if ($scope.countItemSelected > 0){
                $scope.oneItemSelected = true;
            }else {
                $scope.oneItemSelected = false;
            }
            console.log('count selected: ' + $scope.countItemSelected);
        }

    $scope.isOneItemSelected = function(){
        if ($scope.countItemSelected > 0){
            return true;
        }else {
            return false;
        }
    }
    $scope.deselectAllItem = function(){
        for (var i = 0; i < $scope.todo.length; ++i){
            $scope.todo[i].checkBox = false;
        }
        $scope.countItemSelected = 0;
    }

    $scope.removeSelectedItems = function(){
        var i = $scope.todo.length;
        while(i --){
            if($scope.todo[i].checkBox === true){
                $scope.todo.splice(i,1);
            }
        }
        $scope.countItemSelected = 0;
        $scope.oneItemSelected = false;
    }
    /*
    * TODO: Tab selection is wrong after refeshing on todoList page
    */
    // set default page so that the nav tab for home is hightlighted
    $scope.currentPage = 'home';
    $scope.isPageSelected = function(menuItem) {
        return ($scope.currentPage === menuItem.path);
    };
    /*
    * Direct content to the right html template (states are set in app.config)
    */
    $state.go('home'); // default page
    $scope.toggleSelectPage = function(menuItem) {
        $state.go(menuItem.path);
        $scope.currentPage = menuItem.path;
    };

  $scope.getToastPosition = function() {
    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  $scope.alert = '';
  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };

  $scope.showAdd = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      controllerAs: 'dc',
      templateUrl: 'add.html',
      targetEvent: ev,

      clickOutsideToClose:true
    })
    .then(function( answer) {  // save goes here
        var item = {
            what: answer.what,
            where: answer.where,
            when: answer.when,
            notes: answer.notes,
            checkButtonVisible: false,
            checkBox: false,
            id: $scope.todo.length+1
        };

        console.log(item);

		$scope.todo.push(item);

		$mdToast.show(
		  $mdToast.simple()
		    .content('Your todo has been added Toast!')
		    .position('top right')
		    .hideDelay(3000)
		);
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() { // cancel goes here
      $scope.alert = 'You cancelled the dialog.';
    });
  };

    $scope.deleteAll = function(ev) {
        $mdDialog.show({
                controller: DeleteAllDialogController,
                controllerAs: 'dadc',
                templateUrl: 'deleteAll.html',
                tergetEvent: ev,
                clickOutsideToClose: true
            })
            .then(function(answer){
                $scope.todo.splice(0, $scope.todo.length);
                $mdToast.show(
                    $mdToast.simple()
                        .content('You have deleted all tasks! You are free!')
                        .position('top right')
                        .hideDelay(3000)
                );
            }, function() {
                console.log("Delete All Dialog canceled");
            });

    };

}]);


// app.factory("Data", function() {
//
//     return {
//
//     };
// })

app.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Share', icon: 'share' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
});

function DeleteAllDialogController($scope, $mdDialog, $mdToast) {
    $scope.cancel = function (){
        $mdDialog.cancel();
    }
    $scope.answer = function(){
        $mdDialog.hide();
    }
}
function DialogController($scope, $mdDialog, $mdToast) {

  // $scope.hide = function() {
  //   $mdDialog.cancel();  // $mdDialog.hide() --> khi muon return answer
  // };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function() {
      console.log( $scope.todo);
      $mdDialog.hide($scope.todo);
  };
};

app.directive('userAvatar', function() {
  return {
    replace: true,
    template: '<svg class="user-avatar" viewBox="0 0 128 128" height="64" width="64" pointer-events="none" display="block" > <path fill="#FF8A80" d="M0 0h128v128H0z"/> <path fill="#FFE0B2" d="M36.3 94.8c6.4 7.3 16.2 12.1 27.3 12.4 10.7-.3 20.3-4.7 26.7-11.6l.2.1c-17-13.3-12.9-23.4-8.5-28.6 1.3-1.2 2.8-2.5 4.4-3.9l13.1-11c1.5-1.2 2.6-3 2.9-5.1.6-4.4-2.5-8.4-6.9-9.1-1.5-.2-3 0-4.3.6-.3-1.3-.4-2.7-1.6-3.5-1.4-.9-2.8-1.7-4.2-2.5-7.1-3.9-14.9-6.6-23-7.9-5.4-.9-11-1.2-16.1.7-3.3 1.2-6.1 3.2-8.7 5.6-1.3 1.2-2.5 2.4-3.7 3.7l-1.8 1.9c-.3.3-.5.6-.8.8-.1.1-.2 0-.4.2.1.2.1.5.1.6-1-.3-2.1-.4-3.2-.2-4.4.6-7.5 4.7-6.9 9.1.3 2.1 1.3 3.8 2.8 5.1l11 9.3c1.8 1.5 3.3 3.8 4.6 5.7 1.5 2.3 2.8 4.9 3.5 7.6 1.7 6.8-.8 13.4-5.4 18.4-.5.6-1.1 1-1.4 1.7-.2.6-.4 1.3-.6 2-.4 1.5-.5 3.1-.3 4.6.4 3.1 1.8 6.1 4.1 8.2 3.3 3 8 4 12.4 4.5 5.2.6 10.5.7 15.7.2 4.5-.4 9.1-1.2 13-3.4 5.6-3.1 9.6-8.9 10.5-15.2M76.4 46c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6zm-25.7 0c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6z"/> <path fill="#E0F7FA" d="M105.3 106.1c-.9-1.3-1.3-1.9-1.3-1.9l-.2-.3c-.6-.9-1.2-1.7-1.9-2.4-3.2-3.5-7.3-5.4-11.4-5.7 0 0 .1 0 .1.1l-.2-.1c-6.4 6.9-16 11.3-26.7 11.6-11.2-.3-21.1-5.1-27.5-12.6-.1.2-.2.4-.2.5-3.1.9-6 2.7-8.4 5.4l-.2.2s-.5.6-1.5 1.7c-.9 1.1-2.2 2.6-3.7 4.5-3.1 3.9-7.2 9.5-11.7 16.6-.9 1.4-1.7 2.8-2.6 4.3h109.6c-3.4-7.1-6.5-12.8-8.9-16.9-1.5-2.2-2.6-3.8-3.3-5z"/> <circle fill="#444" cx="76.3" cy="47.5" r="2"/> <circle fill="#444" cx="50.7" cy="47.6" r="2"/> <path fill="#444" d="M48.1 27.4c4.5 5.9 15.5 12.1 42.4 8.4-2.2-6.9-6.8-12.6-12.6-16.4C95.1 20.9 92 10 92 10c-1.4 5.5-11.1 4.4-11.1 4.4H62.1c-1.7-.1-3.4 0-5.2.3-12.8 1.8-22.6 11.1-25.7 22.9 10.6-1.9 15.3-7.6 16.9-10.2z"/> </svg>'
  };
});

app.config(function($mdThemingProvider) {
  var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.theme('default')
  		.primaryPalette('lime')
  		.accentPalette('orange');
  // $mdThemingProvider.definePalette('customBlue', customBlueMap);
  // $mdThemingProvider.theme('default')
  //   .primaryPalette('customBlue', {
  //     'default': '500',
  //     'hue-1': '50'
  //   })
  //   .accentPalette('pink');
  // $mdThemingProvider.theme('input', 'default')
  //       .primaryPalette('grey')
});
