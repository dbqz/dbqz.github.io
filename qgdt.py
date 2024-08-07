# -*- coding: utf-8 -*-
import base64
import binascii
import requests
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad

key = b'jnsbwxxcx@20211110hJnLEncD0TgzZX'

def aes_ecb_encrypt(key, text):
    cipher = AES.new(key, AES.MODE_ECB)
    padded_plaintext = pad(text.encode('utf-8'), AES.block_size)
    ciphertext = cipher.encrypt(padded_plaintext)
    return ciphertext.hex().upper()

def aes_ecb_decrypt(key, text):
    cipher = AES.new(key, AES.MODE_ECB)
    ciphertext = bytes.fromhex(text)
    padded_plaintext = cipher.decrypt(ciphertext)
    plaintext = unpad(padded_plaintext, AES.block_size).decode('utf-8')
    return plaintext


def get_photo(name, idcard):
    key = b'jnsbwxxcx@20211110hJnLEncD0TgzZX'
    text = "{\"xm\":\"" + name + "\",\"sfzhm\":\"" + idcard + "\"}"

    url = "https://xcx.jnsi.cxql.net/sbwxxcx/asd/sco/getPhotoNoSbCard"
    payload = {
        'paramsAes': str(aes_ecb_encrypt(key, text))
    }
    headers = {
        'Content-Type':"application/x-www-form-urlencoded; charset=UTF-8",
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/11212 MicroMessenger/8.0.44(0x18002c10) NetType/WIFI Language/zh_CN'
    }
    try:
        response = requests.post(url, headers=headers, data=payload)
        response = response.json()
        # print(response)
        aes_data = response['data']
        print(aes_data)
        photo = aes_ecb_decrypt(key, aes_data)
        with open(f'dt/{name}_{idcard}.png', 'wb') as f:
            f.write(base64.b64decode(photo))
            print(f"{name}_{idcard}.png 文件已保存在当前目录下...")
            return True
    except Exception as e:
        print(e)

import re
def main():
    with open(r"./id_nums.txt", "r", encoding="utf8") as fr:
        for line in fr:
            grp = re.split(r"\s+", line)
            if len(grp) >= 2:
                name = grp[0].strip()
                idcard = grp[1].strip()
                get_photo(name, idcard)

if __name__ == '__main__':
    import os
    if not os.path.exists("./dt"):
        os.mkdir("./dt")
    get_photo(input("请输入姓名:"), input("请输入身份证号码:"))
    # main()李和平_433122196605193516