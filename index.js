import { BinaryTreeNode, drawBinaryTree, VisualizationType } from 'binary-tree-visualizer';

let root_B;
let root;
let InOrders = "";
let PreOrders = "";
let PostOrders = "";

class Node
{
    constructor(data) {
       this.left = null;
       this.right = null;
       this.data = data;
    }
}


function start(){

    var txt = document.getElementById('txt').value;

    var txtArr = txt.split(",").map(function(item) {
        return item.trim();
      });

    root = createTreeVis(txtArr, root, 1);

    drawBinaryTree(root, document.querySelector('canvas'), {
        type: VisualizationType.SIMPLE
    });


    root_B = createTreeCalc(txtArr, root_B, 1);
    PreOrders = "";
    printPreorder(root_B);
    document.getElementById("preOrder").innerHTML = "<b>Pre-order:</b> " + PreOrders.trim();
    InOrders = "";
    printInorder(root_B);
    document.getElementById("inOrder").innerHTML = "<b>In-order:</b> " + InOrders.trim();
    PostOrders = "";
    printPostorder(root_B);
    document.getElementById("postOrder").innerHTML = "<b>Post-order:</b> " + PostOrders.trim();
}

function createTreeVis(arr, root, i){
    if (i<arr.length && arr[i]!='null' && arr[i]!='Null' && arr[i]!='None') {
        let temp = new BinaryTreeNode(arr[i]);
        root = temp;

        root.left = createTreeVis(arr, root.left, 2*i);
        root.right = createTreeVis(arr, root.right, 2*i+1);
    }

    return root;
}
function createTreeCalc(arr, root_B, i){
    if (i < arr.length && arr[i]!='null' && arr[i]!='Null' && arr[i]!='None') {
        let temp = new Node(arr[i]);
        root_B = temp;

        root_B.left = createTreeCalc(arr, root_B.left, 2 * i);

        root_B.right = createTreeCalc(arr, root_B.right, 2 * i+1);
    }
    return root_B;
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

