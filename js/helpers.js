function getCurrentDate(){
	const date = document.querySelector('#currentDate');
	let currentDate = new Date();
	let dateToday = (`${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`);
	date.innerHTML = `<p>${dateToday}</p>`;
}


// Toggle headers if empty

// function toggleClassHeader(e){	
// 	if(e.target.tagName === 'BUTTON'){
// 		if(todoTasks.length <= 0){
// 			taskList.parentNode.classList.remove('ass');
// 		}else{
// 			taskList.parentNode.classList.add('ass');
// 		}

// 		if(completedTodos.length <= 0){
// 			completedTask.parentNode.classList.remove('ass');
// 		}else{
// 			completedTask.parentNode.classList.add('ass');
// 		}
// 	}
// }

// function headerDefault(){	
// 		todoTasks.length <= 0 ?	taskList.parentNode.style.display = 'none' : 'block' ;
// 		completedTodos.length <= 0 ? completedTask.parentNode.style.display = 'none' : 'block' ;
// }

// function toggleHeaders(e){
// 	if(e.target.tagName === 'BUTTON'){
// 		headerDefault();
// 	}
// }

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
          <button class="saveBtn btn btn-success">Save</button>
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

function whichArray(parentNode) {
	if(parentNode.classList.contains('tasks')){
		return todoTasks;
	}else{
		return completedTodos;
	};
}

function whichStorage(storage) {
	if(storage.classList.contains('tasks')){
		return 'todolist';
	}else{
		return 'completedlist';
	};
}

function whichParent(parentNode){
	if(parentNode.classList.contains('tasks')){
		return false;
	}else {
		return true;
	}
}