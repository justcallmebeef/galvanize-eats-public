document.addEventListener("DOMContentLoaded", function (event) {
    var foodList = document.querySelector("#foodList")
    var form = document.querySelector("form")
    var orderList = document.querySelector(".orderList")
    var addButton = document.querySelector("#addButton")
    var menuSelectionPrice
    var menuSelection

    fetch("https://galvanize-eats-api.herokuapp.com/menu")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            for (let i = 0; i < data.menu.length; i++) {
                var dropdownMenu = document.createElement("option")
                foodList.appendChild(dropdownMenu)
                dropdownMenu.innerHTML = data.menu[i].name + " " + "$" + data.menu[i].price
                dropdownMenu.setAttribute('value', data.menu[i].name)
                // dropdownMenu.setAttribute('value', data.menu[i].price)
            }
            return data
        })
        .then(function (data) {
            foodList.addEventListener("change", function selectItem(event) {
                console.log(event.target)
                var valueSelected = foodList.value
            })
        })
        .then(function (data) {
            addButton.addEventListener("click", function addItem(event) {
                var orderListItem = document.createElement("li")
                var valueSelected = document.createTextNode(foodList.value)
                orderList.appendChild(orderListItem)
                orderListItem.appendChild(valueSelected)
            })
        })
        .catch(function (error) {
            console.error(error)
        });
});