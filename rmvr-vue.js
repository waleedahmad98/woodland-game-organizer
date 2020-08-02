Vue.component('rmvr', {
    template: `
    <div class="game-container-loader">
    <div>
    <button class="gg-chevron-left back-btn" onclick="location.href='./main.html';"></button>
    </div>
    <div class="game-cell" v-for = "res in games">
    <div class="container">
<img class="game-img"  @click = "deleteGame(res.name)" height="200" width="350" :src="res.cover" tabindex="0">
</div>
<h3 class="game-name"> {{res.name}} </h3>
</div>   
</div>
`,
    data: function() {
        return {
            games: []
        }
    },
    methods: {
        deleteGame: function(name) {
            let updated_games = [];
            var length = this.games.length;
            for (var i = 0; i < length; i++) {
                if (this.games[i].name != name) {
                    updated_games.push(this.games[i]);
                }
            }
            let data = JSON.stringify(updated_games);
            console.log(data);
            if (confirm('Are you sure you want to remove ' + name + ' from your library?')) {
                window.saveJSON(data);
                window.location = "./main.html";
                window.dialogBox('Success', name + ' removed from Library!')
            }
        },
        loadGames: function(data) {
            Vue.set(this, 'games', data);
        }
    },
    mounted: function() {
        this.loadGames(window.readSavedGames());
    }

})

new Vue({
    el: '#rmv-vue'
})