$(document).ready(function(){
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/blog", //route
        dataType: 'json',
    }).done(function( data , status) {
        $('#display').empty();
        $.each( data, function( key, list ) {
            $('#display').append(`
            <style>
            .card {
                box-shadow: 0 8px 12px 0;
                background-color: white;
                transition: 0.3s;
                width: 75%;
                margin-left: 15%;
                
            }
            
              .card:hover {
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
            } 
            </style>
            
            <div class="card" style="width:63%; margin-left: 20.5%;">
                <div class="panel panel-default" >
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <h3>${list.name}</h3>
                            </div>
                            <div class="col-sm-6" align="right">
                                <button id="remove" class="btn btn-danger " href="#" data-id="${list.id}" onclick="removeAjax(${list.id})">ลบ</button>
                                <button type="button" class="btn btn-warning " data-toggle="modal" data-target="#myModal${list.id}">เเก้ไข</button>
                            </div>
                        </div>
                        <hr>
                        <p>${list.story}</p>
                        <img src="${list.img}" width="100%" height="200px">
                    </div>
                </div>
            </div>
                <div id="myModal${list.id}" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Edit Story</h4>
                            </div>
                            <div class="modal-body">
                            <div class="" style="padding-top:30px">
                                <input type="text" class="form-control" name="ename${list.id}" placeholder="name" value="${list.name}"><br>
                                <textarea class="form-control" name="estory${list.id}" placeholder="story" value="">${list.story}</textarea><br>
                                <input type='text' class="form-control" name="eimg${list.id}" placeholder="img" value="${list.img}"><br>
                                <a href="#" class="btn btn-info" onclick="editAjax(${list.id})">edit</a>
                                <hr>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            
            `)
        });
    });
});
    function postAjax(){
        let name    = $('input[name="name"]').val();
        let story   = $('textarea[name="story"]').val();
        let img     = $('input[name="img"]').val();

        var sendInfo = {
            name: name,
            story: story,
            img: img
        };
        return $.ajax({
            url: 'http://localhost:3000/blog',
            type: 'POST',
            cache: false,
            data: sendInfo,
            success: function(data){
                $('#display').append(`
                <div class="card" style="width:63%; margin-left: 20.5%;">
                    <div class="panel panel-default" >
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-6">
                                    <h3>${data.name}</h3>
                                </div>
                                <div class="col-sm-6" align="right">
                                    <button id="remove" class="btn btn-danger " href="#" data-id="${data.id}" onclick="removeAjax(${data.id})">ลบ</button>
                                    <button type="button" class="btn btn-warning " data-toggle="modal" data-target="#myModal${data.id}">เเก้ไข</button>
                                </div>
                            </div>
                            <hr>
                            <p>${data.story}</p>
                            <img src="${data.img}" width="100%" height="100%">
                         </div>
                    </div>
                    <div id="myModal${data.id}" class="modal fade" role="dialog">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">${data.id}</h4>
                                </div>
                                <div class="modal-body">
                                <div class="" style="padding-top:30px">
                                    <input type="text" class="form-control" name="ename${data.id}" placeholder="name" value="${data.name}"><br>
                                    <textarea class="form-control" name="estory${data.id}" placeholder="story" value="">${data.story}</textarea><br>
                                    <input type='text' class="form-control" name="eimg${data.id}" placeholder="img" value="${data.img}"><br>
                                    <a href="#" class="btn btn-info" onclick="editAjax(${data.id})">edit</a>
                                    <hr>
                                </div>
                            </div>
                            
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                  </div>  
                `)
            }
        });
    }

    function editAjax(id){
        let name    = $('input[name="ename'+id+'"]').val();
        let story   = $('textarea[name="estory'+id+'"]').val();
        let img     = $('input[name="eimg'+id+'"]').val();
        var editInfo = {
            name: name,
            story: story,
            img: img
        };
        console.log(id);
        $.ajax({
            url: 'http://localhost:3000/blog/'+id,
            method: 'PUT',
            data: editInfo,
            success: function(data) {
                location.reload();
            }
        });
    }

    function removeAjax(id){
        $.ajax({
            url: 'http://localhost:3000/blog/'+id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(data) {
            }
        });
        location.reload();
    }
