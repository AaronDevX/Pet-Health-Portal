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

class UI{
    showAlert(type, message){
        const divParent = document.querySelector(".container");

        const divAlert = document.createElement("DIV");
        const pAlert = document.createElement("P");
        pAlert.classList.add(type, "alert");
        pAlert.textContent = message;

        divAlert.appendChild(pAlert);
        divParent.insertBefore(divAlert, document.querySelector("#content"));

        setTimeout(() => {
            divAlert.remove();
        }, 3000);
    }
}

const uInterface = new UI;

function sendForm(e){
    e.preventDefault();

    const {pet, owner, phone, date, time, symptoms} = petObject;

    if(pet=="" || owner=="" || phone=="" || date=="" || time=="" || symptoms==""){
        uInterface.showAlert("error-alert", "All fields are required");
        return;
    }

    uInterface.showAlert("success-alert", "Patient added");
}