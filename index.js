import { BinaryTreeNode, drawBinaryTree, VisualizationType } from 'binary-tree-visualizer';

// variable for printing purpose
let InOrders = "";
let PreOrders = "";
let PostOrders = "";

// class structure for creating node 
// necessary for createTreeCalc()
class Node {
    constructor(data) {
       this.left = null;
       this.right = null;
       this.data = data;
    }
}

function start(){

    // getting array as string from the text box
    var txt = document.getElementById('txt').value;

    // sanitizing the string and creating an array
    var txtArr = txt.split(",").map(function(item) {
        return item.trim();
    });

    // if first element of array is empty string just clear all the placeholders 
    // including the canvas
    if (txtArr[0] === '') {
        document.getElementById("preOrder").innerHTML = "";
        document.getElementById("inOrder").innerHTML = "";
        document.getElementById("postOrder").innerHTML = "";
        let canvas_elem = document.querySelector('canvas');
        canvas_elem.getContext('2d').clearRect(0, 0, canvas_elem.width, canvas_elem.height);
        return;
    }
    
    let root = createTreeVis(txtArr);
    
    // drawing the binary tree from here
    drawBinaryTree(root, document.querySelector('canvas'), {
        type: VisualizationType.SIMPLE
    });

    // from here all of them are used for calculating the orders
    // createTreeCalc -> create another tree from the order calculation
    let root_for_calc = createTreeCalc(txtArr);

    PreOrders = "";
    printPreorder(root_for_calc);
    document.getElementById("preOrder").innerHTML = "<b>Pre-order:</b> " + PreOrders.trim();

    InOrders = "";
    printInorder(root_for_calc);
    document.getElementById("inOrder").innerHTML = "<b>In-order:</b> " + InOrders.trim();

    PostOrders = "";
    printPostorder(root_for_calc);
    document.getElementById("postOrder").innerHTML = "<b>Post-order:</b> " + PostOrders.trim();
}


// this is responsible for drawing the whole tree in the canvas 
function createTreeVis(arr){
    let nodes = [];

    arr.forEach((elem) => {
        if (elem.toLowerCase() === 'null' || elem.toLowerCase() === 'none')
            nodes.push(null);
        else
            nodes.push(new BinaryTreeNode(elem));
    });

    let kids = nodes.slice().reverse();

    let root = kids.pop();

    nodes.forEach((node) => {
        if(node) {
            if (kids)
                node.left = kids.pop();
            if (kids)
                node.right = kids.pop();
        }
    });

    return root;
}

// this function just creates another binary tree for order calculation
function createTreeCalc(arr){
    let nodes = [];

    arr.forEach((elem) => {
        if (elem.toLowerCase() === 'null' || elem.toLowerCase() === 'none')
            nodes.push(null);
        else
            nodes.push(new Node(elem));
    });

    let kids = nodes.slice().reverse();

    let root = kids.pop();

    nodes.forEach((node) => {
        if(node) {
            if (kids)
                node.left = kids.pop();
            if (kids)
                node.right = kids.pop();
        }
    });

    return root
}

function printInorder(node) {
    if (node == null)
        return;
    printInorder(node.left);
    InOrders += node.data + " ";
    printInorder(node.right);
}

function printPreorder(node) {
    if (node == null)
        return;
    PreOrders += node.data + " ";
    printPreorder(node.left);
    printPreorder(node.right);
}

function printPostorder(node) {
    if (node == null)
        return;
    printPostorder(node.left);
    printPostorder(node.right);
    PostOrders += node.data + " ";
}

window.start = start;

