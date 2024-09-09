import {DateTimeFormat, parseDate_Time, sortTasks,} from "./dateTimekagSort.ts"
const listItems = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
console.log(listItems);
const list = document.getElementById('list');


function saveToLocalStorage() {
  const items = [];
  document.querySelectorAll('#list li').forEach((li) => {
    const text = li.querySelector('span')?.textContent;
    const checkbox = li.querySelector('input[type="checkbox"]') as HTMLInputElement;
    const dateTimeElement = li.querySelector('.date_time') as HTMLSpanElement;

    if (text !== null && checkbox && dateTimeElement) {
      const checked = checkbox.checked;
      const dateTime = dateTimeElement.textContent || ''; 
      items.push({ text, checked, dateTime });
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}

function expiredTasks() {
  setInterval(() => {
    document.querySelectorAll('#list li').forEach((li) => {
      const textSpan = li.querySelector('span') as HTMLElement;
      const dateTimeElement = li.querySelector('.date_time') as HTMLElement;

      if (textSpan && dateTimeElement) {
        const originalDateTime = (dateTimeElement as HTMLElement).dataset.originalDateTime;
        if (originalDateTime) {
          const dueDate = parseDate_Time(originalDateTime);
          const currentDate = new Date();

          if (dueDate && dueDate < currentDate) {
            textSpan.style.color = 'red'; 
            dateTimeElement.style.color = 'red';
          } else {
            textSpan.style.color = 'black'; 
            dateTimeElement.style.color = 'black';
          }
        }
      }
    });
  }, 10); 
}

function renderList() {
  list.innerHTML = '';
  const sortedItems = sortTasks(listItems);
  
  sortedItems.forEach(item => {
    const node = document.createElement('li');

    const buttonNode = document.createElement('button');
    buttonNode.innerHTML = 'remove';
    buttonNode.className = 'removeButton';
    node.appendChild(buttonNode);

    const textnode = document.createTextNode(item.text);
    const textSpan = document.createElement('span');
    textSpan.appendChild(textnode);
    textSpan.id = 'textSpan'
    node.appendChild(textSpan);

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.id = 'checkbox'
    check.checked = item.checked;
    node.appendChild(check);

    const displayTime = document.createElement('span');
    displayTime.className = 'date_time';
    displayTime.textContent = item.dateTime;
    (displayTime as HTMLElement).dataset.originalDateTime = item.dateTime;
    node.appendChild(displayTime);

    list.appendChild(node);

    buttonNode.addEventListener('click', () => {
      node.remove();
      saveToLocalStorage();
    });

    check.addEventListener('change', () => {
      if (check.checked) {
        textSpan.style.textDecoration = 'line-through';
        textSpan.style.color = 'green';
      } else {
        textSpan.style.textDecoration = 'none';
        textSpan.style.color = 'black';
      }
      saveToLocalStorage();
    });

    if (check.checked) {
      textSpan.style.textDecoration = 'line-through';
    }
    expiredTasks();
  });
}


renderList();


document.getElementById("addItem").addEventListener("click", () => {
  const newText = (document.getElementById("input") as HTMLInputElement).value;
  if (!newText) return;
  const dateTime = (document.getElementById('dateTime') as HTMLInputElement).value;
  if (!dateTime) return;

  const node = document.createElement('li');
  const buttonNode = document.createElement('button');
  buttonNode.innerHTML = 'remove';
  buttonNode.className = 'removeButton';
  node.appendChild(buttonNode);

  const textnode = document.createTextNode(newText);
  const textSpan = document.createElement('span');
  textSpan.appendChild(textnode);
  node.appendChild(textSpan);

  const check = document.createElement('input');
  check.type = 'checkbox';
  node.appendChild(check);

  const displayTime = document.createElement('span');
  displayTime.className = 'date_time';
  displayTime.textContent = DateTimeFormat(dateTime);
  (displayTime as HTMLElement).dataset.originalDateTime = dateTime;
  node.appendChild(displayTime);

  list.appendChild(node);

  buttonNode.addEventListener('click', () => {
    node.remove();
    saveToLocalStorage();
  });

  check.addEventListener('change', () => {
    if (check.checked) {
      textSpan.style.textDecoration = 'line-through';
      textSpan.style.color = 'green';
    } else {
      textSpan.style.textDecoration = 'none';
      textSpan.style.color = 'black';
    }
    saveToLocalStorage();
  });

  listItems.push({ text: newText, checked: false, dateTime: DateTimeFormat(dateTime) });
  saveToLocalStorage();
});


expiredTasks();
