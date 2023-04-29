import "uno.css";
import "@unocss/reset/tailwind.css";
import Dom from "./src/constants/dom.js";
import "./src/utils/timeutils.js";
import {randomString} from "./src/utils/stringUtils.js";
import {delay} from "./src/utils/timeutils.js";


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
fetch('http://localhost:3000/tasks')
    .then((response) => {
return response.ok && response.json();
})
    .then((rawTasks) => {
    if (rawTasks && rawTasks instanceof Object) {
        console.log('json',rawTasks);
        const serverTasks = rawTasks.map((json) => TaskVO.fromJSON(json));
        serverTasks.forEach((taskVO) => renderTask(taskVO))
        task.push (...serverTasks);
    }
});

const tasks = rawTasks
    ? JSON.parse(rawTasks).map((json) =>  TaskVO.fromJSON(json))
    : [];
//const tasks = rawTasks && JSON.parse(rawTasks) || [];
tasks.forEach((taskVO) => renderTask(taskVO));
 console.log('> tasks:', tasks);
 const taskOperations = {
     [Dom.Template.Task.BTN_DELETE]: (taskVO,domTask) => {
         renderTaskPopup(taskVO, 'Confirm delete task?', 'Delete', (taskTitle, taskDate, taskTag) => {
                 console.log('> Delete task -> On Confirm', {
                     taskTitle,
                     taskDate,
                     taskTag,
                 });
                 tasks.splice(tasks.indexOf(taskVO), 1);
                 domTaskColumn.removeChild(domTask);
                 saveTask();
             }
         );
     },
     [Dom.Template.Task.BTN_EDIT]: (taskVO,domTask) => {
         renderTaskPopup(taskVO, 'Update task', 'Update', (taskTitle, taskDate, taskTag) => {
             console.log('> Update task -> On Confirm', {
                 taskTitle,
                 taskDate,
                 taskTag,
             });
             taskVO.title = taskTitle;
             const domTaskUpDated = renderTask(taskVO);
             domTaskColumn.replaceChild(domTaskUpDated, domTask);
             saveTask();
         }
         );
     },
      };

 domTaskColumn.onclick = (e) => {
     e.stopPropagation();
     console.log('domTaskColumn', e.target);
     const domTaskElement = e.target;
     const taskBtn = domTaskElement.dataset.btn;
     const isNotTaskBtn = !taskBtn;
     if (isNotTaskBtn) return;

     const allowedButtons = [
         Dom.Template.Task.BTN_EDIT,
         Dom.Template.Task.BTN_DELETE,
     ];
     if (!allowedButtons.includes(taskBtn)) return;

     let taskId;
     let domTask = domTaskElement;
     do {
         domTask = domTask.parentNode;
         taskId = domTask.dataset.id;
     } while (!taskId);

     const taskVO = tasks.find((task) => task.id === taskId);
     console.log('> taskVO', taskVO);
     const taskOperation = taskOperations[taskBtn];
     if (taskOperations) {
         taskOperation(taskVO, domTask);
     }
 };
console.log('>domPopupCreateTask', getDOM(Dom.Button.CREATE_TASK));
getDOM(Dom.Button.CREATE_TASK).addEventListener('click', () => {
     //getDOM(Dom.Button.CREATE_TASK).onclick = () => {
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
     });

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



     delay(1000).then(() => {
         console.log('render 1');
         domSpinner.remove();
         document.onkeyup = (e) => {
             if (e.key === 'Escape') {
                 onClosePopup();
             }
         };
         dompopupContainer.append(taskPopupInstance.render());
     });
 }


console.log('render.0')

function saveTask() {
    localStorage.setItem(KEY_LOCAL_TASKS, JSON.stringify(tasks));
}

