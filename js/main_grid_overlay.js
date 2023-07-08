var username = localStorage.getItem("username");
var balance = parseFloat(localStorage.getItem("balance")).toFixed(2);
var gridId = localStorage.getItem("grid_id");
var gridId2 = localStorage.getItem("grid_id_2");

document.getElementById("balance").textContent = "Hello, " + username + "! Balance: $" + balance;

var buyPixelsButton = document.getElementById("buyPixelsButton");
var uploadImageButton = document.getElementById("uploadImageButton");
var uploadLinkButton = document.getElementById("uploadLinkButton");

if (gridId!=='null' && gridId2!=='null') {
    buyPixelsButton.style.pointerEvents = "none";
    buyPixelsButton.classList.add("unclickable");
} else if (gridId==='null' && gridId2==='null') {
    uploadImageButton.style.pointerEvents = "none";
    uploadImageButton.classList.add("unclickable");
    
    uploadLinkButton.style.pointerEvents = "none";
    uploadLinkButton.classList.add("unclickable");
}


document.addEventListener('DOMContentLoaded', function() {
  var grid = document.querySelector('.grid');
  var tooltips = {};

  var boxWidth = 10;
  var boxHeight = 10;

  var gridWidth = 100 * boxWidth;
  var gridHeight = 100 * boxHeight;

  grid.style.width = gridWidth + 'px';
  grid.style.height = gridHeight + 'px';

  for (var row = 0; row < 100; row++) {
    for (var col = 0; col < 100; col++) {
      var box = createBox(row, col);
      grid.appendChild(box);
    }
  }

  fetch('../php/occupied_grids.php')
    .then(response => response.json())
    .then(data => {
      processOccupiedBoxes(data);
    })
    .catch(error => {
      console.log('Error fetching occupied grids:', error);
    });

  function processOccupiedBoxes(occupiedGrids) {
    for (var i = 0; i < occupiedGrids.length; i++) {
      var gridInfo = occupiedGrids[i];
      var xCoordinate = gridInfo.x_coordinate;
      var yCoordinate = gridInfo.y_coordinate;
      var width = gridInfo.width;
      var height = gridInfo.height;
      var hyperlink = gridInfo.hyperlink;
      var tooltipSlogan = gridInfo.tooltip;

      for (var row = xCoordinate; row < xCoordinate + height; row++) {
        for (var col = yCoordinate; col < yCoordinate + width; col++) {
          var boxId = 'box-' + row + '-' + col;
          var box = document.getElementById(boxId);

          if (hyperlink || tooltipSlogan) {
            box.href = hyperlink;
            box.tooltip = tooltipSlogan;
            tooltips[boxId] = hyperlink;
            box.addEventListener('mouseover', showTooltip);
            box.addEventListener('mouseout', hideTooltip);
          }
        }
      }
    }
  }

  function createBox(row, col) {
    var box = document.createElement('a');
    box.id = 'box-' + row + '-' + col;
    box.className = 'box';
    box.style.gridColumn = col + 1;
    box.style.gridRow = row + 1;
    box.style.textDecoration = 'none';
    box.target = '_blank';
    return box;
  }

  function showTooltip(event) {
    var box = event.target;
    var hyperlink = box.href;
    var tooltipSlogan = box.tooltip;
    if (hyperlink) {
      var tooltip = createTooltip(tooltipSlogan);
  
      var offsetX = -240;
      var offsetY = -280;
      var mouseX = event.clientX + window.scrollX + offsetX;
      var mouseY = event.clientY + window.scrollY + offsetY;
  
      tooltip.style.position = 'absolute';
      tooltip.style.left = mouseX + 'px';
      tooltip.style.top = mouseY + 'px';
      tooltip.style.width = 'auto';
      tooltip.style.whiteSpace = 'nowrap';
  
      document.body.appendChild(tooltip);
      box.appendChild(tooltip);
    }
  }

  function hideTooltip(event) {
    var box = event.target;
    var tooltip = box.querySelector('.tooltip');
    if (tooltip) {
      box.removeChild(tooltip);
    }
  }

  function createTooltip(text) {
    var tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    return tooltip;
  }
});

  