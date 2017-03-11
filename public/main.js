jQuery(document).ready(function($) {


      const bod = $('body');
      const container = $('.container');
      const small = $('.small-container');
      let input = $("input[type=text]");
      let button = $("button");
      let count = 0;
      let crea = $('.create');
      let summaryBox = $('.create > .summary');




      button.on("click", (e) => {
            e.preventDefualt;
            let data = {};
            data.text = input.val();

            send(data);

      });


      let scramble = (ray) => {
            if (ray.length > 15) { count = 8 }
            if (ray.length > 30) { count = 15 }
              let min = Math.floor(ray.length/2);
              let max = ray.length - 5;
            for (var i = 0; i < count; i++) {

                  let rand = Math.floor(Math.random() * (min - max)) + min;
                  ray.splice(rand, 1);
            }
            return ray;
      }


      let send = (a) => {
            $.ajax({
                  url: '/api',
                  type: "POST",
                  data: a,
                  success: (response) => {
                        console.log(response);
                        // debugger
                        grab(scramble(response))
                        // grab(response);

                  },
                  error: (err) => {
                        console.log(err)
                  }
            })
      }

      const grab = (data) => {
            let myString = "";
            let div = $('<div>');
            let h = $('<h1 id="summary">');
            h.text('SUMMARY');
            div.append(h)

            for (let i = 0; i < count; i++) {
                  myString += data[i] + ", ";

                  let h2 = $('<h1>');
                  h2.text(data[i]);
                  add(h2);
                  div.append(h2);
            };


            small.append(div);
      };



      let add = (el) => {
        el.on("click", (e) => {
          $(e.target).css("color", "red");
          let rice = $(e.target).text();
          let hNew = $('<p>').text(rice)
          summaryBox.append(hNew);
        })
      }

      // /////// LAMAJ!!! HELPED
      //       let myArray = ["conducted by the National Research Council",
      //             "conducted by the National Research Council",
      //             "will be conducted",
      //             "The next Decadal Survey in Astronomy and Astrophysics",
      //             "will be conducted", "The next Decadal", "will be conducted", "will be conducted"
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


      // // ////////  LAMAJ HELPED


});
