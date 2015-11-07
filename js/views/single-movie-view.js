var app = app || {};

(function ($) {
    'use strict';

    var SingleMovieView = Backbone.View.extend({

        el: '.single-movie',
        movie: null,
        singleMovieTemplate: _.template($('#single-movie-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
            var that = this;
            if(that.movie){
                that.movie.bind("change", function () {
                    that.render(that.movie.trackId);
                });
            }
        },

        render: function (movieID) {
            var that = this;
            that.movie = new app.Movie({id: movieID});
            var complete = _.invoke([that.movie], 'fetch');
            $.when.apply($, complete).done(function() {
                    that.movie.attributes.releaseDate = that.movie.attributes.releaseDate.substring(0,10);

                    that.$el.html(that.singleMovieTemplate({
                        movie: that.movie.attributes
                    }));
            });
        },

        get: function (options) {
            var that = this;
            if (options.movieID) {
                that.render(options.movieID);
            }

        }


    });
    app.SingleMovieView = new SingleMovieView();

})(jQuery);