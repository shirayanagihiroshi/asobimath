/*
 * asobimath.login.js
 * ログイン画面モジュール
 */
asobimath.login = (function () {
  'use strict';

  //---モジュールスコープ変数---
  let configMap = {
        main_html : String()
          + '<div class="asobimath-login-username-title">'
            + '<p>ユーザID</p>'
          + '</div>'
          + '<input type="text" class="asobimath-login-username-textbox">'
          + '<div class="asobimath-login-passward-title">'
            + '<p>password</p>'
          + '</div>'
          + '<input type="password" class="asobimath-login-passward-textbox">'
          + '<button class="asobimath-login-button-ok">'
            + '<p>ok</p>'
          + '</button>'
          + '<button class="asobimath-login-button-cancel">'
            + '<p>cancel</p>'
          + '</button>',
        settable_map : {}
      },
      stateMap = {
      },
      jqueryMap = {},
      setJqueryMap, configModule, initModule, removeLogin,
      onOK, onCancel;

  //---DOMメソッド---
  setJqueryMap = function () {
    let $container = stateMap.$container;
    jqueryMap = {
      $container   : $container,
      $usernameTitle   : $container.find( '.asobimath-login-username-title' ),
      $usernameTextbox : $container.find( '.asobimath-login-username-textbox' ),
      $PasswordTitle   : $container.find( '.asobimath-login-passward-title' ),
      $PasswordTextbox : $container.find( '.asobimath-login-passward-textbox' ),
      $buttonOK        : $container.find( '.asobimath-login-button-ok' ),
      $buttonCancel    : $container.find( '.asobimath-login-button-cancel' )
    };
  }

  //---イベントハンドラ---
  onOK = function () {
    asobimath.model.login({userId:jqueryMap.$usernameTextbox.val(),
                           passWord:jqueryMap.$PasswordTextbox.val()});
    return false;
  }

  onCancel = function () {
    $.gevent.publish('loginCancel', [{}]);
    return false;
  }

  //---ユーティリティメソッド---

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

    jqueryMap.$buttonOK
      .click( onOK );
    jqueryMap.$buttonCancel
      .click( onCancel );

    return true;
  }

  removeLogin = function ( ) {
    //初期化と状態の解除
    if ( jqueryMap != null ) {
      if ( jqueryMap.$container ) {
        jqueryMap.$usernameTitle.remove();
        jqueryMap.$usernameTextbox.remove();
        jqueryMap.$PasswordTitle.remove();
        jqueryMap.$PasswordTextbox.remove();
        jqueryMap.$buttonOK.remove();
        jqueryMap.$buttonCancel.remove();
      }
    }
    return true;
  }

  return {
    configModule  : configModule,
    initModule    : initModule,
    removeLogin   : removeLogin
  };
}());
