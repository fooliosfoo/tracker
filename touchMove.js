'use strict'; // To fully enable all features of modern JavaScript

// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {
        var textEl = event.target.querySelector('p')

        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
      }
    }
  })

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener


function handleFiles(e) {
    var URL = window.webkitURL || window.URL;
    var max_width = 100;
    var max_height = 100;
    var ctx = document.getElementById('canvas').getContext('2d');
    var url = URL.createObjectURL(e.target.files[0]);
    var img = new Image();
    img.onload = function() {
        var ratio = 1;
        if (img.width > max_width) {
            ratio = max_width / img.width;
        }
        if (ratio * img.height > max_height) {
            ratio = max_height / img.height;
        }
        ctx.scale(ratio, ratio);
        ctx.drawImage(img, 0, 0);
    };
    img.src = url;
}

window.onload = function() {
    var input = document.getElementById('input');
    input.addEventListener('change', handleFiles, false);
    //document.getElementById("input").append(draggable);
    //var imgClssAdd = document.getElementById('input');
	var imgClssAdd = document.getElementById('canvas'); // get the id of the canvas holding the image
    imgClssAdd.classList.add('draggable'); // add a new class to the canvas that will allow the image to move with canvas
};


