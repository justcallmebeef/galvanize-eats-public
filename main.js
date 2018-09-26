document.addEventListener("DOMContentLoaded", function (event) {
    var foodList = document.querySelector("#foodList")
    var form = document.querySelector("form")
    var orderList = document.querySelector(".orderList")
    var addButton = document.querySelector("#addButton")
    var currentItem

    fetch("https://galvanize-eats-api.herokuapp.com/menu")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            for (let i = 0; i < data.menu.length; i++) {
                var dropdownMenu = document.createElement("option")
                foodList.appendChild(dropdownMenu)
                dropdownMenu.innerHTML = data.menu[i].name + " " + "$" + data.menu[i].price
                var item = JSON.stringify({
                    name: data.menu[i].name,
                    price: data.menu[i].price
                })
                dropdownMenu.setAttribute('value', item)
            }
            return data
        })
        .then(function (data) {
            foodList.addEventListener("change", function selectItem(event) {
                var valueSelected = foodList.value
                var item = JSON.parse(valueSelected)
                currentItem = item
            })
        })
        .then(function (data) {
            addButton.addEventListener("click", function addItem(event) {
                var quantity = document.getElementById("quantity").value
                var orderListItem = document.createElement("li")
                var subTotal = document.createElement("p")
                var tax = document.createElement("p")
                var total = document.createElement("p")
                orderList.appendChild(orderListItem)
                orderListItem.innerHTML = currentItem.name + " " + "$" + (currentItem.price * quantity)

                console.log(quantity)
            })
        })
        .catch(function (error) {
            console.error(error)
        });
});