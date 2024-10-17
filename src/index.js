console.log('%c HI', 'color: firebrick');
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

document.addEventListener('DOMContentLoaded', () => {
    const breedDropdown = document.getElementById('breed-dropdown');
    const ul = document.getElementById('dog-breeds');

    // Fetch and display dog images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const dogImages = data.message;
            const container = document.getElementById("dog-image-container");

            dogImages.forEach(dog => {
                const img = document.createElement('img');
                img.src = dog;
                container.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching dog images:', error));

    // Fetch and display dog breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const dogBreeds = data.message;
            populateBreeds(dogBreeds);

            breedDropdown.addEventListener('change', (event) => {
                const selectedLetter = event.target.value;
                filterBreeds(dogBreeds, selectedLetter);
            });
        })
        .catch(error => console.error('Error fetching dog breeds:', error));

    // Function to populate breeds
    function populateBreeds(dogBreeds) {
        ul.innerHTML = ''; 
        for (const breed in dogBreeds) {
            if (dogBreeds.hasOwnProperty(breed)) {
                const li = document.createElement('li');
                li.innerText = breed;
                ul.appendChild(li);

                li.addEventListener('click', () => {
                    li.style.color = 'red'
                })
            }
        }
    }

    // Function to filter breeds based on selected letter
    function filterBreeds(dogBreeds, letter) {
        ul.innerHTML = ''; 
        for (const breed in dogBreeds) {
            if (dogBreeds.hasOwnProperty(breed) && breed.startsWith(letter)) {
                const li = document.createElement('li');
                li.innerText = breed; 
                ul.appendChild(li);
            }
        }
    }
});
