var username = localStorage.getItem("username");
var balance = parseFloat(localStorage.getItem("balance")).toFixed(2);

document.getElementById("balance").textContent = "Hello, " + username + "! Balance: $" + balance;

var grid = document.querySelector('.grid');
var selectedBoxes = [];
var isSelecting = false;
var selectionCompleted = false;

for (var i = 0; i < 10000; i++) {
    var box = document.createElement('div');
    box.addEventListener('mouseover', handleBoxHover);
    box.addEventListener('click', handleBoxClick);
    grid.appendChild(box);
}

grid.style.display = 'grid';
grid.style.gridTemplateColumns = 'repeat(100, 10px)';
grid.style.gridAutoRows = '10px';

fetch('../php/occupied_grids.php')
    .then(response => response.json())
    .then(data => {
        paintOccupiedBoxes(data);
    })
    .catch(error => {
        console.log('Error fetching occupied grids:', error);
    });

function paintOccupiedBoxes(occupiedGrids) {
    for (var i = 0; i < occupiedGrids.length; i++) {
        var gridInfo = occupiedGrids[i];
        var xCoordinate = gridInfo.x_coordinate;
        var yCoordinate = gridInfo.y_coordinate;
        var width = gridInfo.width;
        var height = gridInfo.height;

        for (var row = xCoordinate; row < xCoordinate + height; row++) {
            for (var col = yCoordinate; col < yCoordinate + width; col++) {
                var index = row * 100 + col;
                var box = grid.children[index];
                box.classList.add('occupied-box');
                box.addEventListener('click', handleOccupiedBoxClick);
            }
        }
    }
}

function handleOccupiedBoxClick(event) {
    if(!isGridSelected) occupiedMessage.style.display = 'block';
}

function handleBoxHover(event) {
    if (!isSelecting && !selectedBoxes.includes(this)) {
        this.classList.add('selected-box');
    }
}

var occupiedMessage = document.getElementById("occupiedMessage");
var isGridSelected = false;
function handleBoxClick(event) {
    if (!isSelecting && !isGridSelected) {
        isSelecting = true;
        selectedBoxes.push(this);

        if (!this.classList.contains('occupied-box')) {
            this.classList.add('selected-box');
            this.classList.add('red-border');
        }

        if (this.classList.contains('occupied-box')) {
            isSelecting = false;
            selectedBoxes.pop();
            occupiedMessage.style.display = 'block';
            return;
        } else {
            var hasOccupied = selectedBoxes.some(box => box.classList.contains('occupied-box'));
            if (hasOccupied) {
                isSelecting = false;
                selectedBoxes.forEach(box => box.classList.remove('selected-box', 'red-border'));
                selectedBoxes = [];
                occupiedMessage.style.display = 'block';
                return;
            } else {
                occupiedMessage.style.display = 'none';
            }
        }
    } else {
        var prevBox = selectedBoxes[selectedBoxes.length - 1];
        var prevIndex = Array.prototype.indexOf.call(grid.children, prevBox);
        var prevRow = Math.floor(prevIndex / 100);
        var prevCol = prevIndex % 100;

        var currentIndex = Array.prototype.indexOf.call(grid.children, this);
        var currentRow = Math.floor(currentIndex / 100);
        var currentCol = currentIndex % 100;

        if (currentRow < prevRow || currentCol < prevCol) {
            isSelecting = false;
            selectedBoxes.forEach(box => box.classList.remove('selected-box', 'red-border'));
            selectedBoxes = [];
            occupiedMessage.style.display = 'block';
            return;
        }

        for (var row = Math.min(prevRow, currentRow); row <= Math.max(prevRow, currentRow); row++) {
            for (var col = Math.min(prevCol, currentCol); col <= Math.max(prevCol, currentCol); col++) {
                var index = row * 100 + col;
                var box = grid.children[index];
                if (box.classList.contains('occupied-box')) {
                    isSelecting = false;
                    selectedBoxes.forEach(box => box.classList.remove('selected-box', 'red-border'));
                    selectedBoxes = [];
                    occupiedMessage.style.display = 'block';
                    return;
                }
            }
        }

        isSelecting = false;
        selectedBoxes.push(this);
        this.classList.add('selected-box');
        displaySelectionInfo();

        selectedBoxes = [];
        isGridSelected = true;

        occupiedMessage.style.display = 'none';
    }
}

var topLeftX, topLeftY, bottomRightX, bottomRightY, width, height, price;

function displaySelectionInfo() {
    var topLeft = selectedBoxes[0];
    var bottomRight = selectedBoxes[selectedBoxes.length - 1];
    var topLeftIndex = Array.prototype.indexOf.call(grid.children, topLeft);
    var bottomRightIndex = Array.prototype.indexOf.call(grid.children, bottomRight);

    topLeftX = Math.floor(topLeftIndex / 100);
    topLeftY = topLeftIndex % 100;
    bottomRightX = Math.floor(bottomRightIndex / 100);
    bottomRightY = bottomRightIndex % 100;

    width = bottomRightY - topLeftY + 1;
    height = bottomRightX - topLeftX + 1;
    price = width * height * 100;

    var container = document.createElement('div');
    container.className = 'info-container';

    var info = document.createElement('div');
    info.id = 'info';
    info.textContent = 'Selected Area: from (' + topLeftX + ',' + topLeftY + ') to (' + bottomRightX + ',' + bottomRightY + ')';
    info.textContent += ' | Width: ' + width + ' | Height: ' + height;
    info.textContent += ' | Price to buy: $' + price;

    var buyButton = document.createElement('button');
    buyButton.id = 'buyButton';
    buyButton.textContent = 'Buy';
    buyButton.addEventListener('click', handleBuyClick);

    container.appendChild(info);
    container.appendChild(buyButton);
    grid.insertAdjacentElement('afterend', container);
    grid.insertAdjacentElement('afterend', buyButton);
    grid.insertAdjacentElement('afterend', info);

    for (var row = topLeftX; row <= bottomRightX; row++) {
        for (var col = topLeftY; col <= bottomRightY; col++) {
            var index = row * 100 + col;
            var box = grid.children[index];
            box.classList.add('red-border');
        }
    }

    if (price > balance) {
        document.getElementById("gridNotBought").textContent = "GRID CANNOT BE BOUGHT";
        buyButton.classList.add('disabled');
        buyButton.disabled = true;
    } else {
        buyButton.classList.remove('disabled');
        buyButton.disabled = false;
    }
}

function handleBuyClick(event) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/buy_pixels.php");
    xhr.setRequestHeader("Content-Type", "application/json");
  
    var data = {
      userId: localStorage.getItem("userId"),
      topLeftX: topLeftX,
      topLeftY: topLeftY,
      width: width,
      height: height
    };
  
    xhr.send(JSON.stringify(data));
  
    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
            console.log('Grid bought!');
            document.getElementById("gridBought").textContent = "GRID BOUGHT SUCCESSFULLY";
            
            localStorage.setItem("grid_id_2", response.grid_id_2);
            console.log(localStorage.getItem("grid_id"));
            localStorage.setItem("grid_id", response.grid_id);
            console.log(localStorage.getItem("grid_id"));
    
            var newBalance = parseFloat(localStorage.getItem("balance")) - price;
            localStorage.setItem("balance", newBalance.toFixed(2));
    
            balance = newBalance.toFixed(2);
            document.getElementById("balance").textContent = "Hello, " + username + "! Balance: $" + balance;
        } else {
            console.log('Error buying grid:', response.message);
            document.getElementById("gridBought").textContent = "GRID CANNOT BE BOUGHT";
        }
      } else {
        console.log('Request error:', xhr.status);
      }
    };
  }
  
