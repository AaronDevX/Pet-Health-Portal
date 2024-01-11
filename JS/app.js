const petInput = document.querySelector("#pet");
const ownerInput = document.querySelector("#owner");
const phoneInput = document.querySelector("#phone");
const dateInput = document.querySelector("#date");
const timeInput = document.querySelector("#time");
const symptomsInput = document.querySelector("#symptoms");

const form = document.querySelector("#new-appointment");

const petObject = {
    pet: "",
    owner: "",
    phone: "",
    date: "",
    time: "",
    symptoms: ""
}

eventListeners();
function eventListeners(){
    petInput.addEventListener("input", registerData);
    ownerInput.addEventListener("input", registerData);
    phoneInput.addEventListener("input", registerData);
    dateInput.addEventListener("input", registerData);
    timeInput.addEventListener("input", registerData);
    symptomsInput.addEventListener("input", registerData);

    form.addEventListener("submit", sendForm);
}

function registerData(e){
    petObject[e.target.name] = e.target.value;
    console.log(petObject)
}

function sendForm(e){
    e.preventDefault();
}