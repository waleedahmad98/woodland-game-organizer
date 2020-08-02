Vue.component('loader', {
    template: `<div class="game-container-loader">
    <p v-if="num_games===0">It's kinda lonely here.. try adding some games!</p>
    <div class="game-cell" v-for = "res in games">
    <div class = "container">
    <img class="game-img" @click="runGame(res.path)" :src="res.cover" tabindex="0">
    <button class="play-btn" @click="runGame(res.path)">	&#9654;</button>
    </div>
<h3 class="game-name"> {{res.name}} </h3>
</div>
</div>
    `,
    data: function() {
        return {
            games: [],
            num_games: 0

        }
    },
    methods: {
        runGame: function(path) {
            window.executeGame(path);
            window.close();
        },

        loadGames: function(data) {
            Vue.set(this, 'games', data);
        }
    },
    mounted: function() {
        this.loadGames(window.readSavedGames());
        EventBus.$on('game-added', this.loadGames);
        this.num_games = this.games.length;

    }
})

new Vue({
    el: '#loader-container'
})