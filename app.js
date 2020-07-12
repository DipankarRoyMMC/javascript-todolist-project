// Define From UI Variable 
const form = document.querySelector('#task-form');
const inputValue = document.querySelector('#input-task');
const filter = document.querySelector('#filter-input');
const taskList = document.querySelector('.collection');
const clearTask = document.querySelector('.clear-task');

// Load All Event 
loadEventListeners();

// Custom Function: loadEventListeners 
function loadEventListeners(){
    //DOM Load Event 
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add Task 
    form.addEventListener('submit', addTask)

    // Remove Task 
    taskList.addEventListener('click', removeTask);

    // Clear Task 
    clearTask.addEventListener('click', taskClear);

    // Filter 
    filter.addEventListener('keyup', taskFilter);
    
}

// Function : addTask()
function addTask(e){
    if(inputValue.value === ''){
        alert("Please Add Your Task");        
        
    } else{
        // Create li Element 
        const li = document.createElement('li');
        // Add Class 
        li.className = 'collection-item';
        // Create text node and append to li 
        li.appendChild(document.createTextNode(inputValue.value));

        // Link Create 
        const link = document.createElement('a');
        // Add Class 
        link.className = 'delete-item secondary-content ';

        // Add Icon HTML 
        link.innerHTML = '<i class="fas fa-trash-alt"></i>'
        // Append Link to li 
        li.appendChild(link);

        // Append li to ul 
        taskList.appendChild(li);

        // Add Into LS 
        addTaskInLocalStorage(inputValue.value);
        
    }
    
    form.reset();
    e.preventDefault();
}

// Function: addTaskInLocalStorage();
function addTaskInLocalStorage(newTask){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function getTask(); 
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create li Element 
        const li = document.createElement('li');
        // Add Class 
        li.className = 'collection-item';
        // Create text node and append to li 
        li.appendChild(document.createTextNode(task));

        // Link Create 
        const link = document.createElement('a');
        // Add Class 
        link.className = 'delete-item secondary-content ';

        // Add Icon HTML 
        link.innerHTML = '<i class="fas fa-trash-alt"></i>'
        // Append Link to li 
        li.appendChild(link);

        // Append li to ul 
        taskList.appendChild(li);  
    });
}

// Function : removeTask();
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        // console.log('clicked on x button');
        if(confirm("Are You Sure Delete this Item")){
            e.target.parentElement.parentElement.remove();
        }

        // Remove LS 
        removeFromLocalStorage( e.target.parentElement.parentElement);
    }
    // console.log("clicked Event fired");
    e.preventDefault();
}

// Function: removeFromLocalStorage 
function removeFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Function : clearTask(); 
function taskClear(){
    // taskList.innerHTML = '';

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // Clear From LS 
    clearFromLocalStorage();
}

// Function: taskFilter(); 
function taskFilter(e){
   const text = e.target.value.toLowerCase();

   document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = "block";
        } else{
            task.style.display = "none";
        }

   });

}

// Function: clearFromLocalStorage 
function clearFromLocalStorage(){
    localStorage.clear();
}



