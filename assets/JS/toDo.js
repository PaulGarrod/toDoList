let todosArray = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : []

const newTodo = (todo) => {
    $("ul").append(`
    <li>
    </span><span class='todoText'>${todo}</span>
    <span class='flagIcon'><i class='far fa-flag'></i></span>
    <span class='trashIcon'><i class='fa fa-trash'></i>
    </li>
    `);
}

//function to create li's from the array
todosArray.forEach((todo) => {
    newTodo(todo);
});

$("input[type='text']").keypress(function(e){
    if(e.which === 13){
        newTodo(this.value);
        todosArray.push(this.value)
        console.log(todosArray)
        localStorage.setItem('items', JSON.stringify(todosArray))
        this.value = '';
    };
});

const findIndex = (todo) => {
    const index = todosArray.findIndex(x => x === todo);
    console.log(index);
    return index;
}

const deleteTodo = (i) => {
    const index = findIndex(i)
    todosArray.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(todosArray))
};

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
})

$("#plus").click(function(){
    $("input[type='text']").fadeToggle();
})
