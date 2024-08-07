const  issueModal= 'This is an issue of type: Task.';

describe('Issue delete', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains(issueModal).click();
      });
    });

    //Test Case 1: Issue Deletion
    
    it('Should delete "This is an issue of type: Task." issue successfully', () => {

      //Assert the visibility of the issue detail view modal
      cy.get('[data-testid="modal:issue-details"]').should('be.visible');

      //Delete the issue by clicking the delete button and confirming the deletion.
      cy.get('[data-testid="icon:trash"]').click();
      cy.get('[data-testid="modal:confirm"]').should('be.visible');
      cy.get('[data-testid="modal:confirm"]').within(() => {
        cy.contains('Are you sure you want to delete this issue?').should('be.visible')
        cy.contains("Once you delete, it's gone for good.").should('be.visible')
        cy.contains('Delete issue').click();
      })
      cy.get('[data-testid="modal:confirm"]').should('not.exist');
      cy.get('[data-testid="board-list:backlog"]').within(() => {
        cy.contains('This is an issue of type: Task.').should('not.exist');
      });

      //Assert that the issue is deleted and no longer displayed on the Jira board.
      cy.reload();
      cy.contains('This is an issue of type: Task.').should('not.exist');
    });

  
    //Test Case 2: Issue Deletion Cancellation
    
    it('Should cancel deletion process successfully', () => {

        //Assert the visibility of the issue detail view modal
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    
        //Delete the issue by clicking the delete button and confirming the deletion.
        cy.get('[data-testid="icon:trash"]').click()
        cy.get('[data-testid="modal:confirm"]').should('be.visible');
        cy.get('[data-testid="modal:confirm"]').within(() => {
          cy.contains('Are you sure you want to delete this issue?').should('be.visible')
          cy.contains("Once you delete, it's gone for good.").should('be.visible')

          //Cancel the deletion in the confirmation pop-up.
          cy.contains('button', 'Cancel').click();
        })
        
        //Assert that the deletion confirmation dialogue is not visible.
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.get('[data-testid="modal:issue-details"]').find('[data-testid="icon:close"]').first().click();
        cy.get('[data-testid="modal:issue-details"]').should("not.exist");
        
        //Assert that the issue is not deleted and is still displayed on the Jira board.
        cy.get('[data-testid="list-issue"]')
        .find("p")
        .contains(issueModal)
        .should("be.visible");
  });
})