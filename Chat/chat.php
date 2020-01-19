<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
</head>
<body>
<div id="chat"></div>
<input type="text" name="send" id="send">
<button id="btn">Send</button>
<script>
$(document).ready(function(){

    var conn = new WebSocket('ws://localhost:8080');
    var chat = document.getElementById('chat');
    conn.onopen = function(e) {
        console.log("Connection established!");
    };
    
    conn.onmessage = function(e) {
      
        $data = JSON.parse(e.data);

        $msg = $data['from']+": "+$data['msg'];
        chat.prepend($msg);
        //    (e.data);
    };
    $("#btn").on('click', function(){
        
        var msg = $("#send").val();
        var data = {id:'calvin', msg : msg};
        alert(data['from'])

        conn.send(JSON.stringify(data));
    })
})
</script>    
</body>
</html>
