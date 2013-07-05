// Picasa Interface for Photo Galleries
// Chris Turner - https://github.com/gizmovation - MIT Licensed
(function($, window){

  window.picasa = {

    albumsUrl: function(username) {
      return 'http://picasaweb.google.com/data/feed/base/user/' + username
        + '?alt=json&hl=en_US&kind=album' 
        + '&fields=entry(id,media:group(media:content,media:title))' 
        + '&imgmax=288u';
    },

    photosUrl: function(username, albumId) {
      return 'http://picasaweb.google.com/data/feed/base/user/' + username + '/albumid/' + albumId
        + '?alt=json&hl=en_US&kind=photo' 
        + '&fields=entry(media:group(media:thumbnail,media:content,media:title))' 
        + '&thumbsize=160u&imgmax=800u';
    },

    albums: function(username, callback) {

      var url = picasa.albumsUrl(username);
      var albums = [];

      $.getJSON(url, function(data) {

        if (data && data.feed.entry) {
          $.each(data.feed.entry, function(i, item){
            var album = {};
            album.thumbnail = item.media$group.media$content[0].url;
            album.title = item.media$group.media$title.$t;
            var albumUrl = item.id.$t;
            album.id = albumUrl.substring(albumUrl.lastIndexOf("/") + 1, albumUrl.indexOf("?"));
            albums.push(album);
          });
        }

      }).done(function() {
        callback(albums);
      });

    },

    photos: function(username, albumId, callback) {

      var url = picasa.photosUrl(username, albumId);
      var photos = [];

      $.getJSON(url, function(data) {

        if (data && data.feed.entry) {
          $.each(data.feed.entry, function(i, item) {
            var photo = {};
            photo.thumbnail = item.media$group.media$thumbnail[0].url;
            photo.fullImage = item.media$group.media$content[0].url;
            photo.title = item.media$group.media$title.$t;
            photos.push(photo);
          });
        }

      }).done(function() {
        callback(photos);
      });
    }

  };

})(jQuery, window);