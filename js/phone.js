// https://openapi.programming-hero.com/api/phones?search=iphone
const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data
    displayPhones(phones)
}
const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container')
    phones.forEach(phone => {
        // create a div
        console.log(phone)
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
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>`
        phoneContainer.append(phoneCard)
    });
}
// handle search button
const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value
}
loadPhone();
