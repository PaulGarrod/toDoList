let todosArray = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : [];

const newTodo = (todo) => {
    if(todo.important === true){
        $("ul").append(`
        <li>
        </span><span class='todoText'>${todo.title}</span>
        <span class='flagIcon'><i class='fas fa-flag'></i></span>
        <span class='trashIcon'><i class='fa fa-trash'></i>
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

//function to create li's from the array
const renderData = (todos) => {
    $('li').remove();
    todos.forEach((todo) => {
        newTodo(todo);
    });
};
    
renderData(todosArray);

let submitTodo = function(){
    if($('#todoTitle').val() !== ''){
        let newTitle = $("input[type='text']").val();
        let newDesc = $("#todoDesc").val();
        let newImportant = $("input[type=checkbox][name=important]:checked").val() === "on" ? true : false;
        const todo = {
            title: newTitle,
            desc: newDesc,
            important: newImportant
        }
        todosArray.push(todo);
        newTodo(todo);
        localStorage.setItem('items', JSON.stringify(todosArray))
    }
}

$("input[type='text']").keypress(function(e){
    if(e.which === 13){
    submitTodo()
    this.value = '';
    };
});

$("#submit").click(function(){
    submitTodo()
    $('#todoTitle').val('')
    $('#todoDesc').val('')
    $('input[type=checkbox]').prop('checked', false);
});

const findIndex = (todo) => {
    const index = todosArray.findIndex(x => x.title === todo);
    return index;
}

const deleteTodo = (todo) => {
    const index = findIndex(todo)
    todosArray.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(todosArray))
};

const deleteAllTodos = (todosArray) => {
    todosArray.splice(0, todosArray.length);
    localStorage.setItem('items', JSON.stringify(todosArray))
    localStorage.getItem('items')
};

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

//check off specific todos by clicking
$("ul").on("click", ".todoText", function(){
    $(this).toggleClass("completed");
});

$("ul").on("click", ".flagIcon", function () {
    $("i", this).toggleClass("far fas");
    toggleFlag(this.parentNode.innerText)
})

$("#plus").click(function(){
    $("#submit").fadeToggle();
    $("#bottomBtns").fadeToggle();

})

$("#clearAll").click(function(){
    deleteAllTodos(todosArray)
    renderData(todosArray)
});

$('#reorder').click(function(){
    todosArray.sort((a, b) => a.important < b.important ? 1 : -1);
    renderData(todosArray);
});