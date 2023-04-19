import Music from "./sound.js";
import { verifyPlayerName } from "./verification.js";

// let user_input = null;

// do {
//     user_input = window.prompt("Type 'OK' to continue");
// }
// while (user_input != "OK");

// if (user_input == "OK") {
//     Music("assets/sounds/Bachs-Bouree-In-Celtic-Minor.mp3");
// }



//get the name of the user
//containers
const modal_area = document.createElement('div');
const modal_box = document.createElement('div');
const image_container = document.createElement('div');
const m_row = document.createElement('div');

//child elements
const my_image = document.createElement('img');
const welcome = document.createElement('h1');
const ask = document.createElement('p');
const inputName = document.createElement('input');
const confirm_name_btn = document.createElement('button');

//add classes
modal_area.className = "modal-area";
modal_box.className = "modal-box";
image_container.className = "image-container";
m_row.className = "row";
my_image.className = "skull";
inputName.className = "player-name";
confirm_name_btn.className = "confirm-name-btn";

//add type
inputName.type = "text";
confirm_name_btn.type = "button";

//add source
my_image.src = "assets/objects/extras/skull.png";

//add contents
welcome.textContent = "Welcome";
ask.textContent = "Please enter your name:";
confirm_name_btn.textContent = "Confirm";

//add function
confirm_name_btn.addEventListener('click', () => {
    if (verifyPlayerName(inputName.value)) {
        modal_area.remove();
        Music("assets/sounds/Bachs-Bouree-In-Celtic-Minor.mp3");
    }
    else {
        alert("Please enter a valid name");
    }
});

image_container.appendChild(my_image);
m_row.appendChild(welcome);
m_row.appendChild(ask);
m_row.appendChild(inputName);
m_row.appendChild(confirm_name_btn);

modal_box.appendChild(image_container);
modal_box.appendChild(m_row);

modal_area.appendChild(modal_box);
document.body.appendChild(modal_area);