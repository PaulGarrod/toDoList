let todos = [
    {
        title: "Complete Portfolio",
        important: false
    }, {
        title: "Apply for Dev Jobs",
        important: true
    }, {
        title: "Take dogs for a walk",
        important: true
    }, {
        title: "Take Lisa for Sushi",
        important: true
    }
];

//function to create li's from the array
todos.forEach(function(todo){
    console.log(`${todo.title}`);
    $("ul").append(`
    <li>
    <span class='trashIcon'><i class='fa fa-trash'></i>
    </span><span class='todoText'>${todo.title}</span>
    <span class='flagIcon'><i class='far fa-flag'></i></span>
    </li>`);
});

//check off specific todos by clicking
$("ul").on("click", ".todoText", function(){
    $(this).toggleClass("completed");
});

//click on x to delete todo
// $("ul").on("click", ".trashIcon", function(e){
$(".trashIcon").on("click", function(e){
    $(this).parent().fadeOut(750, function(){
        $(this).remove();
    });
    e.stopPropagation();
    //this stops event bubbling up and triggering parent events
});

$(".flagIcon").on("click", function () {
    $("i", this).toggleClass("fas far");
})

$("input[type='text']").keypress(function(e){
    if(e.which === 13){
        var todoText = $(this).val();
        $(this).val("");
        //change this to add todo to array
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
        };
});

$("#plus").click(function(){
    $("input[type='text']").fadeToggle();
})
