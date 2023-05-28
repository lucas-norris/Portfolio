// Hide Header on on scroll down
let didScroll
let lastScrollTop = 0
let delta = 5
let navbarHeight = $('nav').outerHeight()

$(window).scroll(function (event) {
  didScroll = true
})

setInterval(function () {
  if (didScroll) {
    hasScrolled()
    didScroll = false
  }
}, 250)

function hasScrolled() {
  let st = $(this).scrollTop()

  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta) return

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $('#top-nav').removeClass('nav-down').addClass('nav-up')
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $('#top-nav').removeClass('nav-up').addClass('nav-down')
    }
  }

  lastScrollTop = st
}

// Get references to the button and aside element
const button = document.querySelector('.hamburger')
const aside = document.querySelector('.menu-sidebar')
const hamBoxInner = document.querySelector('.ham-box-inner')
const menuLinks = document.querySelectorAll('.menu-sidebar a') // Get all the <a> elements inside the menu-sidebar
const body = document.querySelector('body')
const mainSection = document.querySelector('main')

// Add click event listener to the button
button.addEventListener('click', function () {
  toggleMenu()
})

// Add click event listener to each menu link
menuLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    toggleMenu()
  })
})

// Function to toggle the menu visibility
function toggleMenu() {
  // Toggle the aria-hidden attribute of the aside element
  const isHidden = aside.getAttribute('aria-hidden') === 'true'
  aside.setAttribute('aria-hidden', !isHidden)
  aside.classList.toggle('menu-sidebar-visible')
  hamBoxInner.classList.toggle('ham-box-inner-x')

  // Change the tabindex attribute of the aside element
  const tabindexValue = isHidden ? '1' : '-1'
  aside.setAttribute('tabindex', tabindexValue)

  //Toggle scroll disable on body element
  body.classList.toggle('menu-open')

  //Toggle blur effect on main section
  mainSection.classList.toggle('blur')

  //Disable scroll on mobile devices
  if (isMobileDevice()) {
    toggleMobileScroll(!isHidden)
  }
}

// Function to check if the user is on a mobile device
function isMobileDevice(disableScroll) {
  if (disableScroll) {
    body.addEventListener('touchmove', preventDefault, { passive: false })
  } else {
    body.removeEventListener('touchmove', preventDefault)
  }
}

// Function to prevent default touchmove event
function preventDefault(e) {
  e.preventDefault()
}
