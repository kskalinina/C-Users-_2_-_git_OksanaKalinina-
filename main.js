import "uno.css";
import "@unocss/reset/tailwind.css";
import Dom from "./src/dom";
import {randomString} from "./src/stringUtils.js";

const KEY_LOCAL_TASKS = 'tasks';
const Tags = ["Web", "Update", "Design", "Content"]
class TaskVO {
    static fromJSON(json) {
        return new TaskVO(json.title, json.date, json.tag );
    }
    constructor(title, date, tag) {
        this.title = title;
        this.date = date;
        this.Tag = tag;
    }
}
const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);
const domTemplateTask = getDOM(Dom.Template.TASK);
const domTaskColumn= domTemplateTask.parentNode;
domTemplateTask.remove();

const rawTasks = localStorage.getItem(KEY_LOCAL_TASKS);

const tasks = rawTasks
    ? JSON.parse(rawTasks).map((json) =>  TaskVO.fromJSON(json))
    : [];
//const tasks = rawTasks && JSON.parse(rawTasks) || [];
tasks.forEach((taskVO) => renderTask(taskVO));
 console.log('> tasks:', tasks);

getDOM(Dom.Button.CREATE_TASK).onclick = () => {
    console.log("> domPopupCreateTask.classList");

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
        //const domTaskClone = domTemplateTask.cloneNode(true);
        //QUERY(domTaskClone, Dom.Template.Task.TITLE).innerText = taskVO.title;
        //domTaskColumn.prepend(domTaskClone)
        renderTask(taskVO);
        tasks.push(taskVO);

        console.log("confirm", taskVO)

        localStorage.setItem(KEY_LOCAL_TASKS, JSON.stringify(tasks));

        onclosePopup();
    };
    };

function renderTask(taskVO) {
    const domTaskClone = domTemplateTask.cloneNode(true);
    QUERY(domTaskClone, Dom.Template.Task.TITLE).innerText = taskVO.title;
    domTaskColumn.prepend(domTaskClone);

}
