//check off specific todos by clicking
$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
});

//click on x to delete todo
$("ul").on("click", "span", function(e){
    $(this).parent().fadeOut(750, function(){
        $(this).remove();
    });
    e.stopPropagation();
    //this stops event bubbling up and triggering parent events
});

$("input[type='text']").keypress(function(e){
    if(e.which === 13){
        var todoText = $(this).val();
        $(this).val("");
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
        };
});

$("#plus").click(function(){
    $("input[type='text']").fadeToggle();
})