function test(author, quote, id){
    console.log(author, quote, id)
    document.getElementById("author").value =  author;
    document.getElementById("quote").value =  quote;
     document.getElementById("form").action = "updatequote/"+id ;
}; 

function test2(){
 let Search = document.getElementById("Search").value  ;
 document.getElementById("form1").action = "Search/"+Search ;
 
}