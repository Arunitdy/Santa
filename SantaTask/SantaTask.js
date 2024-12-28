let tasks = [
    { id: Date.now() + 1, text: 'Room Decoration', completed: false },
    { id: Date.now() + 2, text: 'Bake a Cake', completed: true },
    { id: Date.now() + 3, text: 'Buy Gifts', completed: false }
];
let currentFilter = 'all';

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (text) {
        tasks.push({
            id: Date.now(),
            text: text,
            completed: false
        });
        input.value = '';
        updateTaskList();
        createSnowflake();
    }
}

function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? {...task, completed: !task.completed} : task
    );
    updateTaskList();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateTaskList();
}

function filterTasks(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    updateTaskList();
}

function updateTaskList() {
    const taskList = document.getElementById('taskList');
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                No tasks yet! Add some holiday tasks to get started 🎄
            </div>
        `;
    } else {
        taskList.innerHTML = filteredTasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}">
                <div class="checkbox ${task.completed ? 'checked' : ''}" 
                     onclick="toggleTask(${task.id})">
                    ${task.completed ? '✓' : ''}
                </div>
                <div class="task-text">${task.text}</div>
                <button class="delete-btn" onclick="deleteTask(${task.id})"> ✖</button>
            </div>
        `).join('');
    }

    updateCounter();
}

function updateCounter() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    document.getElementById('counter').textContent = 
        `Completed ${completed} of ${total} tasks`;
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snow');
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.innerHTML = '❄';
    document.body.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}


setInterval(createSnowflake, 300);
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});


updateTaskList();
