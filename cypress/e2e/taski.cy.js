import Dom from "../../src/constants/dom.js";
const SERVER_URL = 'http://localhost:4173/'
describe('Test todo Page', () => {

    const clickOnCreateTaskButton = () =>
        cy
            .get(`#${Dom.Button.CREATE_TASK}`)
            .should('exist')
            .should('contain.text', 'Create Task')
            .click();
    const createTaskFromPopup = (todoTaskText) => {
        const popupTask = cy.get('[data-testId="task-popup"]');

        popupTask.should('exist').should('be.visible');
        popupTask
            .find('[data-id="inpTitle"]')
            .should('exist')
            .should('have.value', '')
            .type(todoTaskText);


        cy.get('[data-id="btnConfirm"]')
            .should('exist')
            .should('contain.text', 'Create')
            .click();
    };
    const getColumnChildren = () =>
        cy.get('[data-test-id="tasks-column"]')
            .should('exist')
            .children()

    const checkNumberOfTaskInColumnMatch = (numberOfTask) => {
        getColumnChildren().should('have.length', numberOfTask + 1)
};
    beforeEach(() => {
        cy.visit(SERVER_URL);
        cy.url().should('include', SERVER_URL);
        cy.intercept ('/**/TaskPopup**').as('getTaskPopup');
    });
    it('user open main page and create task', () => {

        cy.get(`#${Dom.Popup.CONTAINER}`)
            .should('exist')
            .should('have.class', 'hidden')

        cy.get(`#${Dom.Popup.CONTAINER}`)
            .should('exist')
            .should('have.class', 'hidden')
            .find('.spinner').should('exist');

        clickOnCreateTaskButton();
        cy.wait('@getTaskPopup');

        const todoTaskText = 'Welcome Task';
        createTaskFromPopup(todoTaskText)



        getColumnChildren().should ('have.length', 2)
    .first()
    .find('[data-id="templateTaskTitle"]')
    .should('contain.text', todoTaskText);

    });
    it.only('user create task and delete one', () => {
        const tasks =['Welcome Task', 'Read books', 'Tasks']
        const numberOfTasks = tasks.length;
        tasks.forEach((text, index) => {
            clickOnCreateTaskButton();
            if (index ===0) cy.wait('@getTaskPopup');
            createTaskFromPopup(text);
        });
        checkNumberOfTaskInColumnMatch(numberOfTasks);
        getColumnChildren()
            .first()
            .find('[data-btn="btnDelete"]')
            .should('exist')
            .click();

        const popupTask = cy.get('[data-testId="task-popup"]');
        popupTask
            .find('[data-id="btnConfirm"]')
            .should('exist')
            .should('contain.text', 'Delete')
            .click();

        tasks.pop();

        checkNumberOfTaskInColumnMatch(tasks.length );
        tasks.forEach((text) => {
            getColumnChildren().should('contain.text', text)
        });
    });
});