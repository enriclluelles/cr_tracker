//= require ./author_view
(function(exports) {
  exports.AuthorCollectionView = Backbone.Marionette.CollectionView.extend({
    tagName: 'ul',
    childView: exports.AuthorView
  });
})(window.ComicBookmarkTracker.Views);
