jQuery(document).ready(function($) {





});


let input = $("input[type=text]");
let button = $("button");




button.on("click", (e) => {
            e.preventDefualt;
            let data = {};
            data.text = input.val();

            send(data);

})




let send = (a) => {

      $.ajax({
            url:'/api',
            type: "POST",
            data: a,
            succes: (response) => {
                        console.log(response);
            },
            error: (err) => {
                  console.log(err)
            }
      })
}
