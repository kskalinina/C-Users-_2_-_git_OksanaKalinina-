import "uno.css";
import "@unocss/reset/tailwind.css";

const dombtnCreatetask = document.getElementById("btnCreatetask");
const dompopupCreateTask = document.getElementById("popupCreateTask");

dombtnCreatetask.onclick = () => {
    console.log("> dompopupCreateTask.classList", dompopupCreateTask)
    dompopupCreateTask.classList.remove("hidden");

    const dombtnCloseCreateTaskPopup = document.getElementById("btnCloseCreateTaskPopup")
    dombtnCloseCreateTaskPopup.onclick = () => {
        dompopupCreateTask.classList.add("hidden")
        dombtnCloseCreateTaskPopup.onclick = null
    }
    };
