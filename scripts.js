function prepSearch(e) {
    if (e.keyCode == 13) {
        var s = document.getElementById("search-bar");
        if (s != "")
            document.getElementsByClassName("material-icons search-btn")[0].click();
        return false;
    }
}

function enableFileBtn() {
    document.getElementById("file-btn").disabled = false;

}

function enableAddBtn() {
    document.getElementById("add-game").disabled = false;
}