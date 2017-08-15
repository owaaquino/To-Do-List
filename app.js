
const addItemForm = document.querySelector('.addItem');
const taskList = document.querySelector('.tasks');
const completedTask = document.querySelector('.completedTask');
const todoTasks = JSON.parse(localStorage.getItem('todolist')) || [];
const completedTodos = JSON.parse(localStorage.getItem('completedlist')) || [];

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

function toggleTaskCompleted(e){
	if (!e.target.matches('input')) return; // skip if event trigger is not an input element
	if(e.target.checked){
		const itemParent = e.target.parentNode.parentNode;
		const itemLabel = itemParent.querySelector('label').textContent;

		completedTask.appendChild(itemParent);
		//remove toggled item in the array 
		const itemIndex = todoTasks.findIndex(task => task.itemName === itemLabel); //find the index id of the item by name
		
		todoTasks.splice(itemIndex, 1); //remove item 

		//then update the localstorage
		localStorage.setItem('todolist', JSON.stringify(todoTasks));

		//create a new item with done = true then add that item to the array 
		item = {
			itemName : itemLabel,
			done: true
		};
		// add item to completedTodos array
		completedTodos.push(item);
		populateList(completedTodos, completedTask);
		localStorage.setItem('completedlist', JSON.stringify(completedTodos));

	}else{
		console.log('incomplete task!');
		let itemParent = e.target.parentNode.parentNode;
		const itemLabel = itemParent.querySelector('label').textContent;

		taskList.appendChild(itemParent);

		//remove toggled item in the array 
		const itemIndex = completedTodos.findIndex(task => task.itemName === itemLabel); //find the index id of the item by name
		
		completedTodos.splice(itemIndex, 1); //remove item 

		//then update the localstorage
		localStorage.setItem('completedlist', JSON.stringify(completedTodos));

		//create a new item with done = true then add that item to the array 
		item = {
			itemName : itemLabel,
			done: false
		};
		// add item to completedTodos array
		todoTasks.push(item);
		populateList(todoTasks, taskList);
		localStorage.setItem('todolist', JSON.stringify(todoTasks));
	}

}

addItemForm.addEventListener('submit', addNewItem);

taskList.addEventListener('change', toggleTaskCompleted);
completedTask.addEventListener('change', toggleTaskCompleted);

populateList(todoTasks, taskList);
populateList(completedTodos, completedTask);


// function getCurrentDate(){
// 	const date = document.querySelector('#currentDate');
// 	let currentDate = new Date();
// 	let dateToday = (`${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`);
// 	date.innerHTML = `<p>${dateToday}</p>`;
// }

// getCurrentDate();