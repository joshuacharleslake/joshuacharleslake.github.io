// Custom Tabs
class Tabs {
    constructor(tab, content) {
        this.tab = tab;
        this.content = content;
    }

    openTab() {
        const tabHeading = [...document.querySelectorAll(this.tab)];
        const tabContent = [...document.querySelectorAll(this.content)];

        tabHeading.forEach(item => {
            item.addEventListener('click', () => {
                // emove is-active class from other headings and tab content
                tabHeading.forEach(element => {
                    if (element.classList.contains('is-active')) {
                        element.classList.remove('is-active');
                    }
                });

                tabContent.forEach(element => {
                    if (element.classList.contains('is-active')) {
                        element.classList.remove('is-active');
                    }
                });

                // Adding active states to selected items
                item.classList.add('is-active');
                document
                    .querySelector(`#${item.getAttribute('data-tab')}`)
                    .classList.add('is-active');
            });
        });
    }
}

const TabsInit = () => {
    new Tabs('.tab-heading', '.tab-content').openTab();
};

TabsInit();
