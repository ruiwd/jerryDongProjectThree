    // 1. Homepage with title and instructions as well as images/choices
    //   1.1. Hover effects on the choices detailing what their choice entails

    // 2. Take value of user choice and compares it with randomly generated computer choice 
    //   2.1. If dove - dove, +1 - +1
    //   2.2. If hawk - dove, +1 - 0
    //   2.3. If hawk - hawk, +-1 - -+1

    // 3. Announcement of win or loss for said round
    //  3.1. Modal pop up, close on click

    // 4. *Potential special effects for to simulate "battle"

    // 5. *First to reach 5 points is winner of the match
    //   5.1. *Champion/Game over screen

    // 6. *Reset button to start the game over.

    const game = {};
    
    game.userName = prompt(`Choose your display name`, `xXxWingBeakxXx`);
    game.userScore = 0;
    game.computerScore = 0;

    game.computerChoice = () => {

      const randomChoice = Math.ceil(Math.random()*2);

      if (randomChoice === 1) {
        computerBirdChoice = `hawk`;
      } else {
        computerBirdChoice = `dove`;
      }

    }

    game.point = (user, computer) => {

      game.userScore = game.userScore + user;
      game.computerScore = game.computerScore + computer;

      $(`.user .score`).html(game.userScore);
      $(`.computer .score`).html(game.computerScore);

    }

    game.closeModal = (choices) => {
      $(`.modal span`).on(`click`, function() {
        $(choices).removeClass(`show`);
      })
    }

    game.fight = () => {
    
      $(`form.chooseBird`).on(`submit`, (e) => {
        e.preventDefault();

        game.computerChoice();
        const userBirdChoice = $(`form input:checked`).val();

        console.log(userBirdChoice);
        console.log(computerBirdChoice);

        if (userBirdChoice == `dove` && computerBirdChoice == `dove`) {
          
          game.point(1, 1);

          const choices = `.doveDove`
          
          $(choices).addClass(`show`);

          game.closeModal(choices);

        } 
        
        else if (userBirdChoice == `dove` && computerBirdChoice == `hawk`) {

          game.point(0, 1);

          const choices = `.hawkDoveLoss`
          
          $(choices).addClass(`show`);

          game.closeModal(choices);

        } 
        
        else if (userBirdChoice == `hawk` && computerBirdChoice == `dove`) {
          
          game.point(1, 0);

          const choices = `.hawkDoveWin`
          
          $(choices).addClass(`show`);

          game.closeModal(choices);

        } 
        
        else if (userBirdChoice == `hawk` && computerBirdChoice == `hawk`) {
          const hawkFight = Math.ceil(Math.random()*2);

          if (hawkFight === 1) {
            
            game.point(1, -1);

            const choices = `.hawkHawkWin`
            
            $(choices).addClass(`show`);
  
            game.closeModal(choices);

          }

          else {
            
            game.point(-1, 1);

            const choices = `.hawkHawkLoss`
            
            $(choices).addClass(`show`);
  
            game.closeModal(choices);

          }
        }

      })

    }

    game.init = () => {
      $(`.user h4.name`).html(game.userName);
      game.fight();
    }

    $(() => {
      game.init();
    })
