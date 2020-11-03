const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { IVEncryptKey: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt({IVEncryptKey, encryptedData}) {
  let ivKey = Buffer.from(IVEncryptKey, 'hex');
  let encryptedText = Buffer.from(encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), ivKey);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

function descryptAsync({iv, encryptedData}) {
  return new Promise((resolve, reject) => {
    try {
      resolve(decrypt({iv, encryptedData}))
    } catch (error) {
      if(error.code === "ERR_INVALID_ARG_TYPE") reject({
        errorSource: 'Ecrypter',
        errorMessage:"description IV key is invalid"
      })
    }
  })
}

module.exports = { encrypt, decrypt, descryptAsync }