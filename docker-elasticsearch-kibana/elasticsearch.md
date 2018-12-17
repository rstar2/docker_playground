# Basic REST API endpoint

## delete whole index (all documents inside it)
```json
DELETE /pages
```

## ---------- CREATE -------------

#### create a document in the "pages" index (create the index first if not existing) - the new document's ID (e.g. "_id") is created by ElasticSearch
```json
POST /pages/_doc
{
  "url": "1",
  "type": "news_page",
  "text": "text asdasda dasd  text2 asdadasd"
}
```

```json
POST /pages/_doc
{
  "url": "2",
  "type": "blog_post",
  "text": "213123 12312 3123 text asdadad asd text2"
}
```

```json
POST /pages/_doc
{
  "url": "3",
  "type": "product",
  "text": "new product"
}
```

```json
POST /pages/_doc
{
  "url": "4",
  "type": "product",
  "text": "product text"
}
```

#### create a document in the "pages" index (create the index first if not existing) - the new document's ID (e.g. "_id") is created by ElasticSearch
```json
PUT /pages/_doc/CREATED_IN_FRONT_ID
{
  "url": "5",
  "type": "news_page",
  "text": "asda dasd as text text2 2423423423 23423 "
}
```

## ------------ SEARCH ----------------

#### search all
GET /pages/_doc/_search


#### simple search for containing ANY of the specified words
```json
GET /pages/_doc/_search
{
  "query": {
    "match": {
      "text": "text text2"
    }
  }
}
```

#### if the search is for more than one word
```json
GET /pages/_doc/_search
{
  "query": {
    "match_phrase": {
      "text": "text text2"
    }
  }
}
```

#### for more complex search
```json
GET /pages/_doc/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
             "text": "text"
           }
        },
        {
          "match": {
             "type": "news_page"
           }
        }
      ]
    }
  }
}
```


# SLQ searches
```sql
POST /_xpack/sql?format=txt
{
  "query": "SELECT * FROM pages"
}
```


## ------------- AGGREGATION  -----------------


## ------------- GEO Search  -----------------

### First  proper mappings for a GEO coordinates must be provided

#### get the mapping (schema) that ElasticSearch inferred and applied when not explicitly provided any
GET /restourants/_mapping/_doc

# set it manually - but first recreate it
```json
DELETE /restourants
```
```json
PUT /restourants
```
```json
PUT /restourants/_mapping/_doc
{
  ....
}
```

## Other CRUD operations

#### get a document
```json
GET /pages/_doc/CREATED_IN_FRONT_ID
```

#### complete update/replace
```json
POST /pages/_doc/CREATED_IN_FRONT_ID
{
  "url": 56,
  "replaced": "yes"
}
```

# partial update - updating existing props or adding new props
```json
POST /pages/_doc/CREATED_IN_FRONT_ID/_update
{
  "doc": {
    "url": 5555,
    "new_value": "new data"

  }
}
```

# delete a document
```json
DELETE /pages/_doc/CREATED_IN_FRONT_ID
```

## ---- Analyzers - Tokenization and Token Filters -----
