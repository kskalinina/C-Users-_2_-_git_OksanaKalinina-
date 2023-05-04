import "uno.css";
import "@unocss/reset/tailwind.css";
import 'toastify-js/src/toastify.css';
import Dom from "./src/constants/dom.js";
import {delay} from "./src/utils/timeutils.js";
import Toastify from 'toastify-js'
import dom from "./src/constants/dom.js";
import TaskModel from "./src/mvs/model/TaskModel.js";
import TaskVO from "./src/mvs/model/vo/TaskVO.js";
import TasksController from "./src/mvs/controller/TasksController.js";
import NetworkService from "./src/service/NetworkService.js";




const KEY_LOCAL_TASKS = 'tasks';
const Tags = ["Web", "Update", "Design", "Content"]

const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);

const domTemplateTask = getDOM(Dom.Template.TASK);
const domTaskColumn= domTemplateTask.parentNode;

const networkService = new NetworkService('http://localhost:3000');
const taskModel = new TaskModel();
const tasksController = new TasksController(taskModel, networkService);

domTemplateTask.removeAttribute('id');
domTemplateTask.remove();

function renderTask(taskVO) {
    const domTaskClone = domTemplateTask.cloneNode(true);
    domTaskClone.dataset.id = taskVO.id;
    QUERY(domTaskClone, Dom.Template.Task.TITLE).innerText = taskVO.title;
    domTaskColumn.prepend(domTaskClone);
    return domTaskClone;
}

const showToastWithText = (text) =>
  Toastify({
    text,
    duration: 3000,
    close: true,
  }).showToast();

async function main() {
    taskModel.addUpdateCallback((tasks) => {
        console.log('>addUpdate: ',tasks)
       domTaskColumn.innerHTML = '';
        tasks.forEach((taskVO) => renderTask(taskVO));
    });
    tasksController.retrieveTasks()
      .then(() => {
      })
      .catch((e) => {});

    const taskOperations = {
        [Dom.Button.CREATE_TASK]: () => {
                    renderTaskPopup(
                        null,
                        'Create task',
                        'Create',
                        (taskTitle, taskDate, taskTags) => {
                            console.log('>  Create task -> On Confirm');
                            tasksController
                              .createTask(taskTitle, taskDate, taskTags)
                              .then((taskVO) => {
                            console.log('>  Create task -> On Confirm: Success');
                                showToastWithText( `You task saved: ${taskVO.title}`);

                        })
                              .catch((error) => {
                                  console.log('>  Create task -> On Confirm: Error=', error);
                              window.alert(`Error on server: ${error.toString()}`);
                              });
                        }
                    );
        },
        [Dom.Template.Task.BTN_DELETE]: (taskId) => {
           const taskVO = taskModel.getTaskbyId(taskId);
          renderTaskPopup(taskVO, 'Confirm delete task?', 'Delete', (taskTitle, taskDate, taskTag) => {
                    console.log('> Delete task -> On Confirm', {
                        taskTitle,
                        taskDate,
                        taskTag,
                    });
                    tasksController.deleteTask(taskId).then(() => {
                      showToastWithText(`Task deleted: ${taskVO.title}`);
                    })
                      .catch((e) => {});
                }
            );
        },
        [Dom.Template.Task.BTN_EDIT]: (taskId) => {
          const taskVO = taskModel.getTaskbyId(taskId)
            renderTaskPopup(taskVO, 'Update task', 'Update', (taskTitle, taskDate, taskTag) => {
                    console.log('> Update task -> On Confirm', {
                        taskTitle,
                        taskDate,
                        taskTag,
                    });
                    tasksController.updateById(taskId, taskTitle,
                      taskDate,
                      taskTag)

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

        const taskOperation = taskOperations[taskBtn];
        if (taskOperations) {
            taskOperation(taskId, domTask);
        }
    };
    getDOM(Dom.Button.CREATE_TASK).addEventListener(
        'click',
        (e) => taskOperations[dom.Button.CREATE_TASK]()
    );

    async function renderTaskPopup(taskVO, popupTitle, confirmText, processDataCallback) {
        const dompopupContainer = getDOM(Dom.Popup.CONTAINER);
        const domSpinner = dompopupContainer.querySelector('.spinner');

        dompopupContainer.classList.remove("hidden");
        const onClosePopup = () => {
            dompopupContainer.children[0].remove();
            dompopupContainer.append(domSpinner);
            dompopupContainer.classList.add('hidden');
        }

        const TaskPopup = (await import('./src/mvs/view/popup/TaskPopup')).default;
        const taskPopupInstance = new TaskPopup(
            popupTitle,
            Tags,
            confirmText,
            (taskTitle, taskDate, taskTags) => {
                console.log('Main -> renderTaskPopup: processDataCallback', {taskTitle, taskDate, taskTags});
                processDataCallback (taskTitle, taskDate, taskTags);
                    onClosePopup();
            },
            onClosePopup
        );
        if (taskVO) {
            taskPopupInstance.taskTitle = taskVO.title;
        }


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
}
main();
