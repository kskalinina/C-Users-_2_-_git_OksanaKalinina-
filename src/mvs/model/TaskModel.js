class TaskModel {
    #tasks = [];
    #updateCallbacks = [];
constructor() {
}
set tasks (value) {
    this.#tasks = value;
    this.#update();
}
    #update() {
    this.#updateCallbacks.forEach(c => c(this.#tasks));
}

addUpdateCallback (updateCallback) {
    if (!updateCallback || !(updateCallback instanceof Function)) {
        throw new Error(`Wrong callback: ${updateCallback}`);}
        this.#updateCallbacks.push(updateCallback);

}
getTaskbyId(id) {
    const taskId = parseInt(id);
    const taskVO = this.#tasks.find((task) => task.id === taskId);
    console.log('> TasksModel -> taskVO', id, taskVO);
    return taskVO;
}
    deleteTaskByID(taskId) {
        console.log('> TasksModel -> deleteTaskByID',taskId);
        const index = this.#tasks.findIndex((taskVO) => taskVO.id === taskId);
        this.#tasks.splice(index,1)
        this.#update();
        //this.#tasks = this.#tasks.filter((taskVO) => taskVO.id !== taskId);
    }
    addTask(taskVO){
        console.log('> TasksModel -> addTask',taskVO);
        this.#tasks.push(taskVO);
        this.#update();
    }
}

export default TaskModel;