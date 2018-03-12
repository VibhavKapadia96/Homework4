(function (window) {
  "use strict";

  var App = window.App || {};
  var $ = window.jQuery;
  var x = null;
  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied");
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function (key, val) {
    $.post(this.serverUrl, val, function (serverResponse) {
      console.log(serverResponse);
      x = serverResponse.id;
    });
  };

  RemoteDataStore.prototype.getAll = function (cb) {
    $.get(this.serverUrl, function (serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function (key, cb) {
    $.get(this.serverUrl + "/" + x, function (serverResponse) {
    
      console.log(serverResponse);
      //var json = JSON.parse(serverResponse);
      alert(serverResponse.id);

      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function (key) {
    console.log(key);
    $.ajax(this.serverUrl + "/" + x, {
      type: "DELETE"
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
