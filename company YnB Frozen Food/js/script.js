const btnburger = document.querySelector('#burger-menu')
const navbarnav = document.querySelector('.navbar-nav')

btnburger.onclick = () => {
    navbarnav.classList.toggle('active')
}
document.addEventListener('click', (e) => {
    if (!navbarnav.contains(e.target) && !btnburger.contains(e.target)) {
        navbarnav.classList.remove('active')
    }
})