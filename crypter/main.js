window.addEventListener("load", function (event) {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const symbols = "!?&$#%@<>_*=+-^:;[]{}()~";
  const numbers = "0123456789";
  var all_chars = letters + symbols + numbers;
  const minKeyLength = 8;
  var app = new Vue({
    el: "#app",
    data: {
      lastEncryptLenght: 0,
      key: "",
      letters: "",
      symbols: "",
      numbers: "",
      passwordToEncrypt: null,
      passwordToEncryptError: false,
      passwordToDecrypt: null,
      passwordToDecryptError: null,
      haveKey: false,
      encryptedPassword: null,
      decryptedPassword: null,
      keyInput: null,
      refreshKeyInput: null,
      refreshInputError: false,
      passwordGeneratorVisability: "hidden",
    },
    methods: {
      setKey() {
        if (this.refreshKeyInput != null) {
          if (
            this.refreshKeyInput.length < 8 ||
            this.checkStrings(this.refreshKeyInput) !== null
          ) {
            this.refreshInputError = true;
          } else {
            this.keyInput = this.refreshKeyInput;
            this.key = this.refreshKeyInput;
            this.haveKey = true;
            this.refreshKeyInput = null;
            this.encrypt();
            this.decrypt();
          }
        }
      },
      encrypt() {
        if (this.passwordToEncrypt != null) {
          if (this.checkStrings(this.passwordToEncrypt) !== null) {
            this.passwordToEncryptError = true;
            return;
          } else if (this.checkStrings(this.passwordToEncrypt) === null) {
            this.passwordToEncryptError = false;
          }
          result = "";
          if (
            this.key != "" &&
            this.passwordToEncrypt.length >= 8 &&
            this.passwordToEncrypt.length <= 20
          ) {
            for (var i = 0; i < this.passwordToEncrypt.length; i++) {
              result += all_chars.charAt(
                (all_chars.indexOf(this.passwordToEncrypt.charAt(i)) +
                  all_chars.indexOf(this.key.charAt(i % this.key.length))) %
                  all_chars.length
              );
            }
            this.encryptedPassword = result;
          } else if (
            this.passwordToEncrypt !== null &&
            this.passwordToEncrypt.length < 8
          ) {
            this.encryptedPassword = null;
          }
        }
      },
      decrypt() {
        if (this.passwordToDecrypt != null) {
          if (this.checkStrings(this.passwordToDecrypt) !== null) {
            this.passwordToDecryptError = true;
            return;
          } else if (this.checkStrings(this.passwordToDecrypt) === null) {
            this.passwordToDecryptError = false;
          }
          result = "";

          if (
            this.key != "" &&
            this.passwordToDecrypt.length >= 8 &&
            this.passwordToDecrypt.length <= 20
          ) {
            for (var i = 0; i < this.passwordToDecrypt.length; i++) {
              result += all_chars.charAt(
                (all_chars.indexOf(this.passwordToDecrypt.charAt(i)) +
                  all_chars.length -
                  all_chars.indexOf(this.key.charAt(i % this.key.length))) %
                  all_chars.length
              );
            }

            this.decryptedPassword = result;
          } else if (
            this.passwordToDecrypt !== null &&
            this.passwordToDecrypt.length < 8
          ) {
            this.decryptedPassword = null;
          }
        }
      },
      refreshKeyChange() {
        if (
          this.refreshKeyInput.length >= minKeyLength &&
          this.checkStrings(this.refreshKeyInput) === null
        ) {
          this.refreshInputError = false;
          this.encrypt();
          this.decrypt();
        }
      },
      checkStrings(string) {
        result = "";
        for (var i = 0; i < string.length; i++) {
          for (var l = 0; l < letters.length; l++) {
            if (string.charAt(i) == letters.charAt(l)) {
              result += string.charAt(i);
            }
          }
          for (var l = 0; l < numbers.length; l++) {
            if (string.charAt(i) == numbers.charAt(l)) {
              result += string.charAt(i);
            }
          }
          for (var l = 0; l < symbols.length; l++) {
            if (string.charAt(i) == symbols.charAt(l)) {
              result += string.charAt(i);
            }
          }
        }
        if (result.length === string.length) {
          return null;
        } else {
          return "error";
        }
      },
    },
    beforeMount() {
      this.letters = letters;
      this.symbols = symbols;
      this.numbers = numbers;
      // this.decrypt();
    },
  });
});

// const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
// const symbols = "!?&$#%@<>_*=+-^:;[]{}()~";
// const numbers = "0123456789";
// var all_chars = letters + symbols + numbers;

// function encrypt(word, key) {
//   var result = "";
//   for (var i = 0; i < word.length; i++) {
//     result += all_chars.charAt(
//       (all_chars.indexOf(word.charAt(i)) +
//         all_chars.indexOf(key.charAt(i % key.length))) %
//         all_chars.length
//     );
//   }
//   console.log(`${word} by ${key} = ${result}`);
//   return result;
// }

// function decrypt(word, key) {
//   var result = "";
//   for (var i = 0; i < word.length; i++) {
//     result += all_chars.charAt(
//       (all_chars.indexOf(word.charAt(i)) +
//         all_chars.length -
//         all_chars.indexOf(key.charAt(i % key.length))) %
//         all_chars.length
//     );
//   }
//   console.log(`${word} by ${key} = ${result}`);
//   return result;
// }
