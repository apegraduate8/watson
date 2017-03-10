let input = document.querySelector("input[type=text]");
let button = document.querySelector("button")

button.addEventListener("click", (e) => {
            e.preventDefualt;
            let data = input.getAttribute("value");
            sendBack(data);
})




let sendBack = (a) => {
      let params = {};
      params.text = a;

      alchemy.sentiment(params, (err, response) => {
            if (err)
                  console.log("this is the error " + err)
            else
                  let back = JSON.stringify(response, null, 2);
                  console.log(back, "this is the resonse");
                  return back;
      })

}
