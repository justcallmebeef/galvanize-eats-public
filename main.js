document.addEventListener("DOMContentLoaded", function (event) {
    var foodList = document.querySelector("#foodList")
    var form = document.querySelector("form")
    var orderList = document.querySelector(".orderList")
    var addButton = document.querySelector("#addButton")
    var totalContainer = document.querySelector("#totalContainer")
    var subTotal = document.createElement("p")
    var tax = document.createElement("p")
    var total = document.createElement("p")
    total.setAttribute('class', 'frogLeg')
    totalContainer.appendChild(subTotal)
    totalContainer.appendChild(tax)
    totalContainer.appendChild(total)
    var subTotalNum = 0
    var taxNum = 0
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
                orderList.appendChild(orderListItem)
                orderListItem.innerHTML = currentItem.name + " " + "$" + (currentItem.price * quantity)
            })
        })
        .then(function (data) {
            addButton.addEventListener("click", function addTotals(event) {
                var quantity = document.getElementById("quantity").value
                var subTotalValue = parseFloat(currentItem.price * quantity)
                subTotalNum += subTotalValue
                subTotal.innerHTML = "SubTotal:" + " " + "$" + subTotalNum.toFixed(2)

                var taxTotalValue = parseFloat(subTotalValue * .04)
                taxNum += taxTotalValue
                tax.innerHTML = "Tax:" + " " + "$" + taxNum.toFixed(2)

                var totalNum = 0
                var totalValue = parseFloat(taxNum + subTotalNum)
                totalNum += totalValue
                total.innerHTML = "Total:" + " " + "$" + totalNum.toFixed(2)
            })
        })
        .catch(function (error) {
            console.error(error)
        });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var submitButton = document.querySelector("#submitButton")
        var nameInput = document.querySelector("#name")
        var telephoneInput = document.querySelector("#phone")
        var addressInput = document.querySelector("#address")

        var delivery = {
            'name': nameInput.value,
            'telephone': telephoneInput.value,
            'address': addressInput.value,
        }

        console.log(delivery)

        var settings = {
            method: "POST",
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify(delivery)
        }
        fetch("https://galvanize-eats-api.herokuapp.com/orders", settings)
            .then(response => response.text())
            .then(function (response) {
                var saveStatus = document.querySelector("#save-status")
                saveStatus.innerHTML = response
                saveStatus.style.opacity = "1"
                setTimeout(function () {
                    saveStatus.style.opacity = "0"
                }, 2000)
            })
            .catch(function (error) {
                console.error(error)
            })

    })
});