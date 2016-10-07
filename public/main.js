import $ from 'jquery';

$(document).ready(() => {
  let socket = io();
  let canvas, context, drawing;
  let displayGuess = $('#guess-list');
  let guessBox = $('#user-guess');
  let guess = $('#guess');
  let wordChoice = $('#wordChoice span');
  let word2draw = $('#word2draw');
  // let clear = $('#clear');

  // Function that controls the Drawing action.
  let draw = (position) => {
    context.beginPath();
    context.arc(position.x, position.y,
                     6, 0, 2 * Math.PI);
    context.fill();
  };

  canvas = $('canvas');
  context = canvas[0].getContext('2d');
  canvas[0].width = canvas[0].offsetWidth;
  canvas[0].height = canvas[0].offsetHeight;

  let clientAction = (data, word) => {
    if (data.client === 'Drawer') {
      canvas.on('mousedown', (event) => {
        console.log('mousedown');
        drawing = true;
      });

      canvas.on('mouseup', (event) => {
        console.log('mouseup');
        drawing = false;
      });

      canvas.on('mousemove', (event) => {
        if (drawing) {
          let offset = canvas.offset();
          let position = {x: event.pageX - offset.left,
                          y: event.pageY - offset.top};
          draw(position);
          socket.emit('draw', position);
        }
      });
      wordChoice.text(word);
    } else {
      guessBox.on('keydown', onKeyDown);
      guess.show();
      $('#wordChoice').hide();
    }
  };

  let clientGuess = (guess) => {
    displayGuess.append('<li>' + guess + '</li>');
  };

  let onKeyDown = (evet) => {
    if (event.keyCode !== 13) {
      return;
    }
    let guess = guessBox.val();
    console.log(guess);
    socket.emit('guess', guess);
    guessBox.val('');
  };

  socket.on('draw', draw);
  socket.on('guess', clientGuess);
  socket.on('clientAction', clientAction);
});
