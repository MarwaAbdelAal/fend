/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
let navLinks;
let listItems;
const mybutton = document.getElementById('myBtn');
const nav = document.querySelector('nav');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function buildNav() {
    const uList = document.querySelector('ul');
    sections.forEach((sec, i) => {
        uList.innerHTML += `<li><a class="menu__link" href="#section${i+1}">Section${i+1}</a></li>`;
    });
    nav.style.display = 'none';
}

function makeActive(section, index) {
        const { top } = section.getBoundingClientRect();
        if (top <= 100 && top >= -100){
            navActive(listItems[index], index);  // Activating the navigation item when a section is in the viewport
            section.classList.add('your-active-class');
            for (let i = 0; i < sections.length; i++) {
                if (index !== i) sections[i].classList.remove('your-active-class');
            }
    }
}

// function to activate the navigation item when a section is in the viewport
function navActive(listItem, index) {
    listItem.setAttribute('style', 'background: #666; color: #ffff;')
    for (let i = 0; i < listItems.length; i++) {
        if (i !== index) listItems[i].setAttribute('style',  'background: #fff; color: #000;')
    }
}

function getSectionByHref(aTag) {
    return document.getElementById(aTag.href.split('#')[1]);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
buildNav();
navLinks = document.querySelectorAll('a');
listItems = document.querySelectorAll('li');


// Add class 'active' to section when near top of viewport
function activeListener(event) {
    for (let i = 0; i < sections.length; i++) {
        makeActive(sections[i], i);
    }
    // Hide fixed navigation bar while not scrolling
    nav.style.display = 'block';
    setTimeout(() => {
        // nav stays visible on top of the page 
        if (window.pageYOffset > 150) nav.style.display = 'none';
    }, 2000);
}

// Add a scroll to top button on the page
function addScrollBtn(event) {
    if (window.pageYOffset > 100) {
        mybutton.style.display = 'block';
    }
    else mybutton.style.display = 'none';
}

// scroll up button clicked
function scrollToTop(event) {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Scroll to anchor ID using scrollTO event
function scrollListener(event) {
    event.preventDefault();
    const a = event.target;
    const section = getSectionByHref(a);
    section.scrollIntoView({ behavior: 'smooth' });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', scrollListener);
}

// Set sections as active

document.addEventListener('scroll', activeListener);
document.addEventListener('scroll', addScrollBtn);

// scroll up button clicked
document.getElementById('myBtn').addEventListener('click', scrollToTop);


document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        window.scrollTo({top: 0});
    }, 100);
});
