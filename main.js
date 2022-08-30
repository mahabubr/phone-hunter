const loadData = async (search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json()
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container')
    phonesContainer.textContent = ''

    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10)
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    const notFound = document.getElementById('not-found');
    if (phones.length === 0) {
        notFound.classList.remove('d-none')
    }
    else {
        notFound.classList.add('d-none')
    }

    phones.forEach(phone => {
        const { image, phone_name, brand, slug } = phone
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
                      <div class="card p-3 shadow">
                        <img src="${image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone_name}</h5>
                          <p class="card-text">Brand Name: ${brand}</p>
                          <button onclick="loadPhoneDetails('${slug}')" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#phoneDeatilsModal">Show Details</button>
                        </div>
                      </div>
        `
        phonesContainer.appendChild(phoneDiv)
    })
    toggleSpinner(false)
}

const processClickedSearch = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('exampleFormControlInput1')
    const searchValue = searchField.value;
    loadData(searchValue, dataLimit)
}

document.getElementById('btn-search').addEventListener('click', function () {
    processClickedSearch(10)
})

document.getElementById('exampleFormControlInput1').addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        processClickedSearch(10)
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    processClickedSearch()
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json()
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone => {
    const { name, releaseDate } = phone;

    const modalTitle = document.getElementById('phoneDeatilsModalLabel');
    modalTitle.innerHTML = name;

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>${releaseDate ? releaseDate : 'This Phone Release Too Long A'}</p>
    `
}

loadData('apple')