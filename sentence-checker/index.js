'use strict';


// ////////  LAMAJ HELPED fix function --- loop inside of a loop
// ////////  LAMAJ HELPED
// ////////  LAMAJ HELPED
 let fix = (arr) => {
            debugger
            var j = 1;
            for (var i = 0; i < arr.length; i++) {            ///////
                  for (j; j < arr.length; j++) {                ///////
                        if (arr[i] === arr[j]) {                          //////////

                            arr.splice(j, 1);               /////// // ////////  LAMAJ HELPED

                        }

                  }
                  j = i + 2;
            }

      };

// ////////  LAMAJ HELPED
// ////////  LAMAJ HELPED
// ////////  LAMAJ HELPED!!!

let shape = {}

let Results = function(data) {
    this.data = data,
    this.keywords = this.data.keywords,
    this.entities = data.entities,
    this.relations = data.relations,
    this.sentences = [],
    this.subjectText = [],
    this.actionText = [],
    this.objectText = [],
    this.Mapping = () => {
      this.relations.map((rel) => {
              this.sentences.push(rel.sentence);
              this.subjectText.push(rel.subject.text);
              this.actionText.push(rel.action.text);
              this.objectText.push(rel.object.text);

      })
      fix(this.sentences);
      fix(this.subjectText);
      fix(this.actionText);
      fix(this.objectText);
    }


};






module.exports = Results;
