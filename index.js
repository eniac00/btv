import { BinaryTreeNode, drawBinaryTree, VisualizationType } from 'binary-tree-visualizer';

function start(){

    var txt = document.getElementById('txt').value;

    var txtArr = txt.split(",").map(function(item) {
        return item.trim();
      });

    console.log(txtArr);
    let root;
    root = createTreeVis(txtArr, root, 1);

    drawBinaryTree(root, document.querySelector('canvas'), {
        type: VisualizationType.SIMPLE
    });
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

window.start = start;

