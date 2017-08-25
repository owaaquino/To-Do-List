

populateList(todoTasks, taskList);
populateList(completedTodos, completedTask);
getCurrentDate();
generateQuote(quote);

addItemForm.addEventListener('submit', addNewItem);
// grandParent.addEventListener('submit', toggleClassHeader);

taskList.addEventListener('click', buttons);
completedTask.addEventListener('click', buttons);

taskList.addEventListener('click', toggleTaskCompleted);
// grandParent.addEventListener('click', toggleClassHeader);
completedTask.addEventListener('click', toggleTaskCompleted);
// grandParent.addEventListener('click', toggleClassHeader);
