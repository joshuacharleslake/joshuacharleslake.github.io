// Open Search Menu

const Search = () => {
    let searchOpen = false;
    const searchToggle = document.querySelector('#js-search-toggle');

    if (searchToggle) {
        document.querySelector('#js-search-toggle').addEventListener('click', () => {
            const search = document.getElementById('js-search');

            search.style.display = searchOpen ? 'none' : 'block';

            if (searchOpen) {
                searchOpen = false;
            } else {
                searchOpen = true;
            }
        });
    }
};

Search();
