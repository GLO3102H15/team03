var app = app || {};

(function ($) {
    'use strict';

    var SingleActorView = Backbone.View.extend({

        el: '.single-actor',
        actor: null,
        actorMovies: null,

        singleActorTemplate: _.template($('#single-actor-template').html()),

        events: {
        },

        initialize: function () {
            _.bindAll(this, 'render');
            var that = this;
            if(that.actor){
                that.actor.bind("change", function () {
                    that.render(that.actor.artistId);
                });
            }
        },

        render: function (actorID) {
            var that = this;
            that.actor = new app.Actor({id: actorID});
            that.actorMovies = new app.ActorMovies();
            that.actorMovies.url = that.actorMovies.url.replace(':id', actorID);

            var complete = _.invoke([this.actor, this.actorMovies], 'fetch');
            $.when.apply($, complete).done(function() {
                var myModel;
                for(var i=0; i<that.actorMovies.length; i++) {
                    myModel = that.actorMovies.models[i];
                    myModel.attributes.releaseDate = myModel.attributes.releaseDate.substring(0,10);
                    myModel.attributes.artworkUrl100 = myModel.attributes.artworkUrl100.replace("100","300").replace("100","300");
                }
                that.$el.html(that.singleActorTemplate({
                    actor: that.actor,
                    movies: that.actorMovies.models
                }));
            });
        },
        get: function (options) {
            var that = this;
            if (options.actorID) {
                that.render(options.actorID);
            }

        }

    });
    app.SingleActorView = new SingleActorView();

})(jQuery);