const url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&prop=images&format=json&gsrnamespace=0&srlimit=20&srsearch=",
    form = document.querySelector("form"),
    input = document.querySelector("input"),
    result = document.querySelector(".results");



form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value === "") {
        alert("Entry is Empty! Try again")
    } else {

        clearPage();
        getData();
    }
});

async function getData() {
    let rsp = await fetch(url + input.value);
    let value = await (rsp.json());
    // console.log(value);
    result.innerHTML += `<hr>`
    printvalues(value.query.search);
}

function printvalues(res) {
    for (val in res) {
        result.innerHTML += `
            <div class="result p-2 d-flex">
                <!--img src="./images/wiki.png" alt=""-->
                <div class = "h-100vh d-flex flex-column justify-content-center">
                   <a href="https://en.wikipedia.org/w/index.php?curid=${res[val].pageid}" target="_blank" rel="noopener" class="h3 fw-bold">${res[val].title}</a>
                   <a href="https://en.wikipedia.org/w/index.php?curid=${res[val].pageid}" target="_blank" rel="noopener" class="fs-5 text-success">https://en.wikipedia.org/w/index.php?curid=${val}</a>
                   <p class="fs-5 mb-5">${res[val].snippet}</p>
                </div>
            </div>
        `
    }
}

function clearPage() {
    result.innerHTML = "";
}