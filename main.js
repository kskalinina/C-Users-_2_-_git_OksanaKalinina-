import "uno.css";
import "@unocss/reset/tailwind.css";
import Dom from "./src/constants/dom.js";
import {randomString} from "./src/utils/stringUtils.js";

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
     const domSelectedTask = e.target;
     const taskId = domSelectedTask.dataset.id;
     if (!taskId) return;

     const taskVO = tasks.find((task) => task.id === taskId);
     console.log ('> taskVO', taskVO);
     renderTaskPopup(taskVO, 'Update task','Update', (taskTitle, taskDate,taskTag) => {
         console.log ('> Update task -> On Confirm',{
             taskTitle,
             taskDate,
             taskTag,
         });
         taskVO.title = taskTitle;
         const domTaskUpDated = renderTask(taskVO);
             domTaskColumn.replaceChild(domTaskUpDated, domSelectedTask);
         saveTask();
     }
     );
 };
     getDOM(Dom.Button.CREATE_TASK).onclick = () => {
         console.log("> dompopupContainer.classList");
         renderTaskPopup(null, 'Create task','Create',
             (taskTitle, taskDate, taskTag) => {
             console.log ('> Main -> Create task -> On Confirm');
             const taskId = `task_${Date.now()}`;
             const taskVO = new TaskVO(taskId, taskTitle, Date.now(), Tags[0]);

                 renderTask(taskVO);
                 tasks.push(taskVO);

                 saveTask();
         });
     };

function renderTask(taskVO) {
    const domTaskClone = domTemplateTask.cloneNode(true);
    domTaskClone.dataset.id = taskVO.id;
    QUERY(domTaskClone, Dom.Template.Task.TITLE).innerText = taskVO.title;
    domTaskColumn.prepend(domTaskClone);
    return domTaskClone;
}





 async function renderTaskPopup(taskVO, popupTitle, confirmText, processDataCallback) {
     const dompopupContainer = getDOM(Dom.Popup.CONTAINER);
     const domSpinner = dompopupContainer.querySelector('.spinner');

          dompopupContainer.classList.remove("hidden");
          const onClosePopup = () => {
            dompopupContainer.children[0].remove();
            dompopupContainer.append(domSpinner);
            dompopupContainer.classList.add('hidden');
          }

     const TaskPopup = (await import('./src/view/popup/TaskPopup')).default;
     const taskPopupInstance = new TaskPopup(
         popupTitle,
         Tags,
         confirmText,
         (taskTitle, taskDate, taskTags) => {
             console.log('Main -> renderTaskPopup: processDataCallback', {taskTitle, taskDate, taskTags});
             processDataCallback(taskTitle, taskDate, taskTags),
                 onClosePopup();
         },
         onClosePopup
     );
     if (taskVO) {
         taskPopupInstance.taskTitle = taskVO.title;
     };



    // setTimeout(() => {
                 domSpinner.remove();
     document.onkeyup = (e)  => {
         if (e.key === 'Escape') {
             onClosePopup();
         }
     };
                 dompopupContainer.append(taskPopupInstance.render());
    // },1000);
 }

function saveTask() {
    localStorage.setItem(KEY_LOCAL_TASKS, JSON.stringify(tasks));
}

