const list = document.getElementById('list')

//add
document.getElementById("addItem")!.addEventListener("click", () => {
  const newText = (<HTMLInputElement>document.getElementById("input")).value;
  const node = document.createElement('li');
  const buttonNode = document.createElement('button');
  buttonNode.innerHTML = 'remove'
  buttonNode.className = 'removeButton'
  node.appendChild(buttonNode);

  const textnode = document.createTextNode(newText);
  const textSpan = document.createElement('span');
  textSpan.appendChild(textnode);
  node.appendChild(textSpan);
 

  const check = document.createElement('input');
  check.type = 'checkbox';
  node.appendChild(check)
  
  document.getElementById("list")?.appendChild(node);
    

  buttonNode.addEventListener('click', removeParentElement )
  function removeParentElement () {
    node.remove();
}
check.addEventListener('change', () => {
    if (check.checked) {
      textSpan.style.textDecoration = 'line-through';
    } else {
      textSpan.style.textDecoration = 'none';
    }
  });

}
)

  





