'use strict';

/**
 * @ngdoc service
 * @name mudhead.appPanelBlurService
 * @description
 * # appPanelBlurService
 * Service in the mudhead.
 */
angular.module('mudhead')
.service('appPanelBlurService', ['$q', function ($q) {
  var o = this;
  var res = $q.defer();
  var computedStyle = getComputedStyle(document.body, ':before');
  var image = new Image();
  image.src = computedStyle.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2');
  image.onerror = function() {
    res.reject();
  };
  image.onload = function() {
    res.resolve();
  };

  o.bodyBgLoad = function() {
    return res.promise;
  };

  o.getBodyBgImageSizes = function() {
    var elemW = document.documentElement.clientWidth;
    var elemH = document.documentElement.clientHeight;
    if(elemW <= 640) return;
    var imgRatio = (image.height / image.width);       // original img ratio
    var containerRatio = (elemH / elemW);     // container ratio

    var finalHeight, finalWidth;
    if (containerRatio > imgRatio) {
      finalHeight = elemH;
      finalWidth = (elemH / imgRatio);
    } else {
      finalWidth = elemW;
      finalHeight = (elemW * imgRatio);
    }
    return { width: finalWidth, height: finalHeight, positionX: (elemW - finalWidth)/2, positionY: (elemH - finalHeight)/2};
  };

}]);
