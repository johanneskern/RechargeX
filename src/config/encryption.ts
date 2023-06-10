import { JSEncrypt } from "jsencrypt";

export const encryptionPublicKey = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCb7eZ8H97PnUS71+v/0Tipct/B
SaWnOyF7JhnZYaNNv7vWq0ALMF721ery3RL8j4SCFwvMtmiDzvfhPNirMw5ZtTj0
j/hLSkdCpY1u/Imi+OKYRsWDT1n8lizmKeOj3Iympe3yYaNRuQy/zgSmYckReX74
gVONNW8pyLnFQW8TfQIDAQAB
-----END PUBLIC KEY-----`;

export const encryptData = (data: string): Uint8Array => {
    const encrypt = new JSEncrypt();

    // Assign our encryptor to utilize the public key.
    encrypt.setPublicKey(encryptionPublicKey);

    const encryptedData = encrypt.encrypt(data)
    if (!encryptedData) {
        throw "failed to encrypt"
    }

    return base64ToArrayBuffer(encryptedData)
}

function base64ToArrayBuffer(base64: string) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}