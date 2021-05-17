Vue.component('adder', {
    template: `<div>
    <div class="search-bar-container">
    <h2 id="adder-title">Add Game</h2>
    <input type="search" placeholder="search here.." id="search-bar" v-model="searched_item" onkeypress="return prepSearch(event)" ><button class="material-icons search-btn" @click="search(searched_item)">search</button><br/>
<input type = "file" title="exe-file" style="color:transparent;" id="file-btn" accept=".exe" onchange="enableAddBtn()" disabled><br/>
<div style="display:flex;  justify-content: center;">
<button id="add-game" @click="saveFile">ADD</button><br/>
<button class="back-btn" onclick="location.href='./main.html';">BACK</button>
</div>
<p style="color: lightgreen;">{{to_add_name}}</p>
</div>
<p v-if="state === 0" style="font-family: D-DIN"> search for a game to add! </p>

<div v-if="state===1" class="lds-ripple"><div></div><div></div></div>

<div class="game-container">
<div class="game-cell" v-for = "res in results">
<div class="container">
<img class="game-img" onclick="enableFileBtn()" @click="setDetails(res.name, res.cover)" :src="res.cover" tabindex="0">
</div>
<h3 class="game-name"> {{res.name}} </h3>
</div>
</div>
</div>
`,
    data: function() {
        return {
            state: 0, //0 - not loading, 1- loading, 2 - loaded
            results: [],
            searched_item: '',
            current_games: [],
            to_add_name: '',
            to_add_cover: '',
            to_add_path: ''
        }
    },
    methods: {
        search: async function(searched_item) {
            if (searched_item != "") {
                this.changeState(1);
                //let resp = await fetch(`https://rawg.io/api/games?page_size=20&search=${searched_item}&page=1&page_size=5`);
                //let results = (await resp.json()).results;

                let res = await fetch(`https://www.igdb.com/search?type=1&q=${searched_item}`);
                //let dom = new jsdom.JSDOM(await res.text());
                let text = await res.text()
                let dom  = window.getDOM(text);
                console.log(dom);
                let json = dom.window.document.getElementById('results_json').getAttribute('data-json');
                let results = JSON.parse(json);
                this.results = results.map(x => ({
                    name: x.data.name,
                    cover: `https://images.igdb.com/igdb/image/upload/t_cover_big/${x.data.cloudinary}.jpg`

                }));
                this.changeState(2);
            }
        },

        saveFile: async function() {
            if (document.getElementById("file-btn").files.length == 0)
                window.dialogBox("Invalid Action", "Please select a search game and then choose an executable file for that game!");
            else {
                this.to_add_path = document.getElementById("file-btn").files[0].path;
                this.to_add_name = this.to_add_name.replace(":", "");
                let new_game = { name: this.to_add_name, cover: this.to_add_cover, path: this.to_add_path };
                this.current_games = window.readSavedGames();
                this.current_games.push(new_game);
                let data = JSON.stringify(this.current_games);
                window.saveJSON(data);
                window.dialogBox('Success!', `${this.to_add_name} added to Library!`);
                EventBus.$emit('game-added', this.current_games);
                window.location = "./main.html";
            }

        },
        setDetails: function(name, cover) {
            console.log(name);
            this.to_add_name = name;
            this.to_add_cover = cover;
            document.getElementById('file-btn').click();
        },
        changeState: function(s) {
            this.state = s;
        }
    }
})

new Vue({
    el: '#adder-vue'
})