const MORSE_TABLE = {
  ".-": "a",
  "-...": "b",
  "-.-.": "c",
  "-..": "d",
  ".": "e",
  "..-.": "f",
  "--.": "g",
  "....": "h",
  "..": "i",
  ".---": "j",
  "-.-": "k",
  ".-..": "l",
  "--": "m",
  "-.": "n",
  "---": "o",
  ".--.": "p",
  "--.-": "q",
  ".-.": "r",
  "...": "s",
  "-": "t",
  "..-": "u",
  "...-": "v",
  ".--": "w",
  "-..-": "x",
  "-.--": "y",
  "--..": "z",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "-----": "0",
};

function decode(expr) {
  function separateByTenZeroOff() {
    //разбиваем входную строку по 10 символов
    arrOfLetters = [];
    for (i = 0; i < expr.length; i = i + 10) {
      arrOfLetters.push(expr.slice(i, i + 10));
    }
    return arrOfLetters;
  }

  function deleteZero() {
    //удаляем нули
    const array = separateByTenZeroOff();
    newA = [];
    array.forEach((elem) => {
      value = elem.indexOf(1); //проверяем первое вхождение единицы, до нее все нули нам не нужны
      newA.push(elem.slice(value));
    });
    return newA;
  }

  function replace() {
    //меняем пары 11 и 10 на точки и тире, звездочки оставляем как есть
    const array = deleteZero();
    //console.log(array);
    newR = [];
    array.forEach((elem) => {
      newStr = ""; // обнуляем строку после  прохода каждого элемента массива forEach-ом
      if (elem === "*") {
        newR.push("*"); // пушим звездочку в массив
      } else {
        for (i = 0; i < elem.length; i += 2) {
          if (elem[i] === "1" && elem[i + 1] === "1") {
            newStr = newStr + "-"; // собираем в строку тире
          } else if (elem[i] === "1" && elem[i + 1] === "0") {
            newStr = newStr + "."; // собираем в строку точки
          }
        }
        newR.push(newStr); // пушим в массив собранную с каждого эл-та строку, как новый эл-т массива
      }
    });
    return newR;
  }

  function myDecode() {
    // декодируем полученные буквы морзе в нормальные буквы, а * в пробелы
    const array = replace();
    let str = "";
    let keys = Object.keys(MORSE_TABLE);
    let values = Object.values(MORSE_TABLE);
    array.forEach((elem) => {
      if (elem === "*") {
        str = str + " ";
      } else {
        for (let i = 0; i < keys.length; i++) {
          if (elem === keys[i]) {
            str = str + values[i];
          }
        }
      }
    });
    console.log(str);
    return str;
  }
  return myDecode();
}

module.exports = {
  decode,
};
