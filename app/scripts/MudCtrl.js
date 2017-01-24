'use strict';

/**
 * @ngdoc function
 * @name snowApp.controller:DemopageCtrl
 * @description
 * # DemopageCtrl
 * Controller of the snowApp
 */

angular.module('mudhead')
.controller('MudCtrl', ['$scope', '$mdSidenav', '$timeout', '$mdDialog', '$location', '$rootScope', 'menuFactory', '$http', '$q', '$state',
function ($scope, mdSidenav, $t, mdDialog, $loc, $root, menu, $http, $q, $state) {
  var o = this;
  o.sbId = '666';

  $scope.menu = menu;
  $scope.path = path;
  $scope.goHome = goHome;
  $scope.openMenu = openMenu;
  $scope.closeMenu = closeMenu;
  $scope.isSectionSelected = isSectionSelected;

  $scope.thisYear = (new Date()).getFullYear();

  $root.$on('$locationChangeSuccess', openPage);
  $scope.focusMainContent = focusMainContent;

  //-- Define a fake model for the related page selector
  Object.defineProperty($root, 'relatedPage', {
    get: function () { return null; },
    set: angular.noop,
    enumerable: true,
    configurable: true
  });

  $root.redirectToUrl = function(url) {
    $loc.path(url);
    $t(function () { $root.relatedPage = null; }, 100);
  };

  // Methods used by menuLink and menuToggle directives
  o.isOpen = isOpen;
  o.isSelected = isSelected;
  o.toggleOpen = toggleOpen;
  o.autoFocusContent = false;

  var mainContentArea = document.querySelector('[role="main"]');

  getMePages().then(function (resp) {
    o.dbPages = resp;
  });

  // *********************
  // Internal methods
  // *********************
  function closeMenu() {
    $t(function() { mdSidenav(o.sbId).close(); });
  }

  function openMenu() {
    $t(function() { mdSidenav(o.sbId).open(); });
  }

  function path() {
    return $loc.path();
  }

  function goHome($event) {
    menu.selectPage(null, null);
    $loc.path( '/' );
  }

  function openPage() {
    $scope.closeMenu();

    if (o.autoFocusContent) {
      focusMainContent();
      o.autoFocusContent = false;
    }
  }

  function focusMainContent($event) {
    // prevent skip link from redirecting
    if ($event) {
      //$event.preventDefault();
    }

    $t(function(){
      mainContentArea.focus();
    },90);

  }

  function isSelected(page) {
    return menu.isPageSelected(page);
  }

  function isSectionSelected(section) {
    var selected = false;
    var openedSection = menu.openedSection;
    if(openedSection === section){
      selected = true;
    }
    else if(section.children) {
      section.children.forEach(function(childSection) {
        if(childSection === openedSection){
          selected = true;
        }
      });
    }
    return selected;
  }

  function isOpen(section) {
    return menu.isSectionSelected(section);
  }

  function toggleOpen(section) {
    menu.toggleSelectSection(section);
  }

  function getMePages () {

    var defer = $q.defer();
    defer.resolve( {} );
    /*
    $http({
      method: 'GET',
      url: 'http://localhost:13337/pages',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      cache: true
    }).then(function successCb ( resp ) {
      defer.resolve( resp.data );
    }, function eroorCb (args) {
      defer.reject(args);
    });
    */
    return defer.promise;

  }

  $scope.sbState = true;

}]);
