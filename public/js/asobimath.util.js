/*
 * asobimath.util.js
 * 汎用javascriptユーティリティ
 *
 * Michael S. Mikowski - mmikowski at gmail dot com
 * これらは、webからひらめきを得て、
 * 1998年から作成、コンパイル、アップデートを行ってきたルーチン。
 *
 * MITライセンス
 *
 * makeErrorとsetConfigMapは上記
 * 以降は追加したもの。
 */

asobimath.util = (function () {
  'use strict';

  let makeError, setConfigMap, isEmpty, makeDateStr;

  // パブリックコンストラクタ/makeError/
  makeError = function ( name_text, msg_text, data ) {
    let error     = new Error();
    error.name    = name_text;
    error.message = msg_text;

    if ( data ){ error.data = data; }

    return error;
  };

  // パブリックメソッド/setConfigMap/
  setConfigMap = function ( arg_map ){
    let
      input_map    = arg_map.input_map,
      settable_map = arg_map.settable_map,
      config_map   = arg_map.config_map,
      key_name, error;

    for ( key_name in input_map ){
      if ( input_map.hasOwnProperty( key_name ) ){
        if ( settable_map.hasOwnProperty( key_name ) ){
          config_map[key_name] = input_map[key_name];
        }
        else {
          error = makeError( 'Bad Input',
            'Setting config key |' + key_name + '| is not supported'
          );
          throw error;
        }
      }
    }
  };

  // オブジェクトが空かどうか判定
  isEmpty = function (obj) {
    return !Object.keys(obj).length;
  }

  // 日付を文字列で生成
  // dayOffsetは指定日からどれだけずらすかを指定する
  // 1 なら翌日
  // -1 なら前日
  makeDateStr = function (y, m, d, dayOffset=0) {
    let today,
        dayOfWeek = ['日','月','火','水','木','金','土'];

    if ( y === undefined || m === undefined || d === undefined ) {
      today = new Date();
    } else {
      today = new Date(y, m, d);
    }

    if ( dayOffset !=  0 ) {
      today.setDate(today.getDate() + dayOffset);
    }

    return (today.getMonth() + 1) + '/' + //月だけ0始まり
            today.getDate() +
            '(' + dayOfWeek[today.getDay()] + ')';
  }

  return {
    makeError    : makeError,
    setConfigMap : setConfigMap,
    isEmpty      : isEmpty,
    makeDateStr  : makeDateStr
  };
}());
