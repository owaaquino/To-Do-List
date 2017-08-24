function getCurrentDate(){
	const date = document.querySelector('#currentDate');
	let currentDate = new Date();
	let dateToday = (`${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`);
	date.innerHTML = `<p>${dateToday}</p>`;
}

function toggleHeaders(){
	todoTasks.length <= 0 ?	taskList.parentNode.style.display = 'none' : 'block' ;
	completedTodos.length <= 0 ? completedTask.parentNode.style.display = 'none' : 'block' ;
}

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