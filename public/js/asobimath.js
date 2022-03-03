/*
 * asobimath.js
 * ルート名前空間モジュール
 */
let asobimath = (function () {
  'use strict';

  let initModule = function ( $container ) {
    asobimath.model.initModule();
    asobimath.shell.initModule($container);
  }

  return { initModule : initModule };
}());
