'use strict';


// ////////  LAMAJ HELPED fix function --- loop inside of a loop
// ////////  LAMAJ HELPED
// ////////  LAMAJ HELPED

////https://stackoverflow.com/questions/840781/easiest-way-to-find-duplicate-values-in-a-javascript-array
 let fix = (arr) => {
   // const pry = require('pryjs')
   //           eval(pry.it);

          const sortedArray = arr.sort();
           const noDups = sortedArray.filter((sentence, index) => {
            return sortedArray[index] !== sortedArray[index + 1];

           //    if (sortedArray[index] == sortedArray[index + 1]) {
           //        // dont do anything
           //        return false
           //    } else {
           //      return true;
           //    }

         });
           // console.log("++++++++++", noDups)
   //         // console.log("in fix function /////////// ", arr);
   //         //  var j = 1;
   //         //  for (var i = 0; i < arr.length; i++) {            ///////
   //         //        for (j; j < arr.length; j++) {                ///////
   //         //              if (arr[i] === arr[j]) {                          //////////
   //         //                  console.log("i am arr[i] "+arr[j] )
   //         //                  arr.splice(j, 1);               /////// // ////////  LAMAJ HELPED

   //         //              }

   //         //        }
   //         //        j = i + 2;
   //         //  }
            return noDups;
      };

// ////////  LAMAJ HELPED
// ////////  LAMAJ HELPED
// ////////  LAMAJ HELPED!!!



let Results = function(data) {
    this.data = data,
    this.title = data.title,
    this.website = data.url,
    this.keywords = data.keywords,
    this.entities = data.entities,
    this.relations = data.relations,
    this.sentences = [],
    this.subjectText = [],
    this.actionText = [],
    this.objectText = [],
    this.keywordsText = [],
    this.combinedText = [],
    this.combinedSentences = [],
    this.combineData = () => {
      //console.log("++++++++++++++=+++++++=", this.subjectText)
      this.subjectText.forEach((x, index) => {

       this.combinedText.push(
          this.subjectText[index] + " " +
          this.actionText[index] + " " +
          this.objectText[index]
      );


      this.combinedText = fix(this.combinedText);
      this.combinedSentences = fix(this.sentences)

      });
    },
    this.Mapping = () => {

      this.relations.forEach((rel) => {
              this.sentences.push(rel.sentence);
              this.subjectText.push(rel.subject.text);
              this.actionText.push(rel.action.text);

              if (rel.object) {
                console.log('has object')
                this.objectText.push(rel.object.text);
              }
                else {
                  console.log('!!!!!!nope')
              }

      });


    },
    this.keyPush = () => {
        this.keywords.forEach((key) => {

          if(key === undefined) {return false}
              this.keywordsText.push(key.text);

      });
    }


};






module.exports = Results;
