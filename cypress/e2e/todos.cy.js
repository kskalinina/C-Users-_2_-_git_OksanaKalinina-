import Dom from "../../src/constants/dom.js";
describe('Create Todo', () =>{
    it('user open main page and create task', () => {
        cy.visit('http://localhost:5173/');
        
        cy.get(`#${Dom.Button.CREATE_TASK}`).
        should('exist')
            .should('contain.text', '+Create Task')
            .click();
    });
});