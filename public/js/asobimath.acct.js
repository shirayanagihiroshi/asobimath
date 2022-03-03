/*
 * asobimath.acct.js
 * アカウント部モジュール
 */
asobimath.acct = (function () {
  'use strict';

  //---モジュールスコープ変数---
  let configMap = {
        main_html : String()
          + '<div class="asobimath-acct-name" style="padding:0.3em; color:#fff">'
          + '</div>',
        settable_map : {showStr : true},
        showStr : ""
      },
      stateMap = {
        $container : null,
      },
      jqueryMap = {},
      setJqueryMap, configModule, initModule, onClick;

  //---DOMメソッド---
  setJqueryMap = function () {
    let $container = stateMap.$container;
    jqueryMap = {
      $container : $container,
      $nameStr   : $container.find( '.asobimath-acct-name' )
    };
  };

  //---イベントハンドラ---
  onClick = function () {
    console.log('onClick');
    if ( asobimath.model.islogind() == false ) {
      console.log('not login');
      $.gevent.publish('tryLogin', [{}]);
    } else {
      console.log('longind');
      asobimath.model.logout();
    }

    return false;
  }

  //---パブリックメソッド---
  configModule = function ( input_map ) {
    asobimath.util.setConfigMap({
      input_map : input_map,
      settable_map : configMap.settable_map,
      config_map : configMap
    });
    return true;
  }

  initModule = function ( $container ) {

    $container.html( configMap.main_html );
    stateMap.$container = $container;
    setJqueryMap();

    jqueryMap.$nameStr.html( configMap.showStr );

    // 重複して登録すると、何度もイベントが発行される。それを避けるため、一旦削除
    jqueryMap.$container
      .off('click');

    jqueryMap.$container //setJqueryMap　より前に呼ぶとjqueryMapの$containerが設定されておらずエラー
      .click( onClick );

    return true;
  }

  return {
    configModule : configModule,
    initModule : initModule
  };
}());
