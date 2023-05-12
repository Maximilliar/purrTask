const backSlideBtn = document.querySelector('.carousel_controls-back');
const forwardSlideBtn = document.querySelector('.carousel_controls-forward');
const slides = document.querySelectorAll('.carousel_item');
const dots = document.querySelectorAll('.carousel_dots-item');
const slideWidth = 600;
const animationDuration = 505;
const animationStep = 10;
const lastSlideDelay = 510;
const shiftStep = 12;
const activeDotClassName = 'carousel_dots-item--active';
let currentPosition = 0;
let currentSlideIndex = 0;
let isAnimationCompleted = true;

for (const slide of slides) {
    const index = Array.from(slides).indexOf(slide);
    slide.dataset.index = index;
    slide.style.left = `${currentPosition}px`;
    currentPosition += slideWidth;
}

backSlideBtn.addEventListener('click', () => {
    if (isAnimationCompleted) {
        isAnimationCompleted = false;
        currentSlideIndex -= 1;

        if (currentSlideIndex < 0) {
            currentSlideIndex = slides.length - 1;

            for (let i = 1; i < slides.length; i++) {
                const currentPosition = parseInt(slides[i].style.left);
                const targetPosition = currentPosition - slideWidth * slides.length;
                slides[i].style.left = `${targetPosition}px`;
            }

            moveLastSlide(0, 'back');
        }

        moveAllSlides('back');
        changeActiveDot();
    }
});

forwardSlideBtn.addEventListener('click', () => {
    if (isAnimationCompleted) {
        isAnimationCompleted = false;
        currentSlideIndex += 1;

        if (currentSlideIndex > slides.length - 1) {
            currentSlideIndex = 0;

            for (let i = 0; i < slides.length - 1; i++) {
                const currentPosition = parseInt(slides[i].style.left);
                const targetPosition = currentPosition + slideWidth * slides.length;
                slides[i].style.left = `${targetPosition}px`;
            }

            moveLastSlide(slides.length - 1, 'forward');
        }

        moveAllSlides('forward');
        changeActiveDot();
    }
});

function moveLastSlide(lastSlideIndex, direction) {
    const currentPosition = slideWidth * (slides.length - 1);
    const timer = setInterval(() => {
        if (direction === 'back') {
            slides[lastSlideIndex].style.left = `-${currentPosition}px`;
        }

        if (direction === 'forward') {
            slides[lastSlideIndex].style.left = `${currentPosition}px`;
        }

        clearInterval(timer);
    }, lastSlideDelay);
}

for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', () => {
        if (isAnimationCompleted === true) {
            isAnimationCompleted = false;

            if (currentSlideIndex === i) {
                return;
            }

            currentSlideIndex = i;

            for (const slide of slides) {
                if (parseInt(slide.dataset.index) === i) {
                    if (parseInt(slide.style.left) > 0) {
                        const steps = parseInt(slide.style.left) / slideWidth;
                        moveAllSlides('forward', steps);
                    }

                    if (parseInt(slide.style.left) < 0) {
                        const steps = Math.abs(parseInt(slide.style.left) / slideWidth);
                        moveAllSlides('back', steps);
                    }

                    changeActiveDot(i);
                }
            }
        }
    });
}

function slideMoveAnimation(direction, position, item, steps) {
    const start = Date.now();
    const timer = setInterval(function () {
        const timePassed = Date.now() - start;

        if (timePassed >= animationDuration) {
            isAnimationCompleted = true;
            clearInterval(timer);
            return;
        }

        if (direction === 'back') {
            if (steps) {
                position += steps * shiftStep;
            } else {
                position += shiftStep;
            }
        }

        if (direction === 'forward') {
            if (steps) {
                position -= steps * shiftStep;
            } else {
                position -= shiftStep;
            }
        }

        item.style.left = `${Math.round(position)}px`;

    }, animationStep);
}

function moveAllSlides(direction, steps) {
    for (const slide of slides) {
        const currentSlidePosition = parseInt(slide.style.left);
        slideMoveAnimation(direction, currentSlidePosition, slide, steps);
    }
}

function changeActiveDot(index) {
    for (const dot of dots) {
        if (dot.classList.contains(activeDotClassName)) {
            dot.classList.remove(activeDotClassName);
        }
    }

    if (index) {
        dots[index].classList.add(activeDotClassName);
    } else {
        dots[currentSlideIndex].classList.add(activeDotClassName);
    }
}