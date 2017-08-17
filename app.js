
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
        <li class="input-group">
        	<span class="input-group-addon">
         		<input  type="checkbox" data-index=${i} id="item${i}" ${todo.done ? 'checked' : ''} />
	      	</span>
          <label class="form-control" aria-label="Text input with checkbox" for="item${i}">${todo.itemName}</label> 
          <button class="editBtn btn btn-info">Edit</button>
          <button class="deleteBtn btn btn-danger">Delete</button>
        </li>
        `; 	
	}).join(''); //.join() is going to take the array to string
};

//fn to add item checked on the new localStorage
function addItemToLocal(item, array, localStorageID){
	//create a new item with done = true then add that item to the array 
	item = {
		itemName : item,
		done: true
	};
	// add item to completedTodos array
	array.push(item);
	populateList(array, taskList);
	localStorage.setItem(localStorageID, JSON.stringify(array));
}

//fn to remove item checked on the current localStorage
function removeItemToLocal(item, array, localStorageID){
	//remove toggled item in the array 
	const itemIndex = array.findIndex(task => task.itemName === item); //find the index id of the item by name
	
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
		addItemToLocal(itemLabel, completedTodos, 'completedlist');
	}else{
		console.log('incomplete task!');
		let itemParent = e.target.parentNode.parentNode;
		const itemLabel = itemParent.querySelector('label').textContent;

		taskList.appendChild(itemParent);

		removeItemToLocal(itemLabel, completedTodos, 'completedlist');
		addItemToLocal(itemLabel, todoTasks, 'todolist');

		// //remove toggled item in the array 
		// const itemIndex = completedTodos.findIndex(task => task.itemName === itemLabel); //find the index id of the item by name
		
		// completedTodos.splice(itemIndex, 1); //remove item 

		// //then update the localstorage
		// localStorage.setItem('completedlist', JSON.stringify(completedTodos));

		// //create a new item with done = true then add that item to the array 
		// item = {
		// 	itemName : itemLabel,
		// 	done: false
		// };
		// // add item to completedTodos array
		// todoTasks.push(item);
		// populateList(todoTasks, taskList);
		// localStorage.setItem('todolist', JSON.stringify(todoTasks));
	}

}

function deleteItem(e) {
  if (!e.target.matches('.deleteBtn')) return;
  let listItem = e.target.parentNode;
  console.log(listItem);
  let ul = listItem.parentNode;

  // // //Remove the parent list item from the ul
  ul.removeChild(listItem);
}

populateList(todoTasks, taskList);
populateList(completedTodos, completedTask);
getCurrentDate();

const taskListItems = taskList.querySelectorAll('li');
const completedTaskItems = completedTask.querySelectorAll('li');

addItemForm.addEventListener('submit', addNewItem);

taskList.addEventListener('change', toggleTaskCompleted);
completedTask.addEventListener('change', toggleTaskCompleted);

taskListItems.forEach(item => item.addEventListener('click', deleteItem));
completedTaskItems.forEach(item => item.addEventListener('click', deleteItem));

// todoTaskItem.forEach(item => item.addEventListener('click', deleteItem));




