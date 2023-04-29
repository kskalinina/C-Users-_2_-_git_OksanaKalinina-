class TaskModel {
    #tasks = [];
    #updateCallbacks = [];
constructor() {
}
set tasks (value) {
    this.#tasks = value;
    this.#updateCallbacks.forEach(c => c(this.#tasks));
}

addUpdateCallback (updateCallback) {
    if (!updateCallback || !(updateCallback instanceof Function)) {
        throw new Error(`Wrong callback: ${updateCallback}`);}
        this.#updateCallbacks.push(updateCallback);

}

    addTask(taskVO){
        console.log('>  tasks controller -> add task',taskVO);
        this.#tasks.push(taskVO)
    }
}

export default TaskModel;