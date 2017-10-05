// Модуль добавление нового студента
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;
var firebase = require('firebase');


exports.post = function(req, res, next) {
  // Получаем данные, которые передал посетитель
    var login = req.body.loginNewUser + "@gmail.com";
    var password = req.body.passwordNewUser;
    var name = req.body.usernameNewUser;// P.S req.body - нестандартное св-во, но в app.js есть middleware bodyParser(аналог)
    var age = req.body.ageNewUser;                                      // т.к он подключен до роута, то к моменту работы роута, bodyParser гарантированно прочитал все post данные
    var gender = req.body.genderNewUser;

    var trainer_ID = firebase.auth().currentUser.uid;

    var loginFirst;

    // Проверим имеется ли такой логин в БД
    var refStudents = firebase.database().ref("students");
    refStudents.orderByChild("login").equalTo(login).limitToFirst(1).on("child_added", function(snapshot) {
    loginFirst = snapshot.child("login").val();
    });

      if (login != loginFirst) {
  //Генерируем уникальный ключ
  var userIdStudents =  firebase.app().database().ref().push().getKey();

  var ref = firebase.app().database().ref();
  var usersRef = ref.child('students/' + userIdStudents);
  var userRef = usersRef.set({
  login: login,
  password: password,
  name: name,
  age: age,
  gender: gender,
  trainer_ID: trainer_ID,
  current_test: "1",
  current_result_web: "1"
  });

  var studentState = usersRef.child("/student_state");
  var studentState = studentState.set({
   state: "inactive",
   current_question: "0",
   current_result: "1"
  });

  //Узнаем кол-во тестов у студента
  // var refStudents = firebase.database().ref("students/" + userIdStudents + "/tests");
  // var countTests = 1; // Кол-во тестов
  // refStudents.orderByChild("tests").on("child_added", function(snapshot) {
  //  var student = snapshot.val();
  //  countTests++;
  // });

  // Формируем узлы с номерами тестов и соответствующими под-узлами
  var refNewTest = usersRef.child("tests/1");
  var refNewTestSettings = refNewTest.child("/settings"); //
  var refNewTestPreTest = refNewTest.child("/pre_test");
  var refNewTestManageButtons = refNewTest.child("/manage_buttons");//
  var refNewTestCategories = refNewTest.child("/categories");//
  //Для заполнения-посмотреть как выглядит в databaseьщ
  var refNewTestSettings = refNewTestSettings.set({
   text: "true",
   sound: "true",
   swap: "true",
   swap_finger: "true",
   swap_arrows: "true",
   progress_bar: "true",
   btn_results: "true"
  });

  var refNewTestPreTest = refNewTestPreTest.set({
    title_text_btn_stop: "Button stop test",
    description_text_btn_stop: "If you want to stop the test",
    title_text_btn_back: "Button back",
    description_text_btn_back: "If you want to return to the previous question",
    title_text_btn_next: "Button next",
    description_text_btn_next: "If you want to go to the text question",
    title_text_btn_like: "Button like",
    description_text_btn_like: "If you like to click here",
    title_text_btn_dislike: "Button dislike",
    description_text_btn_dislike: "If you don't like to click here"

  });


   var refNewTestManageButtons = refNewTestManageButtons.set({
    style_images_swap_arrows: "0",
    style_images_like_dislike: "0",
    style_image_stop_test: "0",
    style_image_results: "0",
    style_image_finish: "0",
   });


// Переделать бы в json
  var refNewTestCategories = refNewTestCategories.set({

    "0": {
      name: "Semi-industrieel werk",
      questions: {
      "0": {
        title: "Producten sorteren"
      },
      "1": {
        title: "Batterijen inpakken"
      },
      "2": {
        title: "Zakjes dichtsealen"
      },
      "3": {
        title: "Dozen vouwen"
      },
      "4": {
        title: "Stickers kleven"
      }
    }
  },
  "1": {
    name: "Huishoudelijk werk",
    questions: {
    "0": {
      title: "Ramen zemen"
    },
    "1": {
      title: "Was plooien"
    },
    "2": {
      title: "Dweilen"
    },
    "3": {
      title: "Tafels afruimen"
    },
    "4": {
      title: "Stofzuigen"
    }
  }
},
"2": {
  name: "Voedselbereidend werk",
  questions: {
  "0": {
    title: "Brooddeeg kneden"
  },
  "1": {
    title: "Koekjes maken"
  },
  "2": {
    title: "Soep koken"
  },
  "3": {
    title: "Koffie zetten"
  },
  "4": {
    title: "Aardappelen schill"
  }
 }
},
"3": {
  name: "Administratief werk",
  questions: {
  "0": {
    title: "Plastificeren"
  },
  "1": {
    title: "Met een computer werken"
  },
  "2": {
    title: "Met een rekenmachine werken"
  },
  "3": {
    title: "KopiГѓВ«ren"
  },
  "4": {
    title: "Documenten versnipperen"
  }
 }
},
"4": {
  name: "Dienstverlenend werk",
  questions: {
  "0": {
    title: "Helpen bij het laden en lossen"
  },
  "1": {
    title: "Post rondbrengen"
  },
  "2": {
    title: "Oud papier ophalen"
  },
  "3": {
    title: "Vuilniscontainers schoonmaken"
  },
  "4": {
    title: "Lege flessen sorteren"
  }
 }
},
"5": {
  name: "Textiele werkvormen",
  questions: {
  "0": {
    title: "Tafelkleed borduren"
  },
  "1": {
    title: "Haken"
  },
  "2": {
    title: "Smyrna"
  },
  "3": {
    title: "Macrame"
  },
  "4": {
    title: "Naaien"
  }
 }
},
"6": {
  name: "Dierenverzorging",
  questions: {
  "0": {
    title: "Dieren voederen"
  },
  "1": {
    title: "Eieren rapen"
  },
  "2": {
    title: "Dieren water geven"
  },
  "3": {
    title: "Dieren borstelen"
  },
  "4": {
    title: "Dieren op stal zetten"
  }
 }
},
"7": {
  name: "Tuinieren",
  questions: {
  "0": {
    title: "Planten en bloemen kweken"
  },
  "1": {
    title: "Tomaten plukken"
  },
  "2": {
    title: "Onkruid wieden",
  },
  "3": {
    title: "Gras maaien"
  },
  "4": {
    title: "Bladeren harken"
  }
 }
},
"8": {
  name: "Creatief werk",
  questions: {
  "0": {
    title: "Boetseren"
  },
  "1": {
    title: "Tekenen en schilderen"
  },
  "2": {
    title: "Parels rijgen"
  },
  "3": {
    title: "Beeldhouwen"
  },
  "4": {
    title: "Zijde schilderen"
  }
 }
},
"9": {
  name: "Zorg & Welzijn",
  questions: {
  "0": {
    title: "Wandelen met een rolstoelgebruiker"
  },
  "1": {
    title: "Mensen verzorgen"
  },
  "2": {
    title: "Peuters verschonen",
  },
  "3": {
    title: "Verhaaltjes voorlezen"
  },
  "4": {
    title: "Mensen helpen aankleden"
  }
 }
},
"10": {
  name: "Ambachtelijk werk",
  questions: {
  "0": {
    title: "Kaarsen gieten"
  },
  "1": {
    title: "Potten bakken"
  },
  "2": {
    title: "Hout bewerken"
  },
  "3": {
    title: "Betonbeelden maken"
  },
  "4": {
    title: "Papier scheppen"
  }
 }
},
"11": {
  name: "Klantgericht werk",
  questions: {
  "0": {
    title: "Bestellingen afleveren",
  },
  "1": {
    title: "In een winkel werken"
  },
  "2": {
    title: "Informatie geven",
  },
  "3": {
    title: "Telefoneren"
  },
  "4": {
    title: "Geld afrekenen"
  }
 }
}

    });



var refNewTest2 = usersRef.child("tests/2");
var refNewTestSettings2 = refNewTest2.child("/settings"); //
var refNewTestPreTest2 = refNewTest2.child("/pre_test");
var refNewTestManageButtons2 = refNewTest2.child("/manage_buttons");//
var refNewTestCategories2 = refNewTest2.child("/categories");//

var refNewTestSettings2 = refNewTestSettings2.set({
 text: "false",
 sound: "false",
 swap: "false",
 swap_finger: "false",
 swap_arrows: "false",
 progress_bar: "false",
 btn_results: "false"
});

var refNewTestPreTest2 = refNewTestPreTest2.set({
  title_text_btn_stop: "Button stop test",
  description_text_btn_stop: "If you want to stop the test",
  title_text_btn_back: "Button back",
  description_text_btn_back: "If you want to return to the previous question",
  title_text_btn_next: "Button next",
  description_text_btn_next: "If you want to go to the text question",
  title_text_btn_like: "Button like",
  description_text_btn_like: "If you like to click here",
  title_text_btn_dislike: "Button dislike",
  description_text_btn_dislike: "If you don't like to click here"

});


 var refNewTestManageButtons2 = refNewTestManageButtons2.set({
  style_images_swap_arrows: "0",
  style_images_like_dislike: "0",
  style_image_stop_test: "0",
  style_image_results: "0",
  style_image_finish: "0",
 });

var refNewTestCategories2 = refNewTestCategories2.set({
  "0": {
    name: "CATEGORY 1",
    questions: {
    "0": {
      title: "CATEGORY 1 question 1"
    },
    "1": {
      title: "CATEGORY 1 question 2"
    },
    "2": {
      title: "CATEGORY 1 question 3"
    },
    "3": {
      title: "CATEGORY 1 question 4"
    },
    "4": {
      title: "CATEGORY 1 question 5"
    }
   }
  },
  "1": {
    name: "CATEGORY 2",
    questions: {
    "0": {
      title: "CATEGORY 2 question 1",
    },
    "1": {
      title: "CATEGORY 2 question 2"
    },
    "2": {
      title: "CATEGORY 2 question 3",
    },
    "3": {
      title: "CATEGORY 3 question 4"
    },
    "4": {
      title: "CATEGORY 4 question 5"
    }
   }
  }
});

  //получить тренера
  //и нарастить у него поле counte
  var refTrainer = firebase.database().ref("trainers/" + trainer_ID);

  refTrainer.once("value")
    .then(function(snapshot) {
         var count_students = snapshot.child("count_students").val();
         var newCountStudents = count_students + 1;
         firebase.database().ref("trainers/" + trainer_ID).update({
         count_students: newCountStudents
        });
  });
// Без этого не обновляет страницу
res.redirect("/personalArea");
} else {
    return next(new HttpError(403, "This login already exists")); //403 - отказ регистрации
  }
};
