//= require models/model
(function(exports) {
  exports.Comic = exports.Model.extend({
    defaults: {
      title: '',
      synopsis: ''
    },

    urlRoot: "/api/comics"
  });
})(window.ComicBookmarkTracker.Models);
