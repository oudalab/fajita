import pymongo
from pymongo import MongoClient
client=MongoClient()
client=MongoClient('mongodb://hanover.cs.ou.edu:27017/')
db=client['arabic_data']
sen=db.sentences

from nltk.tokenize import RegexpTokenizer
from stop_words import get_stop_words
from nltk.stem.porter import PorterStemmer
from gensim import corpora, models
import gensim
f = open("arabic_out",'w')

import time
start_time = time.time()

tokenizer = RegexpTokenizer(r'\w+')

# create English stop words list
en_stop = get_stop_words('ar')

# Create p_stemmer of class PorterStemmer
p_stemmer = PorterStemmer()
    
# create sample documents
#doc_a = "وقال جبور ان المكان كان يديره اميركان في ملابس مدنية ويتولى حراسته رجال ملثمون يرتدون ملابس سوداء وقفازات."
#doc_b = "وقال جبور انه كان عاريا خلال الثلاثة اشهر الاولى في الموقع الافغاني، التي قضاها في زنزانة اسمنتية مفروشة بملاءتين وسطل.."
#doc_c = "ويبدو ان الام كانت تعاني من الاكتئاب لكن لم يكن من الممكن معرفة ما اذا كان وضعها النفسي هذا سببه «مشاكل عائلية او مالية او زوجية او غير ذلك»، حسب بيرنار غوتالز، المتحدث باسم نيابة المدينة، الذي ذكر أنه «من المبكر جدا معرفة أسباب هذا السلوك الذي لم تشهد نيفيل مثيلا له من قبل»، على حد تعبيره."
#doc_d = "م) الذي يعمل في مجال الصيدلة، بتفاصيل الحادث بعد عدة ساعات."
#doc_e = "أكد عبد الرحمن بن راشد الراشد رئيس مجلس الغرف السعودية رئيس الغرفة التجارية الصناعية في المنطقة الشرقية أمس لـ«الشرق الأوسط» أن مجلس الشورى ينظر حاليا بصحيفة تظلم رفعها مجلس الغرف السعودي وتقدم بها عدد من المقاولين السعوديين الذين لديهم عقودا مع جهات حكومية بسبب ارتفاع أسعار مواد البناء كالحديد والاسمنت ومواد الكهرباء وغيرها، مؤكداً بان المجلس سيبت في الموضوع قريبا." 

# compile sample documents into a list
#doc_set = doc_set#[doc_a, doc_b, doc_c, doc_d, doc_e]
#count=1;
doc_set=[]
for record in sen.find():
    doc_set.append(record['wholeSentence'])
    
# list for tokenized documents in loop
f.write("--- %s data loading seconds ---" % (time.time() - start_time))
start_time = time.time()
texts = []

# loop through document list
for i in doc_set:
    
    # clean and tokenize document string
    #raw = i.lower()
    #tokens = tokenizer.tokenize(raw)
    #raw = i.lower()
    tokens = tokenizer.tokenize(i)

    # remove stop words from tokens
    stopped_tokens = [i for i in tokens if not i in en_stop]
    
    # stem tokens
    stemmed_tokens = [p_stemmer.stem(i) for i in stopped_tokens]
    
    # add tokens to list
    texts.append(stemmed_tokens)

# turn our tokenized documents into a id <-> term dictionary
dictionary = corpora.Dictionary(texts)
    
# convert tokenized documents into a document-term matrix
corpus = [dictionary.doc2bow(text) for text in texts]

# generate LDA model
ldamodel = gensim.models.ldamodel.LdaModel(corpus, num_topics=10, id2word = dictionary, passes=1)

f.write(ldamodel.print_topics(num_topics=10, num_words=10))
f.write("\n")
f.write("--- %s data training seconds ---" % (time.time() - start_time))
f.close();
