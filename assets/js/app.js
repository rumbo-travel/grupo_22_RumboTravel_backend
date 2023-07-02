/*JS*/
/*Menu*/
let btnMenu = document.querySelector(".label_menu");

const menu = () => {
  btnMenu.addEventListener("click", () => {
    let nav = document.querySelector(".nav-list");

    nav.classList.toggle("active_menu");
  });
};
menu();
