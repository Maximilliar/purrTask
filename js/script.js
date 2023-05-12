// ---- Cookie Overlay ----

let cookieOverlay = document.getElementById('overlay');
let cookieClose = document.getElementById('hide_popup');

setTimeout(() => {
    showCookie();
}, 2000);

function showCookie() {
    cookieOverlay.style.display = 'block';
    cookieOverlay.classList.add('animate__animated');
    cookieOverlay.classList.add('animate__fadeInUp');
    cookieOverlay.classList.add('animate__slow');
}

function closeCookie() {
    cookieClose.addEventListener('click', () => {
        cookieOverlay.classList.remove('animate__fadeInUp');
        cookieOverlay.classList.add('animate__fadeOutDown');
        setTimeout(() => {
            cookieOverlay.style.display = 'none';
        }, 2000);
    });
}

closeCookie();

// ----Check Form ----

let form = document.querySelector('form');
let input = document.querySelectorAll('form input');
let buttonSend = document.querySelector('.form_button');

buttonSend.addEventListener('click', (e) => {
    e.preventDefault();

    input.forEach((item) => {
        if (item.value === '') {
            item.classList.add('red-border');
        }
        setTimeout(() => {
            item.classList.remove('red-border');
        }, 2000);
    });
    clearForm();
});

function clearForm() {
    let arrSome = Array.from(input).some(item => item.value === '');
    if (arrSome) {
        console.log('Не заполнены поля ввода!');
    } else {
        let arr = Array.from(input).map((item) => item.value = "");
        return arr;
    }
}

