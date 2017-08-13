
const addItemForm = document.querySelector('.addItem');
const taskList = document.querySelector('.tasks');
const completedTask = document.querySelector('.completedTask');
const todoTasks = JSON.parse(localStorage.getItem('todolist')) || [];
const completedTodos = JSON.parse(localStorage.getItem('completetodolist')) || [];

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
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${todo.done ? 'checked' : ''} />
          <label for="item${i}">${todo.itemName}</label> 
        </li>
        `; 	
	}).join(''); //.join() is going to take the array to string
};

function toggleTaskCompleted(e){
	if (!e.target.matches('input')) return; // skip if event trigger is not an input element
	if(e.target.checked){
		const itemParent = e.target.parentNode;
		completedTask.appendChild(itemParent);
		localStorage.removeItem('todolist');
	}else{
		console.log('incomplete task!');
		let itemParent = e.target.parentNode;
		taskList.appendChild(itemParent);

	}

}

addItemForm.addEventListener('submit', addNewItem);

taskList.addEventListener('change', toggleTaskCompleted);
completedTask.addEventListener('change', toggleTaskCompleted);

populateList(todoTasks, taskList);

// function getCurrentDate(){
// 	const date = document.querySelector('#currentDate');
// 	let currentDate = new Date();
// 	let dateToday = (`${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`);
// 	date.innerHTML = `<p>${dateToday}</p>`;
// }

// getCurrentDate();