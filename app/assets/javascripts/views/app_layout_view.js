(function(exports) {
  exports.AppLayoutView = Backbone.Marionette.LayoutView.extend({
    template: "#layout-view-template",

    regions: {
      content: "#content",
      menu: '#menu'
    }
  });
})(window.ComicBookmarkTracker);
