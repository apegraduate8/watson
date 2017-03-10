jQuery(document).ready(function($) {


      const bod = $('body');
      let input = $("input[type=text]");
      let button = $("button");




      button.on("click", (e) => {
            e.preventDefualt;
            let data = {};
            data.text = input.val();

            send(data);

      });




      let send = (a) => {
            $.ajax({
                  url: '/api',
                  type: "POST",
                  data: a,
                  success: (response) => {
                        console.log(response);
                        grab(response);

                  },
                  error: (err) => {
                        console.log(err)
                  }
            })
      }

      const grab = (data) => {
            let myString = "";
            let div = $('<div>');
            let h = $('<h1>');
            h.text('keywords');
            div.append(h)

            for (let i = 0; i < data.length; i++) {
                  myString += data[i].text + ", ";

                  let h2 = $('<h1>');
                  h2.text(data[i].text);
                  div.append(h2);
            };




            bod.append(div);
      };

// /////// LAMAJ!!! HELPED
//       let myArray = ["conducted by the National Research Council",
//             "conducted by the National Research Council",
//             "will be conducted",
//             "The next Decadal Survey in Astronomy and Astrophysics",
//             "will be conducted", "The next Decadal", "will be conducted"
//       ]; ///7

//       let fun = (arr) => {
//             // debugger
//             var j = 1;
//             for (var i = 0; i < myArray.length; i++) {
//                   for (j; j < myArray.length; j++) {
//                         if (arr[i] === arr[j]) {

//                               myArray.splice(j, 1);

//                         }

//                   }
//                   j = i + 2;
//             }
//       console.log(arr);
//       };


//       fun(myArray)
//       console.log(myArray)


// ////////  LAMAJ HELPED


});
