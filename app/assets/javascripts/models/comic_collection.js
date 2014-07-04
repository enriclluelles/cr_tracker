//= require ./comic
(function(exports) {
  exports.ComicCollection = Backbone.Collection.extend({
    model: exports.Comic,
    url: '/api/comics'
  });
})(window.ComicBookmarkTracker.Models);
