/* global db:true, print, sleep */

print('===== Start: Init Website database =====');

// Wait for the rs.initiate() to be ready - and ONLY after there's a Master (primary node)
// selected ( in this demo it's only one MongoDb node anyhow) then invoke all other write/read CRUD operations. Otherwise they will not take affect.
var masterInited = false;
for (var i = 0; i < 15; i++) {
    if (rs.isMaster().ismaster === true) {
        masterInited = true;
        break;
    }

    sleep(1000);
}

if (masterInited) {
    print('Master is initialized');

    // use/create the 'website' database - the JavaScript equivalent of "use website"
    db = db.getSiblingDB('website');

    // create the 'articles' collection
    db.createCollection('articles');

    // create demo articles
    db.articles.insert({
        title: 'Yahoo sale to Verizon',
        content: 'The sale is being done in two steps. The first step will be the transfer of any assets related to Yahoo business to a singular subsidiary. This includes the stock in the business subsidiaries that make up Yahoo that are not already in the single subsidiary, as well as the odd assets like benefit plan rights. This is what is being sold to Verizon. A license of Yahoo’s oldest patents is being held back in the so-called Excalibur portfolio. This will stay with Yahoo, as will Yahoo’s stakes in Alibaba Group and Yahoo Japan.'
    });

    db.articles.insert({
        title: 'Chinese Group to Pay $4.4 Billion for Caesars Mobile Games',
        content: 'In the most recent example in a growing trend of big deals for smartphone-based games, a consortium of Chinese investors led by the game company Shanghai Giant Network Technology said in a statement on Saturday that it would pay $4.4 billion to Caesars Interactive Entertainment for Playtika, its social and mobile games unit. Caesars Interactive is controlled by the owners of Caesars Palace and other casinos in Las Vegas and elsewhere.'
    });

    // create a text index https://docs.mongodb.com/manual/core/index-text/
    // that will be used when searching for text - in BOTH 'title' and 'content' fields
    db.articles.createIndex({
        title: 'text',
        content: 'text'
    });

} else {
    print('No Master initialized');
}
print('===== End: Init Website database =====');

// MongoDB Text Indexes Restrictions:
// 1. A collection can have at most one text index.
// 2. Sort operations cannot obtain sort order from a text index, even from a compound text index; i.e. sort operations cannot use the ordering in the text index.
// 3. text indexes only support simple binary comparison and do not support collation.
//    To create a text index on a a collection that has a non-simple collation, you must explicitly specify {collation: {locale: "simple"} } when creating the index.
// 4. text indexes can be large.
// 5. text indexes will impact insertion throughput because MongoDB must add an index entry for each unique post-stemmed word in each indexed field of each new source document.
// 6. Partial search is not possible

// So MongoDB will use this index when searching for text in the 'title' and 'content' (not different weights can be specified for each field)
//  db.articles.find( { $text: { $search: "chinese" } } )
// will find one document

// Note!!! Partial search is not possible though
//  db.articles.find( { $text: { $search: "chi" } } )
// will not find anything
