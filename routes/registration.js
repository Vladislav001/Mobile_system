var firebase = require('firebase');
var configFirebase = require('../config/configFirebase');
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

exports.post = function(req, res, next) {
  // Получаем данные, которые передал посетитель
  var email = req.body.email; // P.S req.body - нестандартное св-во, но в app.js есть middleware bodyParser(аналог)
  var password = req.body.password; // т.к он подключен до роута, то к моменту работы роута, bodyParser гарантированно прочитал все post данные

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      console.log('The password is too weak.');
      return next(new HttpError(403, error.message)); //403 - отказ регистрации
    } else {
      console.log(errorMessage + "errorMessage");
      return next(new HttpError(403, error.message)); //403 - отказ регистрации
    }
    console.log(error + "error");
    // [END_EXCLUDE]
  });

  var unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;

      var ref = firebase.app().database().ref();
      var usersRef = ref.child('administrations/' + userId);
      // Create a new ref and log it’s push key
      //var userRef = usersRef.push();

      // Create a new ref and save data to it in one step
      var userRef = usersRef.set({
        email: email,
        password: password
      });


      // Формируем узлы с номерами тестов и соответствующими под-узлами
      var refNewTest = ref.child("test");
      var refNewTestSettings = refNewTest.child("/settings"); //
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



      unsubscribe(); // убирает состояние
    }
  });


}



exports.get = function(req, res) {

  res.render('registration');
};
