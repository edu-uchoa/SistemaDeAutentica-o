

// Caesar Cipher Encryption 
// This technique involves shifting the letters of the 
// alphabet by a fixed number of places. 
// For example, with a shift of three,the letter 'A' 
// becomes 'D', 'B' becomes 'E', and so on


// text --> original message to encrypt
// shift --> how many character positions to shift each character
function encrypt(text, shift) {
    let encrypted = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i); 
    //   charCodeAt(i) gets the Unicode number 
    //   of the character at position i in the string.
    //   For example, 'A' → 65.
      encrypted += String.fromCharCode(charCode + parseInt(shift));
    //   This line shifts the character by the shift
    //   amount and converts it back to a character 
    //   using String.fromCharCode().
    //   The result is added to the encrypted string.

    }
    return encrypted;
  }
  
  // Decrypt function
  function decrypt(text, shift) {
    let decrypted = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      decrypted += String.fromCharCode(charCode - parseInt(shift));
    //   Shift the character backward by the same amount
    //   and add it to the dcrypted string.
    }
    return decrypted;
  }

  function encryptText() {
    const text = document.getElementById("inputTextEncrypt").value;
    const shift = document.getElementById("shiftEncrypt").value;
    const encrypted = encrypt(text, shift);
    document.getElementById("outputTextEncrypt").textContent = encrypted;
  }

  function decryptText() {
    const text = document.getElementById("inputTextDecrypt").value;
    const shift = document.getElementById("shiftDecrypt").value;
    const decrypted = decrypt(text, shift);
    document.getElementById("outputTextDecrypt").textContent = decrypted;
  }