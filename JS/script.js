const centerX = (domRect) => domRect.left + domRect.width / 2;
const centerY = (domRect) => domRect.top + domRect.height / 2;
const phone = document.querySelector(".phone");
const phoneRect = phone.getBoundingClientRect();
let phoneCenterX = centerX(phoneRect);
let phoneCenterY = centerY(phoneRect);
const movies = Array.from(document.querySelectorAll(".movie"));
const closeUps = Array.from(document.querySelectorAll(".close-up"));
const closeUpsCont = document.querySelector(".close-ups");

window.addEventListener("resize", () => {
    const phoneRect = phone.getBoundingClientRect();
    phoneCenterX = centerX(phoneRect);
    phoneCenterY = centerY(phoneRect);
});

console.dir(phoneCenterX);

movies.forEach((movie, index) => {
    movie.addEventListener("click", (e) => {
        const movieRect = movie.getBoundingClientRect();
        const deltaX = phoneCenterX - centerX(movieRect);
        const deltaY = phoneCenterY - centerY(movieRect);

        // if (movie.classList.contains("active")) {
        //   movie.style.transform = "";
        // } else {
        movie.style.setProperty("--delta-x", `${deltaX}px`);
        movie.style.setProperty("--delta-y", `${deltaY - 32 - 12.69}px`);
        closeUps[index].style.setProperty("--delta-x", `${-deltaX}px`);
        closeUps[index].style.setProperty("--delta-y", `${-deltaY + 32 - 18.69}px`);
        closeUps[index].style.transition = "none";
        // Force reflow
        closeUps[index].getBoundingClientRect();
        closeUps[index].style.transition = "";
        // }

        movie.classList.add("active");
        closeUps[index].classList.add("active");
        closeUpsCont.classList.add("active");
    });
});
closeUps.forEach((closeUp, index) => {
    closeUp.addEventListener("click", (e) => {
        movies[index].classList.remove("active");
        closeUp.classList.remove("active");
        closeUpsCont.classList.remove("active");
    });
});
