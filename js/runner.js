

populateList(todoTasks, taskList);
populateList(completedTodos, completedTask);
getCurrentDate();
setInterval(generateQuote(quote), 5000);

addItemForm.addEventListener('submit', addNewItem);
// addItemForm.addEventListener('submit', toggleHeaders);

taskList.addEventListener('click', buttons);
completedTask.addEventListener('click', buttons);

taskList.addEventListener('click', toggleTaskCompleted);
// taskList.addEventListener('click', toggleHeaders);
completedTask.addEventListener('click', toggleTaskCompleted);
// completedTask.addEventListener('click', toggleHeaders);
