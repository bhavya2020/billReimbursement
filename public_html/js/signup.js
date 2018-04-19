function postData(){
    let obj={
      name: $("#name").val(),
      ceo: $("#ceo").val(),
      address: $("#address").val(),
      email: $("#email").val(),
      contactNo: $("#contactNo").val(),
      gstNo: $("#gstNo").val(),
      registrationNo: $("#registrationNo").val(),
      username: $("#username").val(),
      password: $("#password").val()
    };
    $.post("/signup",obj,function(data){
      console.log(data);
      if(data === "already registered"){
        var instance = M.Modal.init($("#modal1")[0]);
        instance.open();

      }
      else if(data === "done"){
        // user registered
        window.location="/company/";
      }
  })
}
