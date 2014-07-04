//= require models/model
(function(exports) {
  exports.Author = exports.Model.extend({
    defaults: {
      name: ""
    },

    urlRoot: "/api/authors"
  });
})(window.ComicBookmarkTracker.Models);
