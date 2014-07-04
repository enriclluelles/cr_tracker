//= require ./comic_view
(function(exports) {
  exports.ComicCollectionView = Backbone.Marionette.CollectionView.extend({
    tagName: 'ul',
    childView: exports.ComicView
  });
})(window.ComicBookmarkTracker.Views);
