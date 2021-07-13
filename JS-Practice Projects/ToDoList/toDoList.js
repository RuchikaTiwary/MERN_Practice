let item = document.getElementById("toDoItem");
let output = document.getElementById("result");
let toDoBtn = document.getElementById("btnTodo");

toDoBtn.onclick = function () {
    const toDoText = item.value;
    storeItem(toDoText);
}

function storeItem(item) {
    let items = getItems();
    if (items != undefined && items != "") {
        items = `${items} , ${item}`;
    } else {
        items = item;
    }
    saveToDos(items);
}

function saveToDos(items) {
    Lockr.set('Items', items);
    displayItems(items);
    clearEntry();
}

function getItems() {
    const toDos = Lockr.get('Items');
    return toDos;
}

function clearEntry() {
    output.value = "";
}

function displayItems(items) {
    if (items != undefined && items != "") {
        const itemArray = items.split(',');
        let out = '<ul class="list">';
        for (var x = 0; x < itemArray.length; x++) {
            out += ' <li class="list-item list-item--longdivider"><div class="list-item__center list-item--longdivider__center">';
            out += itemArray[x] + "</div>";
            out += '<div class="list-item__right" onclick="deleteItem(' + x + ');"><i class="zmdi zmdi-delete"></i></div></li>';
        }
        out += "</ul>"
        output.innerHTML = out;
    }
}

function deleteItem(itemToDelete) {
    let items = getItems();
    let itemArray = items.split(',');
    let newItems = new Array();
    for (var x = 0; x < itemArray.length; x++) {
        if (x != itemToDelete) {
            newItems.push(itemArray[x]);
        }
    }
    displayItems(newItems.join());
    saveToDos(newItems.join());
}