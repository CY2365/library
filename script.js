let myLibrary = [];
let mainTable = document.querySelector("#main-table");
let addButtonRef = document.querySelector('#add')
addButtonRef.addEventListener('click', addBook)

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

let hobbit = new Book('The Hobbit', 'Tolkien', 295, true)
let harry = new Book('Harry Potter', 'JK Rowling', 500, false)
hobbit.id = 1;
harry.id = 2;
myLibrary.push(hobbit)
myLibrary.push(harry)


function refreshTable() {
    removeRows();
    for (let book of myLibrary) {
        let row = document.createElement('tr')

        for (let i in book) {

            if (typeof book[i] == 'boolean') {
                let cell = document.createElement('td');
                let checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");
                checkbox.checked = book[i]
                checkbox.className = book.id
                cell.appendChild(checkbox)
                row.appendChild(cell)
            } else {
                let cell = document.createElement('td');
                cell.textContent = book[i];
                cell.className = i
                row.appendChild(cell)
                
            }
            
            row.classList.add('row');
        }
        let removeButton = document.createElement('button')
        removeButton.innerText = 'X';
        removeButton.className = 'delete';
        removeButton.id = book.id;
        let cell = document.createElement('td');
        cell.appendChild(removeButton)
        row.appendChild(cell)
        mainTable.appendChild(row) 
    }
}

function addBook() {
    let title = prompt('Enter title', '')
    let author = prompt('Enter author', '')
    let pages = prompt('Enter number of pages', '')
    let readQuestion = prompt('Did you read the book? y/n', 'n')
    let read;
    if (readQuestion.toLowerCase() == 'n') {
        read = false;
    } else {
        read = true
    }
    let newBook = new Book(title, author, pages, read)
    newBook.id = myLibrary.length + 1;
    myLibrary.push(newBook);
    updatePage();
}

function removeRows() {
    let rows = document.querySelectorAll('.row');
    for (let row of rows) {
        row.remove();
    }
}
function updateRead(e) {
    for (let book of myLibrary) {
        if (book.id == e.target.className){
            book.read = e.target.checked;
            console.log(book);
        }  
    }
}

function listenCheckbox() {
    let inputs = document.querySelectorAll("input[type='checkbox']");
    // console.log(inputs)
    for (let box of inputs) {
        box.addEventListener('change', updateRead)
    }
}

function deleteBook(e) {
    console.log(e)
    
    for (let book of myLibrary) {
        if (book.id == e.target.id) {
            let index = myLibrary.indexOf(book);
            console.log(index)
            myLibrary.splice(index, 1)
        }
    }
    updatePage();
}

function listenDelete() {
    let delButtons = document.querySelectorAll('.delete');
    for (let button of delButtons) {
        button.addEventListener('click', deleteBook)
    }
}

function updatePage() {
    refreshTable();
    listenCheckbox();
    listenDelete();
}

updatePage()
