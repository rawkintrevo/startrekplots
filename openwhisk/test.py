from requests import post

url = "https://e88ff614.us-south.apigw.appdomain.cloud/startrek_plots/v1"

r = post(url, data={"seed": 'During the Battle of Betazed the USS Enterprise was'})
#r = post(url, data={"seed": 'three words'})
print(r.status_code)
if (r.status_code < 300):
    print(r.json()['output'][0][1])
else:
    print(f"Ruh Roh- Status Code: {r.status_code}")

alphabets= "([A-Za-z])"
prefixes = "(Mr|St|Mrs|Ms|Dr|Lt)[.]"
suffixes = "(Inc|Ltd|Jr|Sr|Co)"
starters = "(Mr|Mrs|Ms|Dr|He\s|She\s|It\s|They\s|Their\s|Our\s|We\s|But\s|However\s|That\s|This\s|Wherever)"
acronyms = "([A-Z][.][A-Z][.](?:[A-Z][.])?)"
websites = "[.](com|net|org|io|gov)"

def split_into_sentences(text):
    import re
    text = " " + text + "  "
    text = text.replace("\n"," ")
    text = re.sub(prefixes,"\\1<prd>",text)
    text = re.sub(websites,"<prd>\\1",text)
    if "Ph.D" in text: text = text.replace("Ph.D.","Ph<prd>D<prd>")
    text = re.sub("\s" + alphabets + "[.] "," \\1<prd> ",text)
    text = re.sub(acronyms+" "+starters,"\\1<stop> \\2",text)
    text = re.sub(alphabets + "[.]" + alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>\\3<prd>",text)
    text = re.sub(alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>",text)
    text = re.sub(" "+suffixes+"[.] "+starters," \\1<stop> \\2",text)
    text = re.sub(" "+suffixes+"[.]"," \\1<prd>",text)
    text = re.sub(" " + alphabets + "[.]"," \\1<prd>",text)
    if "”" in text: text = text.replace(".”","”.")
    if "\"" in text: text = text.replace(".\"","\".")
    if "!" in text: text = text.replace("!\"","\"!")
    if "?" in text: text = text.replace("?\"","\"?")
    text = text.replace(".",".<stop>")
    text = text.replace("?","?<stop>")
    text = text.replace("!","!<stop>")
    text = text.replace("<prd>",".")
    sentences = text.split("<stop>")
    sentences = sentences[:-1]
    sentences = [s.strip() for s in sentences]
    return sentences

def make_acts(seed_s, min_acts= 3, prior_acts=[]):
    o = next_line(seed_s)
    acts = [next_line(s)[0][1] for s in split_into_sentences(o[0][1])]
    print(f"acts1:")
    print(acts)
    if len(acts) < min_acts:
        acts = [make_acts(a, min_acts= 2) for a in acts]
        print('acts2')
        print(acts)
        # return acts
    return acts
