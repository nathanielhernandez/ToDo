var pastRandom = 0;

var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false,
    });
  },
  changeTodo: function(position, toDoText) {
    this.todos[position].todoText = toDoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });

  }
};


var handler = {
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    if(addTodoTextInput.value != '') {
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
      placeHolders.changePlaceholder();
      view.displayTodos();
    }
  },
  changeTodo: function(position, newTodo) {
    todoList.changeTodo(position,newTodo);
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var toggleAllDiv = document.getElementById('toggleAllContainer');
    var todosUl = document.querySelector('ul');
    console.log(toggleAllDiv);

    if(todoList.todos.length > 1 && toggleAllDiv.childNodes.length > 0 && toggleAllDiv.childNodes.length < 2) {
      toggleAllDiv.appendChild(this.createToggleAllCheckbox());
      toggleAllDiv.addEventListener('click', handler.toggleAll);
    } else if(todoList.todos.length === 1 && toggleAllDiv.childNodes.length === 2) {
      toggleAllDiv.removeChild(document.getElementById('toggleAllCheckbox'));
    }

    todosUl.innerHTML = '';

    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = todo.todoText;

      todoLi.id = position;
      todoLi.appendChild(this.createToggleCheckmark(position));
      if (todo.completed === true) {
        var strike = document.createElement('strike');
        strike.textContent = todoTextWithCompletion;
        todoLi.appendChild(strike);
      } else {
        var paragraph = document.createElement('p');
        paragraph.textContent = todoTextWithCompletion;
        todoLi.appendChild(paragraph);
      }

      var optionButtonsContainer = document.createElement('div');
      optionButtonsContainer.className = 'optionButtons';

      optionButtonsContainer.appendChild(this.createEditButton());
      optionButtonsContainer.appendChild(this.createDeleteButton());
      todoLi.appendChild(optionButtonsContainer);
      todosUl.appendChild(todoLi);
    }, this);
  },
  createToggleAllCheckbox: function() {
    var toggleAllCheckbox = document.createElement('input');
    toggleAllCheckbox.type = 'checkbox';
    toggleAllCheckbox.id = 'toggleAllCheckbox';
    return toggleAllCheckbox;
  },
  createEditButton: function() {
    var editButton = document.createElement('button');

    editButton.className = 'editButton';
    return editButton;
  },
  createSaveButton: function() {
    var saveButton = document.createElement('button');

    saveButton.className = 'saveButton';
    return saveButton;
  },
  createDeleteButton: function() {
    //Create delete button - assign to var deleteButton
    var deleteButton = document.createElement('button');

    //Set button Label with .textContent and class name with .className
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  createToggleCheckmark: function(position) {
    var toggleCheckmark = document.createElement('input');
    toggleCheckmark.className = 'toggleCheckbox';
    toggleCheckmark.type = 'checkbox';
    if(todoList.todos[position].completed === true) {
      toggleCheckmark.checked = true;
    }
    return toggleCheckmark;

  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {
      
      //Get the element that was clickd on
      var elementClicked = event.target;
   
      //Check if elementClicked is a delete button.
      if (elementClicked.className === 'deleteButton') {
        handler.deleteTodo(parseInt(elementClicked.parentNode.parentNode.id));
      }

      if (elementClicked.className === 'toggleCheckbox') {
        handler.toggleCompleted(parseInt(elementClicked.parentNode.id));
      }

      if (elementClicked.className === 'editButton') {
        var currentTodoItem = elementClicked.parentNode.previousElementSibling;
        var checkbox = currentTodoItem.previousElementSibling;
        var deleteButton = elementClicked.nextElementSibling;
        var grandParentNode = elementClicked.parentNode.parentNode;
        var parentNode = elementClicked.parentNode;

        checkbox.disabled = true;

        var newTodoTextInput = document.createElement('input');
        newTodoTextInput.type = 'text';
        newTodoTextInput.className = 'newTodoTextInput';
        newTodoTextInput.value = currentTodoItem.textContent;

        grandParentNode.removeChild(currentTodoItem);
        grandParentNode.insertBefore(newTodoTextInput, elementClicked.parentNode);

        console.log(elementClicked);

        parentNode.removeChild(elementClicked);
        parentNode.insertBefore(view.createSaveButton(), deleteButton);
      }

      if (elementClicked.className === 'saveButton') {
        var textInput = elementClicked.parentNode.previousElementSibling;
        var checkbox = textInput.previousElementSibling;
        var deleteButton = elementClicked.nextElementSibling;
        var parentNode = elementClicked.parentNode;
        var grandParentNode = parentNode.parentNode;

        var newTodoText = textInput.value;

        handler.changeTodo(grandParentNode.id, newTodoText);

      }
    });

    var input = document.getElementById('addTodoTextInput');
    input.addEventListener('keyup', function(event) {
      if(event.keyCode === 13) {
        handler.addTodo();
      }
    });
  }
};

view.setUpEventListeners();

var placeHolders = {
  list: [
    'Learn Javascript',
    'Forget Pega',
    'Drink Coffee',
    'Create GUI using Visual Basic',
    'Trace an IP address',
    'Happy hour break',
    'Bake a cake',
    'Take a walk',
    'Learn React.js',
    'Gaming break!'
  ],
  randomPlacehold: function() {
    debugger;
    var max = this.list.length;
    var random = this.random(0, max);
    while (random === pastRandom) {
      random = this.random(0, max);
    }
    console.log(random);
    console.log(this.list[random]);
    return this.list[random];
  },
  changePlaceholder: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    addTodoTextInput.placeholder = this.randomPlacehold();
  },
  random: function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
};