const petInput = document.querySelector("#pet");
const ownerInput = document.querySelector("#owner");
const phoneInput = document.querySelector("#phone");
const dateInput = document.querySelector("#date");
const timeInput = document.querySelector("#time");
const symptomsInput = document.querySelector("#symptoms");

const form = document.querySelector("#new-appointment");

let edit;
let idEdit;

const petObject = {
    pet: "",
    owner: "",
    phone: "",
    date: "",
    time: "",
    symptoms: ""
}

//Events
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
}

//Class
class Appointments{
    constructor(){
        this.appointments = [];
    }
    addPatient(pD){
        this.appointments = [...this.appointments, pD];
    }
    deletePatient(idDelete){
        this.appointments = this.appointments.filter(appointment => appointment.id !== idDelete)
    }
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
    showPetInfo(pData){
        const dataList = document.querySelector("#appointments");
        const {pet, owner, phone, date, time, symptoms, id} = pData;

        const dataDiv = document.createElement("DIV");
        dataDiv.setAttribute("id", id);
        dataDiv.classList.add("data-pet");

        const petP = document.createElement("H3");
        petP.textContent = pet;
        petP.classList.add("pet-name");

        const ownerP = document.createElement("P");
        const ownerSpan = document.createElement("SPAN");
        ownerSpan.textContent = "Owner: ";
        ownerP.appendChild(ownerSpan);
        ownerP.appendChild(document.createTextNode(owner));
        ownerP.classList.add("owner");

        const phoneP = document.createElement("P");
        const phoneSpan = document.createElement("SPAN");
        phoneSpan.textContent = "Phone: ";
        phoneP.appendChild(phoneSpan);
        phoneP.appendChild(document.createTextNode(phone));
        phoneP.classList.add("phone");

        const dateP = document.createElement("P");
        const dateSpan = document.createElement("SPAN");
        dateSpan.textContent = "Date: ";
        dateP.appendChild(dateSpan);
        dateP.appendChild(document.createTextNode(date));
        dateP.classList.add("date");

        const timeP = document.createElement("P");
        const timeSpan = document.createElement("SPAN");
        timeSpan.textContent = "Time: ";
        timeP.appendChild(timeSpan);
        timeP.appendChild(document.createTextNode(time));
        timeP.classList.add("time");

        const symptomsP = document.createElement("P");
        const symptomsSpan = document.createElement("SPAN");
        symptomsSpan.textContent = "Symptoms: ";
        symptomsP.appendChild(symptomsSpan);
        symptomsP.appendChild(document.createTextNode(symptoms));
        symptomsP.classList.add("symptoms");

        //BUTTONS
        const btnsDiv = document.createElement("DIV");
        btnsDiv.classList.add("div-btns");

        const deleteBtn = document.createElement("BUTTON");
        deleteBtn.classList.add("delete-appointment", "appointment-btn");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = ()=>{
            dataDiv.remove();
            appoint.deletePatient(id);
        }
        const editBtn = document.createElement("BUTTON");
        editBtn.classList.add("edit-appointment", "appointment-btn");
        editBtn.textContent = "Edit";
        editBtn.onclick = () =>{
            editPetObject(id);
        }

        btnsDiv.appendChild(deleteBtn);
        btnsDiv.appendChild(editBtn);

        dataDiv.appendChild(petP);
        dataDiv.appendChild(ownerP);
        dataDiv.appendChild(phoneP);
        dataDiv.appendChild(dateP);
        dataDiv.appendChild(timeP);
        dataDiv.appendChild(symptomsP);
        dataDiv.appendChild(btnsDiv);

        dataList.appendChild(dataDiv)
    }
/*     editPetInfo(idE, Ob){
        const dataDiv = document.getElementById(idE);
        dataDiv.querySelector(".pet-name").textContent= Ob.pet;
        dataDiv.querySelector(".owner").lastChild.nodeValue= Ob.owner;
        dataDiv.querySelector(".phone").lastChild.nodeValue= Ob.phone;
        dataDiv.querySelector(".date").lastChild.nodeValue= Ob.date
        dataDiv.querySelector(".time").lastChild.nodeValue= Ob.time;
        dataDiv.querySelector(".symptoms").lastChild.nodeValue= Ob.symptoms;
    } */
}

//Instantiate classes
const appoint = new Appointments
const uInterface = new UI;


//Submit Function
function sendForm(e){
    e.preventDefault();

    //Validate form and show alert
    const {pet, owner, phone, date, time, symptoms} = petObject;

    if(pet=="" || owner=="" || phone=="" || date=="" || time=="" || symptoms==""){
        uInterface.showAlert("error-alert", "All fields are required");
        return;
    }else if(edit){
        uInterface.showAlert("success-alert", "Changes have been saved successfully");
    }else{
        uInterface.showAlert("success-alert", "Patient added");
    }

    //Show Patient Info
    if(edit){
        appoint.deletePatient(idEdit);
        /* uInterface.editPetInfo(idEdit, {...petObject}) */
        document.getElementById(idEdit).remove();

        form.querySelector(".new-appointment-btn").textContent = "Create Appointment";
        
        idEdit="";
        edit = false;
    }else{
        petObject.id = Date.now();
    }
    uInterface.showPetInfo(petObject);
    appoint.addPatient({...petObject});

    //Reset form and patient object 
    resetPetObject();
    form.reset();
}

//Secondary Functions
function resetPetObject(){
    petObject.pet = "";
    petObject.owner = "";
    petObject.phone = "";
    petObject.date = "";
    petObject.time = "";
    petObject.symptoms = "";
}

function editPetObject(id){
    const patient = appoint.appointments.filter(ap => ap.id == id);

    const {pet, owner, phone, date, time, symptoms, idp} = patient[0];

    petInput.value = pet;
    ownerInput.value = owner;
    phoneInput.value = phone;
    dateInput.value = date;
    timeInput.value = time;
    symptomsInput.value =symptoms;
    
    petObject.pet = pet;
    petObject.owner = owner;
    petObject.phone = phone;
    petObject.date = date;
    petObject.time = time;
    petObject.symptoms = symptoms;
    petObject.id = idp;

    form.querySelector(".new-appointment-btn").textContent = "Save Changes";

    idEdit = id;
    edit = true;
}