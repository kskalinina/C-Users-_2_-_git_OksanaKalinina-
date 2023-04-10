import "uno.css";
import "@unocss/reset/tailwind.css";

const dombtnCreatetask = document.getElementById("btnCreatetask");
const dompopupCreateTask = document.getElementById("popupCreateTask");

const OnPopupCloseButtonClick = () => {
    dompopupCreateTask.classList.add("hidden");
};
dombtnCreatetask.onclick = () => {
           console.log("> dompopupCreateTask.classList",dompopupCreateTask)
        dompopupCreateTask.classList.remove("hidden");

           const dombtnCloseCreateTaskPopup = document.getElementById("btnCloseCreateTaskPopup")
        dombtnCloseCreateTaskPopup.onclick = OnPopupCloseButtonClick ;
    };
// dompopupCreateTask.classList.add("hidden")
// dombtnCloseCreateTaskPopup.onclick = null
//}