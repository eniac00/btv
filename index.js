import { BinaryTreeNode, drawBinaryTree, VisualizationType } from 'binary-tree-visualizer';

// variable for printing purpose
let InOrders = "";
let PreOrders = "";
let PostOrders = "";

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
    
    // creating the binary tree
    let root = createTree(txtArr);

    
    // drawing the binary tree by using the package from here
    drawBinaryTree(root, document.querySelector('canvas'), {
        type: VisualizationType.SIMPLE
    });


    PreOrders = "";
    printPreorder(root);
    document.getElementById("preOrder").innerHTML = "<b>Pre-order:</b> " + PreOrders.trim();

    InOrders = "";
    printInorder(root);
    document.getElementById("inOrder").innerHTML = "<b>In-order:</b> " + InOrders.trim();

    PostOrders = "";
    printPostorder(root);
    document.getElementById("postOrder").innerHTML = "<b>Post-order:</b> " + PostOrders.trim();
}


// this is responsible for drawing the whole tree in the canvas 
function createTree(arr){
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

function printInorder(node) {
    if (node == null)
        return;
    printInorder(node.left);
    InOrders += node.value + " ";
    printInorder(node.right);
}

function printPreorder(node) {
    if (node == null)
        return;
    PreOrders += node.value + " ";
    printPreorder(node.left);
    printPreorder(node.right);
}

function printPostorder(node) {
    if (node == null)
        return;
    printPostorder(node.left);
    printPostorder(node.right);
    PostOrders += node.value + " ";
}

window.start = start;

