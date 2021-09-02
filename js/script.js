const searchBox = document.getElementById("search-input")
const countBook = document.getElementById("count-book")
const resultFound = document.getElementById("error-handling")

const toggleSpinner = displayStyle => {
    document.getElementById("spinner").style.display = displayStyle;
}


document.getElementById("search-btn").addEventListener("click", () => {
    // display spinner
    toggleSpinner("block")
    resultFound.innerText = ""
    search = searchBox.value;
    searchBox.value = ""
    const url = `https://openlibrary.org/search.json?q=${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data.docs))
})


const displayResult = books => {
    toggleSpinner("none")
    const bookContainer = document.getElementById("book-container")
    bookContainer.textContent = ""
    let count = 0;
    if (!books.lenght) {
        resultFound.innerText = "Result Not Found"
        countBook.innerText = ""
    }
    books.forEach(book => {
        resultFound.innerText = ""
        countBook.innerText = "Total Book Found: " + count++;
        console.log(book);
        const div = document.createElement("div")
        div.classList.add("col")
        div.innerHTML = `
        <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="..." height="450px">
        <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <h6>Author Name: ${book.author_name[0]}</h6>
            <h6>First Published: ${book.first_publish_year}</h6>
        </div>
    </div>
        `
        bookContainer.appendChild(div)
    });

}

// function authorKey(authorkey) {
//     fetch(`https://openlibrary.org/authors/${authorkey}.json`)
//         .then(res => res.json())
//         .then(data => console.log(data.name))
// }


// function displayAuthor(authorName) {
//     return authorName.name;
// }
