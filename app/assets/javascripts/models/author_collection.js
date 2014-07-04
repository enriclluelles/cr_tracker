//= require ./author
(function(exports) {
  exports.AuthorCollection = Backbone.Collection.extend({
    model: exports.Author,
    url: '/api/authors'
  });
})(window.ComicBookmarkTracker.Models);
