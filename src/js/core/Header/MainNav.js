// // Main Navigation Code
//
// import throttle from 'lodash/throttle';
//
// // Controls whether the submenu drops left or right of the link
// const subPosition = () => {
//     const screenWidth = document.body.clientWidth;
//     const twoThirdScreen = (screenWidth / 3) * 2;
//     const subMenus = [...document.querySelectorAll('.sub-menu')];
//
//     subMenus.forEach(submenu => {
//         const submenuEl = submenu;
//         if (submenuEl.getBoundingClientRect().left > twoThirdScreen) {
//             submenuEl.classList.add('sub-menu-left');
//         } else {
//             submenuEl.classList.remove('sub-menu-left');
//         }
//
//         if (screenWidth > 767) {
//             submenuEl.style.maxHeight = `${submenuEl.scrollHeight}px`;
//         } else {
//             submenuEl.style.maxHeight = '0px';
//         }
//     });
// };
//
// // Burger Nav Toggle / Menu Toggle
// const toggleNav = () => {
//     const burgerNav = document.querySelector('.js-menu-toggle');
//
//     if (burgerNav) {
//         document.querySelector('.js-main-nav').classList.toggle('is-active');
//
//         burgerNav.classList.toggle('is-active');
//     }
// };
//
// // Sub Menus
// const toggleSubs = () => {
//     [...document.querySelectorAll('.js-sub-button')].forEach(button => {
//         button.addEventListener('click', e => {
//             e.target.classList.toggle('is-active');
//
//             if (e.target.classList.contains('is-active')) {
//                 e.target.nextElementSibling.style.maxHeight = `${e.target.nextElementSibling.scrollHeight}px`;
//             } else {
//                 e.target.nextElementSibling.style.maxHeight = '0px';
//             }
//         });
//     });
// };
//
// const MainNav = () => {
//     subPosition();
//     toggleSubs();
//     window.addEventListener('resize', throttle(subPosition, 2000));
//     document.querySelector('.js-menu-toggle').addEventListener('click', toggleNav);
// };
//
// MainNav();
