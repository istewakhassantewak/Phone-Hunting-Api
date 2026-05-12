// https://openapi.programming-hero.com/api/phones?search=iphone
const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    displayPhones(phones, isShowAll)
}
const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');

    // clear phone container cards before adding new cards
    phoneContainer.textContent = ''

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    // diplay only first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // create a div
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card bg-gray-100  p-4 shadow-xl`;
        phoneCard.innerHTML = `<figure>
                        <img src="${phone.image}"
                            alt="Phone" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts
                        </p>
                        <div class="card-actions justify-center">
                            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>`
        phoneContainer.append(phoneCard)
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}


// 
const handleShowDetail = async (id) => {
    //    load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data
    showPhoneDetails(phone)
}
const showPhoneDetails = (phone) => {
    console.log(phone)


    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `<div class="bg-gray-100 flex items-center justify-center py-5">
    <img src="${phone.image}"  alt="phone">
</div>
                <h3 class="text-3xl font-bold">${phone?.name ?? 'not provided'}</h3>
                <p class="font-medium text-lg text-gray-600"><span class="font-bold text-xl text-black">Storage:</span>
                    ${phone?.mainFeatures?.storage ?? 'not provided'}</p>
                <p class="font-medium text-lg text-gray-600"><span class="font-bold text-xl text-black">Display Size:</span>
                    ${phone?.mainFeatures?.displaySize ?? 'not provided'}</p>
                <p class="font-medium text-lg text-gray-600"><span class="font-bold text-xl text-black">Chipset:</span>
                    ${phone?.mainFeatures?.chipSet ?? 'not provided'}</p>
                <p class="font-medium text-lg text-gray-600"><span class="font-bold text-xl text-black">Memory:</span>
                    ${phone?.mainFeatures?.memory ?? 'not provided'}</p>
                <p class="font-medium text-lg text-gray-600"><span class="font-bold text-xl text-black">Slug:</span> ${phone?.slug ?? 'not provided'}
                </p>
                <p class="font-medium text-lg text-gray-600"><span class="font-bold text-xl text-black">Release Date:
                    </span>${phone?.releaseDate ?? 'not provided'}</p>
                <p class="font-medium text-lg text-gray-600"><span class="font-bold text-xl text-black">Brand:</span> ${phone?.brand ?? 'not provided'}
                </p>
                <p class="font-medium text-lg text-gray-600"><span class="font-bold text-xl text-black">GPS:</span> ${phone?.others?.GPS ?? 'not provided'}
                </p> `


    show_details_modal.showModal();
}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);

}
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');

    if (isLoading) {
        loadingSpinner.classList.remove("hidden");
    } else {
        loadingSpinner.classList.add("hidden");
    }
}
// handle show all
const handleShowAll = () => {
    handleSearch(true);
}

loadPhone(13);
