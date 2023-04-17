import "uno.css";
import "@unocss/reset/tailwind.css";
import Dom from "./src/dom";
import {randomString} from "./src/stringUtils.js";

const KEY_LOCAL_TASKS = 'tasks';
const Tags = ["Web", "Update", "Design", "Content"]
class TaskVO {
    static fromJSON(json) {
        return new TaskVO(json.id, json.title, json.date, json.tag );
    }
    constructor(id, title, date, tag) {
        this.id= id;
        this.title = title;
        this.date = date;
        this.tag = tag;
    }
}
const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);
const domTemplateTask = getDOM(Dom.Template.TASK);
const domTaskColumn= domTemplateTask.parentNode;
domTemplateTask.removeAttribute('id');
domTemplateTask.remove();

const rawTasks = localStorage.getItem(KEY_LOCAL_TASKS);

const tasks = rawTasks
    ? JSON.parse(rawTasks).map((json) =>  TaskVO.fromJSON(json))
    : [];
//const tasks = rawTasks && JSON.parse(rawTasks) || [];
tasks.forEach((taskVO) => renderTask(taskVO));
 console.log('> tasks:', tasks);

 domTaskColumn.onclick = (e) => {
     e.stopPropagation();
     console.log('domTaskColumn', e.target);
     renderTaskPopup('Update task','Update', () => {
         console.log ('> Update task -> On Confirm');
     });
 };
     getDOM(Dom.Button.CREATE_TASK).onclick = () => {
         console.log("> domPopupCreateTask.classList");
         renderTaskPopup('Create task','Create', () => {
             console.log ('> Create task -> On Confirm');
         });
     };
     function onCreateTaskClick() {
         const taskId = `task_${Date.now()}`;
         const taskTitle = randomString(12);
         const taskVO = new TaskVO(taskId, taskTitle, Date.now(), Tags[0]);
         //const domTaskClone = domTemplateTask.cloneNode(true);
         //QUERY(domTaskClone, Dom.Template.Task.TITLE).innerText = taskVO.title;
         //domTaskColumn.prepend(domTaskClone)
         renderTask(taskVO);
         tasks.push(taskVO);
         console.log("confirm", taskVO)
         localStorage.setItem(KEY_LOCAL_TASKS, JSON.stringify(tasks));
         }
function renderTask(taskVO) {
    const domTaskClone = domTemplateTask.cloneNode(true);
    domTaskClone.dataset.id = taskVO.id;
    QUERY(domTaskClone, Dom.Template.Task.TITLE).innerText = taskVO.title;
    domTaskColumn.prepend(domTaskClone);
};
 function renderTaskPopup(popupTitle, btnConfirmText, confirmCallback) {
     const domPopupCreateTask = getDOM(Dom.Popup.CREATE_TASK)
     const domBtnClose = QUERY(domPopupCreateTask, Dom.Button.CLOSE_CREATE_TASK);
     const domBtnConfirm = QUERY(domPopupCreateTask, Dom.Button.POPUP_CREATE_TASK_CONFIRM);

     const domTitle = QUERY(domPopupCreateTask, Dom.Popup.CreateTask.TITLE);

     domBtnConfirm.innerText = btnConfirmText;
     domTitle.innerText = popupTitle;

     const onclosePopup = () => {
         domPopupCreateTask.classList.add("hidden");
         domBtnClose.onclick = null;
         domBtnConfirm.onclick = null;
     };

     domPopupCreateTask.classList.remove("hidden");

     domBtnClose.onclick = onclosePopup;

     domBtnConfirm.onclick = () => {
         const taskTitle = randomString(12);
         const taskDate = `task_${Date.now()}`;
         const taskTag = Tags[0];
         confirmCallback && confirmCallback(taskTitle, taskDate, taskTag);
         onclosePopup();
     };
 }



