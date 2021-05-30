// local storage rendering
let todosArray = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : [];

//   append new todo to DOM
const newTodo = (todo) => {
    if(todo.important === true){
        $("ul").append(`
        <li>
        </span><span class='todoText'>${todo.title}</span>
        <span class='flagIcon'><i class='fas fa-flag'></i></span>
        <span class='trashIcon'><i class='fa fa-trash'></i></span>
        </li>
        `);
    } else {
        $("ul").append(`
        <li>
        </span><span class='todoText'>${todo.title}</span>
        <span class='flagIcon'><i class='far fa-flag'></i></span>
        <span class='trashIcon'><i class='fa fa-trash'></i>
        </li>
        `);
    }
};

// render current data, remove old list items
const renderData = (todos) => {
    $('li').remove();
    todos.forEach((todo) => {
        newTodo(todo);
    });
};
    
renderData(todosArray);

// submit a new to do item
const submitTodo = function(){
    if($('#todoTitle').val() !== ''){
        let newTodoItem = $("input[type='text']").val();
        let newImportant = $("input[type=checkbox][name=important]:checked").val() === "on" ? true : false;
        const todo = {
            title: newTodoItem,
            important: newImportant
        }
        todosArray.push(todo);
        newTodo(todo);
        localStorage.setItem('items', JSON.stringify(todosArray))
    }
}

// submit to do using enter key
$("input[type='text']").keypress(function(e){
    if(e.which === 13){
    submitTodo()
    this.value = '';
    $('input[type=checkbox]').prop('checked', false);
    };
});

// submit to do using button
$("#submit-button").click(function(){
    submitTodo()
    $('#todo-list-item').val('')
    $('input[type=checkbox]').prop('checked', false);
});

// find the index of a to do
const findIndex = (todo) => {
    const index = todosArray.findIndex(x => x.title === todo);
    return index;
}

// remove to do function
const deleteTodo = (todo) => {
    const index = findIndex(todo)
    todosArray.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(todosArray))
};

// remove all to dos funtion
const deleteAllTodos = (todosArray) => {
    todosArray.splice(0, todosArray.length);
    localStorage.setItem('items', JSON.stringify(todosArray))
    localStorage.getItem('items')
};

// toggle flag function
const toggleFlag = (todo) => {
    const index = findIndex(todo);
    todosArray[index].important = !todosArray[index].important;
    localStorage.setItem('items', JSON.stringify(todosArray))
}

//click on x to delete todo
$("ul").on("click", ".trashIcon", function(e){
    deleteTodo(e.target.parentNode.parentNode.innerText)
    localStorage.setItem('items', JSON.stringify(todosArray))
    $(this).parent().fadeOut(750, function(){
        $(this).remove();
    });
    console.log(todosArray)
});

//Strikethrough to do for completion
$("ul").on("click", ".todoText", function(){
    $(this).toggleClass("completed");
});

// toggle flag on click
$("ul").on("click", ".flagIcon", function () {
    $("i", this).toggleClass("far fas");
    toggleFlag(this.parentNode.innerText)
})

// show/ hide inputs using plus icon
$("#plus-icon").click(function(){
    $("#submit").fadeToggle();
    $("#input-wrapper").fadeToggle();

})

// clear all to dos on click
$("#clearAll-button").click(function(){
    deleteAllTodos(todosArray)
    renderData(todosArray)
});

// reorder to do array. ordered by flagged.
$('#reorder-button').click(function(){
    todosArray.sort((a, b) => a.important < b.important ? 1 : -1);
    renderData(todosArray);
});