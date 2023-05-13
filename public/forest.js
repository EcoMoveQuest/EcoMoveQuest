const colorMap = {
    'red': 'rgba(255, 0, 0, 0.2)',
    'green': 'rgba(0, 255, 0, 0.2)',
    'blue': 'rgba(0, 0, 255, 0.2)',
    'yellow': 'rgba(255, 255, 0, 0.2)',
    'purple': 'rgba(255, 0, 255, 0.2)',
    'orange': 'rgba(255, 165, 0, 0.2)',
    'brown': 'rgba(139, 69, 19, 0.2)',
    'black': 'rgba(0, 0, 0, 0.2)',
    'white': 'rgba(255, 255, 255, 0.2)',
    'gray': 'rgba(128, 128, 128, 0.2)',
    'pink': 'rgba(255, 192, 203, 0.2)',
    'cyan': 'rgba(0, 255, 255, 0.2)',
    'lime': 'rgba(0, 255, 0, 0.2)'
};

const milestoneSet = new Set([10, 25, 50, 100, 250, 500, 1000]);

const animals = ['🐶', '🐱', '🐭', /* ... other animals */];

const colors = ['red', 'green', 'blue', /* ... other colors */];

function setColor(div, color) {
    div.style.backgroundColor = colorMap[color] || 'rgba(255, 255, 255, 0.2)';
}

function isMilestone(num) {
    return milestoneSet.has(num);
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function addTreeToForest(tree) {
    const forestContainer = document.getElementById('forestContainer');
    const treeDiv = document.createElement('div');
    treeDiv.className = 'tree';
    setColor(treeDiv, tree.color);

    const treeEmoji = document.createTextNode('🌳');
    if (isMilestone(forestContainer.children.length)) {
        treeEmoji.textContent = getRandomElement(animals);
    }

    treeDiv.appendChild(treeEmoji);
    forestContainer.appendChild(treeDiv);

    const numRows = Math.ceil(Math.sqrt(forestContainer.children.length));
    forestContainer.style.fontSize = 100 / numRows + 'vh';
}

function randomColor() {
    return getRandomElement(colors);
}

function addDemoTreesToForest(numTrees) {
    for (let i = 0; i < numTrees; i++) {
        addTreeToForest({ color: randomColor() });
    }
}

async function loadForest() {
    const urlParams = new URLSearchParams(window.location.search);
    const numTrees = urlParams.get('trees');

    if (numTrees)
        addDemoTreesToForest(numTrees);

    await loadTreesFromServer();
    updateDataContainer();
}

async function loadTreesFromServer() {
    const response = await fetch('/forest');
    const forest = await response.json();

    for (const tree of forest) {
        addTreeToForest(tree);
    }
}

function updateDataContainer() {
    let treeDayCO2Count = document.getElementById('forestContainer').children.length * 10;

    document.getElementById('dataContainer').textContent = '!Hemos ahorrado el equivalente al CO2 que ' + treeDayCO2Count + ' arboles absorben en un dia!';
}

const socket = new WebSocket('ws://localhost:3000');

socket.onopen = function () {
    console.log('Connection established');
};

socket.onmessage = function (event) {
    const newTree = JSON.parse(event.data);
    addTreeToForest(newTree);
    updateDataContainer();
};

document.addEventListener('DOMContentLoaded', () => {
    loadForest();
});