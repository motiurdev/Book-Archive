const searchBox = document.getElementById("search-input")
const countBook = document.getElementById("count-book")
const resultFound = document.getElementById("error-handling")

// spinner toggle function
const toggleSpinner = displayStyle => {
    document.getElementById("spinner").style.display = displayStyle;
}


document.getElementById("search-btn").addEventListener("click", () => {
    // display spinner
    toggleSpinner("block")
    resultFound.innerText = ""
    // take search value
    search = searchBox.value;
    // clear input
    searchBox.value = ""
    // loading api data
    const url = `https://openlibrary.org/search.json?q=${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data.docs))
})


const displayResult = books => {
    // hide spinner
    toggleSpinner("none")
    // get html div container
    const bookContainer = document.getElementById("book-container")
    // clear div container
    bookContainer.textContent = ""
    // Result Not Found message
    if (!books.lenght) {
        resultFound.innerText = "Result Not Found"
        // clear book found number
        countBook.innerText = ""
    }
    let count = 0;
    books.forEach(book => {
        // empty result not found
        resultFound.innerText = ""
        // count founded books
        countBook.innerText = "Total Book Found: " + count++;
        // create div
        const div = document.createElement("div")
        div.classList.add("col")
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="..." height="450px">
            <div class="card-body">
                <h4 class="card-title">${book.title}</h4>
                <h6>Author Name: ${book.author_name[0] ? book.author_name[0] : "Not Available"}</h6>
                <h6>Publisher: ${book.publisher[0] ? book.publisher[0] : "Not Available"}</h6>
                <h6>First Published: ${book.first_publish_year ? book.first_publish_year : "Not Available"}</h6>
            </div>
        </div>
        `
        // append div
        bookContainer.appendChild(div)
    });

}
