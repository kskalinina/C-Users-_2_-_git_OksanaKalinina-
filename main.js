const DOM = document.getElementById.bind(document);

const domInpName = DOM('inpName');
const domInpSurName = DOM('inpSurname');
const domconResult = DOM('conResult');

let fullName =""
domInpName.oninput = function (event) {
    console.log("onInpNameInput:", { event });
    renderFullName();
}

domInpSurName.oninput = function (event){
    console.log("onInpSurNameInput:", {event});
    renderFullName()
};


const getFullName = () =>`${domInpName.value} ${domInpSurName.value}`
function renderFullName() {
    const fullName = getFullName();
    console.log("renderFullName:",{fullName})
    domconResult.textContent = fullName;

}

//function onInpNameInput(event) {
    //event.stopPropagation();

    //console.log("onInpNameInput:", { event });
   //fullName = domInpName.value + " " + domInpSurName.value;
    //fullName = `${domInpName.value} ${domInpSurName.value||"empty"}`
    //fullName = `${domInpName.value} ${domInpSurName.value}`;
    //domconResult.textContent = fullName;
    //renderFullName();
//}
//function onInpSurnameInput(event) {
    //console.log("onInpSurNameInput:", { event });
    //renderFullName();}
console.log(domInpName, domInpSurName);


