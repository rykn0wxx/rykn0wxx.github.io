'use strict';

/**
 * @ngdoc service
 * @name mud-theme.menuFactory
 * @description
 * # menuFactory
 * Service in the mud-theme.
 */
angular
.module('mudhead')
.factory('menuFactory', ['$rootScope', '$location', '$http', '$q', function ($root, $loc, $http, $q) {
  var dummy = [{
    "name": "Dashboards",
    "type": "heading",
    "children": [
      {
        "name": "Executive Level",
        "type": "toggle",
        "pages": [
          {
            "name": "Version1",
            "type": "link",
            "url": "#!/one"
          }
        ]
      }
    ]
  }, {
    "name": "Modules",
    "type": "heading",
    "children": [
      {
        "name": "AAA",
        "type": "toggle",
        "pages": [
          {
            "name": "AA1",
            "type": "link",
            "url": "do ut est"
          },
          {
            "name": "AA2",
            "type": "link",
            "url": "proident velit"
          }
        ]
      }
    ]
  }];

  var fakePage = [];
  var sections = [];
  var self = {};

  getMePages().then(function(resp) {
    angular.forEach(resp, function (val, ind) {
      sections.push(val);
    });
  });


  $root.$on('$locationChangeSuccess', onLocationChange);

  self = {
    sections: sections,

    selectSection: function(section) {
      self.openedSection = section;
    },
    toggleSelectSection: function(section) {
      self.openedSection = (self.openedSection === section ? null : section);
    },
    isSectionSelected: function(section) {
      return self.openedSection === section;
    },

    selectPage: function(section, page) {
      self.currentSection = section;
      self.currentPage = page;
    },
    isPageSelected: function(page) {
      return self.currentPage === page;
    }

  };

  return self;

  function onLocationChange () {
    var path = $loc.path();
    var introLink = [{
      name: "Introduction",
      url:  "/",
      type: "link"
    }];

    if (path === '/') {
      self.selectSection(introLink);
      self.selectPage(introLink, introLink);
      return;
    }

    var matchPage = function(section, page) {
      if (path.indexOf(page.url) !== -1) {
        self.selectSection(section);
        self.selectPage(section, page);
      }
    };

    sections.forEach(function(section) {
      if (section.children) {
        // matches nested section toggles, such as API or Customization
        section.children.forEach(function(childSection){
          if(childSection.pages){
            childSection.pages.forEach(function(page){
              matchPage(childSection, page);
            });
          }
        });
      }
      else if (section.pages) {
        // matches top-level section toggles, such as Demos
        section.pages.forEach(function(page) {
          matchPage(section, page);
        });
      }
      else if (section.type === 'link') {
        // matches top-level links, such as "Getting Started"
        matchPage(section, section);
      }
    });


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

}]);
