document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const categoryButtons = document.querySelectorAll('.category');

    let tasks = [];

    
    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const newTask = {
            text: taskText,
            status: 'to-do' 
        };

        tasks.push(newTask);
        renderTasks('to-do');
        newTaskInput.value = '';
        updateTaskCount();
        updateProgress();
    });

    
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
        updateTaskCount();
        updateProgress();
    }


    function editTask(index) {
        const task = tasks[index];
        const li = taskList.children[index];
        const taskTextElement = li.querySelector('.task-text');
        const currentText = taskTextElement.textContent;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;

        taskTextElement.replaceWith(input);


        const editButton = li.querySelector('.edit-task');
        editButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
            </svg>
        `;


        editButton.addEventListener('click', () => {
            const newText = input.value.trim();
            if (newText !== '') {
                tasks[index].text = newText;
                renderTasks();
            } else {
                alert('Task cannot be empty!');
            }
        }, { once: true });
    }


    function markTaskAsDone(index) {
        tasks[index].status = 'done';
        renderTasks();
        updateProgress();
    }


    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            if (task.status === filter || filter === 'all') {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="task-text ${task.status === 'done' ? 'done-task' : ''}">${task.text}</span>
                    <div class="task-actions">
                        ${task.status !== 'done' ? `
                            <button class="mark-done">
                                Mark as Done
                            </button>` : ''}
                        <button class="edit-task">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                            </svg>
                        </button>
                        <button class="delete-task">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q84 0 153 59t69 160q0 14-2 29.5t-6 31.5h-85q5-18 8-34t3-30q0-75-50-105.5T620-760q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm160-280v-80h320v80H600Z"/></svg>
                        </button>
                    </div>
                `;

                taskList.appendChild(li);


                const deleteButton = li.querySelector('.delete-task');
                const editButton = li.querySelector('.edit-task');
                const markDoneButton = li.querySelector('.mark-done');

                deleteButton.addEventListener('click', () => deleteTask(index));
                editButton.addEventListener('click', () => editTask(index));
                if (markDoneButton) {
                    markDoneButton.addEventListener('click', () => markTaskAsDone(index));
                }
            }
        });
    }


    function updateTaskCount() {
        const count = tasks.length;
        taskCount.textContent = count;
    }


    function updateProgress() {
        const doneTasks = tasks.filter(task => task.status === 'done').length;
        const totalTasks = tasks.length;
        const progress = totalTasks === 0 ? 0 : (doneTasks / totalTasks) * 100;

        document.querySelector('.progress').style.width = `${progress}%`;
    }

const taskModal = document.getElementById('taskModal');
const taskFullContent = document.getElementById('taskFullContent');
const closeModal = document.querySelector('.close');


function showTaskContent(taskText) {
    taskFullContent.textContent = taskText;
    taskModal.style.display = 'block';
}


closeModal.addEventListener('click', () => {
    taskModal.style.display = 'none';
});


window.addEventListener('click', (event) => {
    if (event.target === taskModal) {
        taskModal.style.display = 'none';
    }
});


function renderTasks(filter = 'to-do') {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        if (task.status === filter || filter === 'all') {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="task-text ${task.status === 'done' ? 'done-task' : ''}">${task.text}</span>
                <div class="task-actions">
                    ${task.status !== 'done' ? `
                        <button class="edit-task">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                            </svg>
                        </button>
                    ` : ''}
                    <button class="delete-task">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q84 0 153 59t69 160q0 14-2 29.5t-6 31.5h-85q5-18 8-34t3-30q0-75-50-105.5T620-760q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm160-280v-80h320v80H600Z"/></svg>
                    </button>
                    ${task.status !== 'done' ? `
                    <button class="mark-done">Mark as Done</button>
                    ` : ''}
                </div>
            `;

            taskList.appendChild(li);


            const deleteButton = li.querySelector('.delete-task');
            const editButton = li.querySelector('.edit-task');
            const doneButton = li.querySelector('.mark-done');
            const taskTextElement = li.querySelector('.task-text');

            deleteButton.addEventListener('click', () => deleteTask(index));


            if (task.status !== 'done') {
                editButton.addEventListener('click', () => editTask(index));
                doneButton.addEventListener('click', () => markTaskAsDone(index));
            }


            taskTextElement.addEventListener('click', () => showTaskContent(task.text));
        }
    });
}



    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.textContent.toLowerCase();
            renderTasks(category === 'to-do' ? 'to-do' : category === 'in progress' ? 'in-progress' : 'done');
        });
    });

    // Initial rendering of tasks
    renderTasks();
});
