function $(x) { return document.getElementById(x) }
var keybindings_pref = document.getElementById('keybindings');
var tree = document.getElementById('tree1');
//alert(keybindings_pref.value);
function validateKeymap(tree) {
	console.log('validateKeymap row='+tree.editingRow);
}
function startEditing(tree) {
	// add a new row
	var treeitem = document.createElement('treeitem');
	var treerow = document.createElement('treerow');
	var cells = [];
	for(var i = 0; i < 3; i++) {
		var cell = document.createElement('treecell');
		cell.setAttribute('editable', true);
		if(i == 2)
			cell.setAttribute('label', 'function(doc, api) { }');
		treerow.appendChild(cell);
	}
	var treechildren = tree.getElementsByTagName('treechildren')[0];
	treeitem.appendChild(treerow);
	treechildren.appendChild(treeitem);
	// start editing
	tree.view.selection.select(tree.view.rowCount-1);
	tree.startEditing(tree.view.rowCount-1, tree.columns[0]);
}
function removeCurrentRow(tree) {
	var treechildren = tree.getElementsByTagName('treechildren')[0];
	var cursel = tree.view.selection.currentIndex;
	if(cursel >= 0) {
		var current_child = treechildren.getElementsByTagName('treeitem')[cursel];
		treechildren.removeChild(current_child);
	}
}
function onKeypress(tree, event) {
	switch(event.keyCode) {
		case KeyEvent.DOM_VK_RETURN:
			// onChange seems not being fired for keyboard events
			validateKeymap(tree);
			break;
		case KeyEvent.DOM_VK_TAB:
			// circulating columns in Tk style
			validateKeymap(tree);
			var col = tree.editingColumn.index;
			var row = tree.editingRow;
			col = col + (event.shiftKey ? -1 : 1);
			if(col < 0)
				col = tree.columns.length;
			setTimeout(function() { tree.view.selection.select(row); tree.startEditing(row, tree.columns[col]); }, 0);
			break;
		case KeyEvent.DOM_VK_DELETE:
			if(tree.editingRow == -1)
				removeCurrentRow(tree);
			break;
	}
}
