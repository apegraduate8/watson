// jQuery(document).ready(function($) {

//       const bod = $('body');
//       const container = $('.container');
//       const small = $('.small-container');
//       let input = $("input[type=text]");
//       let button = $("button");
//       let count = 0;
//       let crea = $('.create');
//       let summaryBox = $('.create > .summary');
//       let summaryBoxTitle = $('.create #briefTitle')
//       let summaryTitle = $('.summaryBox > #title');

//       button.on("click", (e) => {
//             e.preventDefualt;
//             let myString = input.val();
//             let data = {};
//             // data.text = myString;

//             if (myString.match(/\bhttps.*/) == undefined) { data.text = myString } else { data.url = myString }; ///https://www.w3schools.com/jsref/jsref_match.asp
//             //  \bhttps.*
//             //// regEX    means any string that begins with https followed by any character \b word boundery
//             send(data);

//       });

//       let scramble = (ray) => {
//             let min;
//             let max;
//             // debugger
//             if (ray.length > 15) { count = 10;
//                   min = Math.floor(ray.length / 2);
//                   max = ray.length - 5; }
//             if (ray.length > 30) { count = 20;
//                   min = Math.floor(ray.length / 2);
//                   max = ray.length - 5; }
//             for (var i = 0; i < count; i++) {
//                   let rand = Math.floor(Math.random() * (min - max)) + min;
//                   ray.splice(rand, 1);
//             }
//             console.log(ray)
//             return ray;
//       }


//       let send = (a) => {
//             $.ajax({
//                   url: '/api',
//                   type: "POST",
//                   data: a,
//                   success: (response) => {
//                         console.log(response);
//                         console.log(response.title)
//                               // debugger
//                               // console.log("i am in send function ", scramble(response.combinedText))
//                         grab(scramble(response.combinedText), response.title);
//                         // grab(response);

//                   },
//                   error: (err) => {
//                         console.log(err)
//                   }
//             })
//       }

//       const grab = (data, data2) => {
//             let myString = "";
//             let div = $('<div>');
//             let h = $('<h1 id="summary">');
//             let title = $('<h2 id="title">');
//             h.text('SUMMARY');
//             title.text(data2);
//             div.append(h);
//             div.append(title);

//             console.log("im in the grab func >>> ", data);
//             for (let i = 0; i < count; i++) {
//                   myString += data[i] + ", ";

//                   let h2 = $('<h1 class="hover">');
//                   h2.text(data[i]);
//                   add(h2, data2);
//                   div.append(h2);
//             };


//             small.append(div);
//       };



//       let add = (el, title) => {
//             el.on("click", (e) => {
//                   $(e.target).css("color", "#dd3131");
//                   let rice = $(e.target).text();
//                   let hNew = $('<p>').text(rice);
//                   summaryBoxTitle.text(title);
//                   summaryBox.append(hNew);
//             })
//       }

jQuery(document).ready(function($) {


      const w = window.innerWidth;
      const h = window.innerHeight;

      const bod = $('body');
      const container = $('.container');
      const small = $('.small-container');
      let input = $("input[type=text]");
      let button = $("button");
      let count = 0;
      let crea = $('.create');
      let briefTitle = crea.children()[1]
      let summaryBox = $('.create > .summary');
      let briefSave = $('.briefSave');
      let $save = $($('.briefSave').children()[1]);
      let summaryBoxTitle = $('.create #briefTitle')
      let summaryTitle = $('.summaryBox > #title');

      /////////////////////////////////////////

      crea.css("height", h + "px");

      ////////////////////// end of styles

      console.log(crea);
      $(button[1]).on("click", (e) => {
            e.preventDefualt;
            let myString = input.val();
            let data = {};
            // data.text = myString;

            if (myString.match(/\bhttps.*/) == undefined) { data.text = myString } else { data.url = myString }; ///https://www.w3schools.com/jsref/jsref_match.asp
            //  \bhttps.*
            //// regEX    means any string that begins with https followed by any character \b word boundery

            send(data);

      });


      let scramble = (ray) => {
            let min;
            let max;
            // debugger

            let mini = () => {
                  for (var i = 0; i < count; i++) {
                        let rand = Math.floor(Math.random() * (min - max)) + min;
                        ray.splice(rand, 1);
                  };
            }



            if (ray.length > 15) {
                  count = 10;
                  min = Math.floor(ray.length / 2);
                  max = ray.length - 5;
                  mini();
                  return ray;
            };

            if (ray.length > 30) {
                  count = 20;
                  min = Math.floor(ray.length / 2);
                  max = ray.length - 5;
                  mini();
                  return ray;
            };

            count = ray.length;
            // console.log(ray)
            return ray;
      };


      let send = (a) => {
            console.log(a)
            $.ajax({
                  url: '/api',
                  type: "POST",
                  data: a,
                  success: (response) => {
                        console.log(response);
                        console.log(response.title)
                              // debugger
                              // console.log("i am in send function ", scramble(response.combinedText))
                        grab(scramble(response.combinedText), response.title);
                        console.log("i am in the keyowrds>>> in scramble function  > ", scramble(response.keywords))

                  },
                  error: (err) => {
                        console.log(err)
                  }
            })
      };

      const grab = (data, data2) => {
            let myString = "";
            let div = $('<div>');
            let h = $('<h1 id="summary">');
            let title = $('<h2 id="title">');
            h.text('SUMMARY');
            title.text(data2);
            div.append(h);
            div.append(title);

            console.log("im in the grab func >>> ", data);
            for (let i = 0; i < count; i++) {
                  myString += data[i] + ", ";

                  let h2 = $('<h1 class="hover">');
                  h2.text(data[i]);
                  console.log(h2);
                  add(h2, data2);
                  div.append(h2);
            };


            small.append(div);
      };

      let add = (el, title) => {
            el.on("click", (e) => {
                  console.log(e);
                  $(e.target).css("color", "#dd3131");
                  let rice = $(e.target).text();
                  let hNew = $('<p>').text(rice);
                  summaryBoxTitle.text(title);
                  summaryBox.append(hNew);
            })
      };

      ///////////////////////////

      $save.on("click", () => {
            let myBookmark = {
                  title: briefTitle.innerText,
                  summary: briefData()
            };


            // myBookmark.title = briefTitle.innerText;
            // myBookmark.summary = briefData();
            // console.log(theBookmarkedData);
            $.ajax({
                  url: '/bookmark/',
                  type: "POST",
                  data: myBookmark,
                  success: (response) => {
                        console.log("success")

                  },
                  error: (err) => {
                        console.log(err)
                  }
            })

            console.log(myBookmark);
      });

      const briefData = function() {

            let mySavedData = [];

            console.log("summarybox in briefData funtion >>>", summaryBox.children())

            summaryBox.children().each((index, child) => {
                  console.log($(child));
                  if ($(child).text() !== "") { mySavedData.push($(child).text()); }

            });

            console.log(mySavedData);
            return mySavedData;
      };

      ///////////////////// save button end

});








//////////////////////////////////







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
