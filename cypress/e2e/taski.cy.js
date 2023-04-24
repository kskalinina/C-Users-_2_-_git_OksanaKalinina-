import Dom from "../../src/constants/dom.js";
const SERVER_URL = 'http://localhost:5173/'
describe('Test todo Page', () =>{
    beforeEach(() => {
        cy.intercept ('/**/TaskPopup**').as('getTaskPopup');
    });
    it.only('user open main page and create task', () => {
        cy.visit(SERVER_URL);
        cy.url().should('include', SERVER_URL);

        cy.get(`#${Dom.Popup.CONTAINER}`)
            .should('exist')
            .should('have.class', 'hidden')

        cy.get(`#${Dom.Popup.CONTAINER}`)
            .should('exist')
            .should('have.class', 'hidden')
            .find('.spinner').should('exist');

        cy.get(`#${Dom.Button.CREATE_TASK}`)
            .should('exist');
                cy.get(`#${Dom.Button.CREATE_TASK}`).should('contain.text', 'Create Task').click();

        cy.wait('@getTaskPopup');

              const popupTask =  cy.get('[data-testId="task-popup"]');
              const todoTaskText = 'Welcome Task';
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

cy.get('[data-test-id="tasks-column"]')
        .should('exist')
    .children()
    .should('have.length', 2)
    .first()
    .find('[data-id="templateTaskTitle"]')
    .should('contain.text', todoTaskText);

    });
});