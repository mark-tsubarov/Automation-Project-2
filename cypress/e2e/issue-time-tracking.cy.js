//Variables
    const issueBoard = '[data-testid="list-issue"]';
    const issueModal = '[data-testid="modal:issue-details"]';
    const inputNumber = 'input[placeholder="Number"]';
    const inputEstimateHours = 10;
    const editedEstimateHours = 20;
    const inputTimeSpent = 2;
    const inputTimeRemaining = 5;
    const buttonStopWatch = '[data-testid="icon:stopwatch"]';
    const timeTrackingModal = '[data-testid="modal:tracking"]';

//Functions
    function getIssueModal() {
      cy.get(issueBoard).contains('This is an issue of type: Task.').click();
      cy.get(issueModal).should('be.visible');
    }

    function closeIssueModal() {
      cy.get('[data-testid="modal:issue-details"]').within(() => {
        cy.get('[data-testid="icon:close"]').first().click();
      });
      cy.get('[data-testid="modal:issue-details"]').should("not.exist");
      cy.reload();
    }
      
    function inputEstimateTime() {
        cy.get(inputNumber)
          .should('have.value', '')
          .type(inputEstimateHours)
          .should('have.value', inputEstimateHours);
          };
      

      function openModalTracking() {
        cy.get(buttonStopWatch).click();
      }

      function fillInTimeSpent() {
        cy.get(buttonStopWatch).click();
        cy.get(inputNumber)
          .eq(1)
          .should('have.value', '')
          .type(inputTimeSpent)
          .should('have.value', inputTimeSpent);
      }

      function clearEstimateHours() {
        cy.get(inputNumber)
          .eq(0)
          .clear()
          .should('have.value', '')
          .wait(5000);
      }

      function clearTimeTracking() {
        cy.get(buttonStopWatch).click();
        cy.get(inputNumber).eq(1).clear();
        cy.wait(1000);
        cy.get(inputNumber).eq(2).clear();
        cy.wait(1000);
        cy.contains("button", "Done").click();
  }


      function fillInTimeRemaining() {
        cy.get(inputNumber)
          .eq(2)
          .should('have.value', '')
          .type(inputTimeRemaining)
          .should('have.value', inputTimeRemaining);
      }
      
      function clearTimeRemaining() {
        cy.get(inputNumber)
          .eq(1)
          .should('have.value', inputTimeRemaining)
          .clear()
          .should('have.value', '');
      }

      function clickDone() {
        cy.contains('button', 'Done').click().should('not.exist');
      }
      
      function editedEstimateTime() {
    cy.get(inputNumber)
        .should('have.value', inputEstimateHours)
        .clear()
        .type(editedEstimateHours)
        .should('have.value', editedEstimateHours);
    }

    function checkNoTimeLoggedIsVisible() {
      cy.contains('No time logged').should('be.visible');
    }
  

// Test cases    
    describe('Testing time tracking', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
                cy.visit(url + '/board');
                cy.contains('This is an issue of type: Task.').click();
            });
        });
        

        it('Should test time tracking functionality of existing issue', () => {
                //clear estimate and time tracking      
                clearEstimateHours();
                clearTimeTracking();
                checkNoTimeLoggedIsVisible();
                closeIssueModal();
                getIssueModal();

                //log in estimate and time tracking
                inputEstimateTime();
                fillInTimeSpent();
                fillInTimeRemaining();
                clickDone();
                closeIssueModal();
                getIssueModal();

                //update estimate and time tracking

                editedEstimateTime();
                closeIssueModal();
                getIssueModal();

              });
          
            });
          
        