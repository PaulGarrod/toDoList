let todos = ["Finish Portfolio",
"Take Lisa for Sushi",
"Apply for Dev Jobs",
"take dog for a walk"
];

//function to create li's from the array
todos.forEach(function(todo){
    console.log(`${todo}`);
    $("ul").append(`
    <li>
    <span class='trashIcon'><i class='fa fa-trash'></i>
    </span><span class='todoText'>${todo}</span>
    <span class='flagIcon'><i class='far fa-flag'></i></span>
    </li>`);
});

$("input[type='text']").keypress(function(e){
    if(e.which === 13){
        var todoText = $(this).val();
        $(this).val("");
        //change this to add todo to array
        $("ul").append(`
        <li>
        <span class='trashIcon'><i class='fa fa-trash'></i>
        </span><span class='todoText'>${todoText}</span>
        <span class='flagIcon'><i class='far fa-flag'></i></span>
        </li>`);
        };
});

//check off specific todos by clicking
$("ul").on("click", ".todoText", function(){
    $(this).toggleClass("completed");
});

//click on x to delete todo
$("ul").on("click", ".trashIcon", function(e){
    $(this).parent().fadeOut(750, function(){
        $(this).remove();
    });
    e.stopPropagation();
    //this stops event bubbling up and triggering parent events
});

$("ul").on("click", ".flagIcon", function () {
    $("i", this).toggleClass("far fas");
})

$("#plus").click(function(){
    $("input[type='text']").fadeToggle();
})
