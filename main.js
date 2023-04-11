import "uno.css";
import "@unocss/reset/tailwind.css";
import Dom from "./src/dom";
import {randomString} from "./src/stringUtils.js";


const Tags = ["Web", "Update", "Design", "Content"]
class TaskVO {
    constructor(title, date, tag) {
        this.title = title;
        this.date = date;
        this.Tag = tag;
    }
}
const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);
const domTask = getDOM(Dom.Template.TASK);

const tasks = [];

getDOM(Dom.Button.CREATE_TASK).onclick = () => {
    console.log("> dompopupCreateTask.classList");

    const domPopupCreateTask = getDOM(Dom.Popup.CREATE_TASK)
    const domBtnClose = QUERY(domPopupCreateTask, Dom.Button.CLOSE_CREATE_TASK);
    const domBtnConfirm = QUERY(domPopupCreateTask, Dom.Button.POPUP_CREATE_TASK_CONFIRM);

    domPopupCreateTask.classList.remove("hidden");
    const onclosePopup = () => {
        domPopupCreateTask.classList.add("hidden");
        domBtnClose.onclick = null;
        domBtnConfirm.onclick = null;
    };
    domBtnClose.onclick = onclosePopup;

    domBtnConfirm.onclick = () => {
        const taskVO = new TaskVO(randomString(12), Date.now(), Tags[0]);
        const taskView = domTask.cloneNode(true);

        QUERY(taskView, Dom.Template.Task.TITLE).innerText = taskVO.title;

        domTask.parentNode.prepend(taskView)
        tasks.push(taskVO);

        console.log("confirm", taskVO)
        onclosePopup();
    };
    };

