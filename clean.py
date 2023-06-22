def clean():
    words = []
    with open('webscrap.txt') as f:
        lines = f.readlines()
        # for i in lines:
    for l in lines:
        tmp = l.strip()
        words.append(tmp.split(' ')[-1].lower())
    words.sort()
    for w in words:
        with open('new_possible_words.txt', 'a') as f:
            f.write(w+'\n')
            f.close()

    

if __name__ == '__main__':
    clean()
