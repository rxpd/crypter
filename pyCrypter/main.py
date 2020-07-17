from random import choice, randrange

letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"  # 26
symbols = "!?&$#%@<>_*=+-^:;[]{}()~"  # 24
numbers = "0123456789"  # 10


def generate_password(length, spec_char=25, number=15):
    generated_password = ""
    for x in range(length):
        if get_chance(spec_char):
            generated_password += choice(symbols)
        elif get_chance(number):
            generated_password += choice(numbers)
        else:
            generated_password += get_letter()
    return generated_password


def get_letter():
    char = choice(letters)
    if get_chance(50):
        return char.upper()
    else:
        return char


def get_chance(chance):
    rand = randrange(0, 100)
    if rand <= chance:
        return True
    else:
        return False


all_chars = letters + symbols + numbers
# print(all_chars)


def encrypt(text, key):
    result = []
    for index, ch in enumerate(text):
        mj = all_chars.index(ch)
        kj = all_chars.index(key[index % len(key)])
        cj = (mj + kj) % len(all_chars)
        result.append(all_chars[cj])
    # r = ''.join(result)
    # print(f'{text} by {key} = {r}')
    return ''.join(result)


def decrypt(text, key):
    # print(len(all_chars))
    result = []
    for index, ch in enumerate(text):
        cj = all_chars.index(ch)
        kj = all_chars.index(key[index % len(key)])
        mj = (cj - kj) % len(all_chars)
        result.append(all_chars[mj])
    # r = ''.join(result)
    # print(f'{text} by {key} = {r}')
    return ''.join(result)


def generate_password_menu():
    length = int(input("Chose length: "))
    symbols_count = int(input("Chose symbols probability: "))
    numbers_count = int(input("Chose numbers probability: "))
    return generate_password(length, spec_char=symbols_count, number=numbers_count)


def menu():
    menu_dict = {1: "encrypt", 2: "decrypt", 3: "create password"}
    key = None
    generated_password = None
    encrypted_word = None
    decrypted_word = None

    print("Options list:")
    for k, v in menu_dict.items():
        print(k, " - ", v)
    option = int(input("Chose option: "))
    if 0 < option < 4:
        if option == 1:
            key = input("Input key ")
            print(f"Your key - {key}")
            generated_password = input("Input password ")
            encrypted_word = encrypt(generated_password, key)

            print(f"Your password - {generated_password}")
            print(f"Your encrypted password - {encrypted_word}")
        elif option == 2:
            key = input("Input key ")
            print(f"Your key - {key}")
            word_to_decrypt = input(f"Enter word to decrypt ")
            decrypted_word = decrypt(word_to_decrypt, key)
            print(f"Your password - {decrypted_word}")
        elif option == 3:
            generated_password = generate_password_menu()
            print(f"Your password - {generated_password}")


if __name__ == "__main__":
    print(encrypt("sdafdsafb5$#@@", "fdsafdvc"))
    while True:
        menu()
