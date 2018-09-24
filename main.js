document.addEventListener("DOMContentLoaded", function (event) {
    var foodList = document.querySelector("#foodList")
    var form = document.querySelector("form")

    fetch("https://galvanize-eats-api.herokuapp.com/menu")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            for (let i = 0; i < data.menu.length; i++) {
                var dropdownMenu = document.createElement("option")
                foodList.appendChild(dropdownMenu)
                dropdownMenu.innerHTML = data.menu[i].name + " " + "$" + data.menu[i].price
                console.log(data.menu.length, i)
            }
        })
        .catch(function (error) {
            console.error(error)
        })
})