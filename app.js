
const addItemForm = document.querySelector('.addItem');
const taskList = document.querySelector('.tasks');
const completedTask = document.querySelector('.completedTask');
const todoTasks = JSON.parse(localStorage.getItem('todolist')) || [];
const completedTodos = JSON.parse(localStorage.getItem('completedlist')) || [];

function getCurrentDate(){
	const date = document.querySelector('#currentDate');
	let currentDate = new Date();
	let dateToday = (`Today date is ${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`);
	date.innerHTML = `<p>${dateToday}</p>`;
}

function addNewItem(e){
	e.preventDefault();
	const newItem = (this.querySelector('[name=newItem]')).value; //get value of the input item box

	const item = {
		itemName: newItem,
		done: false
	};

	todoTasks.push(item);
	populateList(todoTasks, taskList);
	localStorage.setItem('todolist', JSON.stringify(todoTasks));
	this.reset(); // reset the form to empty value
}

//populoateList takes two params one for the items that needed to be displayed and another for where that items you want to display in the page. 
function populateList(todos = [], todoList){ // todos = [] ES6 - make the items to be default array to blank incase there are no value inside 
	todoList.innerHTML = todos.map((todo, i) => {
      return `
        <li class="input-group editOff">
        	<span class="input-group-addon">
         		<input  type="checkbox" data-index=${i} id="item${i}" ${todo.done ? 'checked' : ''} />
	      	</span>
          <label class="form-control" aria-label="Text input with checkbox" for="item${i}">${todo.itemName}</label> 
          <input type="text" class="form-control" value="${todo.itemName}">
          <button class="editBtn btn btn-info">Edit</button>
          <button class="saveBtn btn btn-info">Save</button>
          <button class="deleteBtn btn btn-danger">Delete</button>
        </li>
        `; 	
	}).join(''); //.join() is going to take the array to string
};

//fn to add item checked on the new localStorage
function addItemToLocal(item, array, ul, localStorageID){
	// add item to completedTodos array
	array.push(item);
	populateList(array, ul);
	localStorage.setItem(localStorageID, JSON.stringify(array));
}

//fn to remove item checked on the current localStorage
function removeItemToLocal(item, array, localStorageID){
	// find the index id of the item by name
	const itemIndex = array.findIndex(task => task.itemName === item); //
	array.splice(itemIndex, 1); //remove item 
	//then update the localstorage
	localStorage.setItem(localStorageID, JSON.stringify(array));
}

function toggleTaskCompleted(e){
	if (!e.target.matches('input')) return; // skip if event trigger is not an input element
	if(e.target.checked){
		const itemParent = e.target.parentNode.parentNode;
		const itemLabel = itemParent.querySelector('label').textContent;

		completedTask.appendChild(itemParent);

		removeItemToLocal(itemLabel, todoTasks, 'todolist');

		//create a new item with done = true then add that item to the array 
		item = {
			itemName : itemLabel,
			done: true
		};

		addItemToLocal(item, completedTodos, completedTask, 'completedlist');
	}else{
		console.log('incomplete task!');
		let itemParent = e.target.parentNode.parentNode;
		const itemLabel = itemParent.querySelector('label').textContent;

		taskList.appendChild(itemParent);

		removeItemToLocal(itemLabel, completedTodos, 'completedlist');

		//create a new item with done = false then add that item to the array 
		item = {
			itemName : itemLabel,
			done: false
		};

		addItemToLocal(item, todoTasks, taskList, 'todolist');
	}
}

function buttons(e) {
	if(e.target.tagName === 'BUTTON'){
		const li = e.target.parentNode;
		const deleteBtn = e.target.matches('.deleteBtn');
		const editBtn = e.target.matches('.editBtn');
		const saveBtn = e.target.matches('.saveBtn');

		if(deleteBtn){
		  let listItem = e.target.parentNode;
		  let ul = listItem.parentNode;

		  // // //Remove the parent list item from the ul
		  ul.removeChild(listItem);

		}else if(editBtn){
			//add class .editOn remove class .editOff
			li.classList.add('editOn');
			li.classList.remove('editOff');
		}else if(saveBtn){
			//remove class .editOn add class .editOff
			li.classList.add('editOff');
			li.classList.remove('editOn');
		}
	}
}

populateList(todoTasks, taskList);
populateList(completedTodos, completedTask);
getCurrentDate();

const taskListItems = taskList.querySelectorAll('li');
const completedTaskItems = completedTask.querySelectorAll('li');

addItemForm.addEventListener('submit', addNewItem);

taskListItems.forEach(item => item.addEventListener('click', buttons));
completedTaskItems.forEach(item => item.addEventListener('click', buttons));

taskList.addEventListener('change', toggleTaskCompleted);
completedTask.addEventListener('change', toggleTaskCompleted);
// todoTaskItem.forEach(item => item.addEventListener('click', deleteItem));




