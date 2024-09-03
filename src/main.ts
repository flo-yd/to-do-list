const list = document.getElementById('list')

//add
document.getElementById("addItem")!.addEventListener("click", () => {
  const newText = (<HTMLInputElement>document.getElementById("input")).value;
  const node = document.createElement('li');
  const buttonNode = document.createElement('button');
  buttonNode.innerHTML = 'remove'
  buttonNode.className = 'removeButton'
  const textnode = document.createTextNode(newText);
  node.appendChild(textnode);
  node.appendChild(buttonNode);
  const check = document.createElement('input');
  check.type = 'checkbox';
  node.appendChild(check)
  document.getElementById("list")?.appendChild(node);
    

  buttonNode.addEventListener('click', removeParentElement )
  function removeParentElement () {
    node.remove();
}

  // check.addEventListener('click', crossout)
  // function crossout () {
    
  // }
}
)

  





