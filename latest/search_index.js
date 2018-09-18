var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#Mongoc.jl-1",
    "page": "Home",
    "title": "Mongoc.jl",
    "category": "section",
    "text": ""
},

{
    "location": "index.html#Introduction-1",
    "page": "Home",
    "title": "Introduction",
    "category": "section",
    "text": "Mongoc.jl is a MongoDB driver for the Julia Language.It is implemented as a thin wrapper around libmongoc, the official client library for C applications.Given that BSON is the document format for MongoDB, this package also implements a wrapper around libbson, which provides a way to create and manipulate BSON documents."
},

{
    "location": "index.html#Requirements-1",
    "page": "Home",
    "title": "Requirements",
    "category": "section",
    "text": "MongoDB 3.0 or newer\nJulia versions v0.6, v0.7 or v1.0.\nLinux or OSX.note: Note\nCurrently, this package might cause garbage collection errors if using Julia v0.6 on OSX."
},

{
    "location": "index.html#MongoDB-C-Driver-1",
    "page": "Home",
    "title": "MongoDB C Driver",
    "category": "section",
    "text": "This packages downloads precompiled binaries for MongoDB C Driver v1.12.0 from mongo-c-driver-builder.The binaries are compiled by Travis CI, using BinaryBuilder.jl.Windows is currently not supported because the C driver requires Visual Studio to be compiled.If your platform is not supported and can be compiled by BinaryBuilder.jl, please open an issue."
},

{
    "location": "index.html#Source-Code-1",
    "page": "Home",
    "title": "Source Code",
    "category": "section",
    "text": "The source code for this package is hosted at https://github.com/felipenoris/Mongoc.jl."
},

{
    "location": "index.html#References-1",
    "page": "Home",
    "title": "References",
    "category": "section",
    "text": "libbson documentation\nlibmongoc documentation"
},

{
    "location": "tutorial.html#",
    "page": "Tutorial",
    "title": "Tutorial",
    "category": "page",
    "text": ""
},

{
    "location": "tutorial.html#Tutorial-1",
    "page": "Tutorial",
    "title": "Tutorial",
    "category": "section",
    "text": "This tutorial illustrates common use cases for accessing a MongoDB database with Mongoc.jl package."
},

{
    "location": "tutorial.html#Setup-1",
    "page": "Tutorial",
    "title": "Setup",
    "category": "section",
    "text": "First, make sure you have Mongoc.jl package installed.julia> using Pkg\n\njulia> Pkg.clone(\"https://github.com/felipenoris/Mongoc.jl.git\")The following tutorial assumes that a MongoDB instance is running on the default host and port: localhost:27017.To start a new server instance on the default location use the following command on your shell.$ mkdir db\n\n$ mongod --dbpath ./db --smallfiles"
},

{
    "location": "tutorial.html#Connecting-to-MongoDB-1",
    "page": "Tutorial",
    "title": "Connecting to MongoDB",
    "category": "section",
    "text": "Connect to a MongoDB instance using a Mongoc.Client. Use the MongoDB URI format to set the server location.julia> import Mongoc\n\njulia> client = Mongoc.Client(\"mongodb://localhost:27017\")As a shorthand, you can also use:julia> client = Mongoc.Client(\"localhost\", 27017)To connect to the server at the default location localhost:27017 you can use the Mongoc.Client constructor with no arguments.julia> client = Mongoc.Client()"
},

{
    "location": "tutorial.html#Getting-a-Database-1",
    "page": "Tutorial",
    "title": "Getting a Database",
    "category": "section",
    "text": "A MongoDB instance consists on a set of independent databases. You get a Database reference using the following command.julia> database = client[\"my-database\"]If \"my-database\" does not exist on your MongoDB instance, it will be created in the first time you insert a document in it."
},

{
    "location": "tutorial.html#Getting-a-Collection-1",
    "page": "Tutorial",
    "title": "Getting a Collection",
    "category": "section",
    "text": "A Collection is a set of documents in a MongoDB database. You get a collection reference using the following command.julia> collection = database[\"my-collection\"]If it does not exist inside your database, the Collection is created in the first time you insert a document in it."
},

{
    "location": "tutorial.html#BSON-Documents-1",
    "page": "Tutorial",
    "title": "BSON Documents",
    "category": "section",
    "text": "BSON is the document format for MongoDB.To create a BSON document instance in Mongoc.jl just use Dictionary syntax, using Strings as keys.julia> document = Mongoc.BSON()\n\njulia> document[\"name\"] = \"Felipe\"\n\njulia> document[\"age\"] = 35\n\njulia> document[\"preferences\"] = [ \"Music\", \"Computer\", \"Photography\" ]\n\njulia> using Dates; document[\"details\"] = Dict(\"birth date\" => DateTime(1983, 4, 16), \"location\" => \"Rio de Janeiro\")To convert a BSON to a JSON string, use:julia> Mongoc.as_json(document)\n\"{ \\\"name\\\" : \\\"Felipe\\\", \\\"age\\\" : 35, \\\"preferences\\\" : [ \\\"Music\\\", \\\"Computer\\\", \\\"Photography\\\" ], \\\"details\\\" : { \\\"location\\\" : \\\"Rio de Janeiro\\\", \\\"birth date\\\" : { \\\"\\$date\\\" : \\\"1983-04-16T00:00:00Z\\\" } } }\"You can also create a BSON document from a JSON string.julia> document = Mongoc.BSON(\"\"\"{ \"hey\" : \"you\" }\"\"\")And also from a Dictionary.julia> dict = Dict(\"hey\" => \"you\")\nDict{String,String} with 1 entry:\n  \"hey\" => \"you\"\n\njulia> document = Mongoc.BSON(dict)\nBSON(\"{ \"hey\" : \"you\" }\")To convert a BSON document to a Dictionary, use Mongoc.as_dict.julia> Mongoc.as_dict(document)\nDict{Any,Any} with 1 entry:\n  \"hey\" => \"you\""
},

{
    "location": "tutorial.html#Inserting-Documents-1",
    "page": "Tutorial",
    "title": "Inserting Documents",
    "category": "section",
    "text": "To insert a single document into a collection, just Base.push! a BSON document to it. The result of this operation wraps the server reply and the inserted oid.julia> result = push!(collection, document)\nMongoc.InsertOneResult(BSON(\"{ \"insertedCount\" : 1 }\"), \"5b9f115311c3dd25383e0f32\")\n\njulia> result.inserted_oid\n\"5b9f115311c3dd25383e0f32\"Use Base.append! to insert a vector of documents to a collection. The result of this operation also wraps the server reply and the inserted oids.julia> doc1 = Mongoc.BSON(\"\"\"{ \"hey\" : \"you\", \"out\" : \"there\" }\"\"\")\nBSON(\"{ \"hey\" : \"you\", \"out\" : \"there\" }\")\n\njulia> doc2 = Mongoc.BSON(\"\"\"{ \"hey\" : \"others\", \"in the\" : \"cold\" }\"\"\")\nBSON(\"{ \"hey\" : \"others\", \"in the\" : \"cold\" }\")\n\njulia> vector = [ doc1, doc2 ]\n2-element Array{Mongoc.BSON,1}:\n BSON(\"{ \"hey\" : \"you\", \"out\" : \"there\" }\")\n BSON(\"{ \"hey\" : \"others\", \"in the\" : \"cold\" }\")\n\njulia> append!(collection, vector)\nMongoc.BulkOperationResult(BSON(\"{ \"nInserted\" : 2, \"nMatched\" : 0, \"nModified\" : 0, \"nRemoved\" : 0, \"nUpserted\" : 0, \"writeErrors\" : [  ] }\"), 0x00000001, Union{Nothing, String}[\"5b9f11ba11c3dd25841c7dc2\", \"5b9f11ba11c3dd25841c7dc3\"])"
},

{
    "location": "tutorial.html#Querying-Documents-1",
    "page": "Tutorial",
    "title": "Querying Documents",
    "category": "section",
    "text": "To query a single document, use Mongoc.find_one. Pass a BSON argument as a query filter.julia> document = Mongoc.find_one(collection, Mongoc.BSON(\"\"\"{ \"hey\" : \"you\" }\"\"\"))\nBSON(\"{ \"_id\" : { \"$oid\" : \"5b9ef9cc11c3dd1da14675c3\" }, \"hey\" : \"you\" }\")To query multiple documents, use Mongoc.find. Pass a BSON query argument as a query filter. It returns a iterator of BSON documents that can be read using a for loop.julia> for document in Mongoc.find(collection)\n        println(document)\n       end\nBSON(\"{ \"_id\" : { \"$oid\" : \"5b9f02fb11c3dd1f4f3e26e5\" }, \"hey\" : \"you\", \"out\" : \"there\" }\")\nBSON(\"{ \"_id\" : { \"$oid\" : \"5b9f02fb11c3dd1f4f3e26e6\" }, \"hey\" : \"others\", \"in the\" : \"cold\" }\")\n\njulia> for document in Mongoc.find(collection, Mongoc.BSON(\"\"\"{ \"in the\" : \"cold\" }\"\"\"))\n           println(document)\n       end\nBSON(\"{ \"_id\" : { \"$oid\" : \"5b9f02fb11c3dd1f4f3e26e6\" }, \"hey\" : \"others\", \"in the\" : \"cold\" }\")"
},

{
    "location": "tutorial.html#Counting-Documents-1",
    "page": "Tutorial",
    "title": "Counting Documents",
    "category": "section",
    "text": "Use Base.length function to count the number of documents in a collection. Pass a BSON argument as a query filter.julia> length(collection)\n2\n\njulia> length(collection, Mongoc.BSON(\"\"\"{ \"in the\" : \"cold\" }\"\"\"))\n1"
},

{
    "location": "tutorial.html#Aggregation-and-Map-Reduce-1",
    "page": "Tutorial",
    "title": "Aggregation and Map-Reduce",
    "category": "section",
    "text": "Use Mongoc.aggregate to execute an aggregation command.The following reproduces the example from the MongoDB Tutorial.docs = [\n    Mongoc.BSON(\"\"\"{ \"cust_id\" : \"A123\", \"amount\" : 500, \"status\" : \"A\" }\"\"\"),\n    Mongoc.BSON(\"\"\"{ \"cust_id\" : \"A123\", \"amount\" : 250, \"status\" : \"A\" }\"\"\"),\n    Mongoc.BSON(\"\"\"{ \"cust_id\" : \"B212\", \"amount\" : 200, \"status\" : \"A\" }\"\"\"),\n    Mongoc.BSON(\"\"\"{ \"cust_id\" : \"A123\", \"amount\" : 300, \"status\" : \"D\" }\"\"\")\n]\n\ncollection = client[\"my-database\"][\"aggregation-collection\"]\nappend!(collection, docs)\n\n# Sets the pipeline command\nbson_pipeline = Mongoc.BSON(\"\"\"\n    [\n        { \"\\$match\" : { \"status\" : \"A\" } },\n        { \"\\$group\" : { \"_id\" : \"\\$cust_id\", \"total\" : { \"\\$sum\" : \"\\$amount\" } } }\n    ]\n\"\"\")\n\nfor doc in Mongoc.aggregate(collection, bson_pipeline)\n	println(doc)\nendThe result of the script above is:BSON(\"{ \"_id\" : \"B212\", \"total\" : 200 }\")\nBSON(\"{ \"_id\" : \"A123\", \"total\" : 750 }\")A Map-Reduce operation can be executed with Mongoc.command_simple.input_collection_name = \"aggregation-collection\"\noutput_collection_name = \"order_totals\"\nquery = Mongoc.BSON(\"\"\"{ \"status\" : \"A\" }\"\"\")\n\n# use `Mongoc.BSONCode` to represent JavaScript elements in BSON\nmapper = Mongoc.BSONCode(\"\"\" function() { emit( this.cust_id, this.amount ); } \"\"\")\nreducer = Mongoc.BSONCode(\"\"\" function(key, values) { return Array.sum( values ) } \"\"\")\n\nmap_reduce_command = Mongoc.BSON()\nmap_reduce_command[\"mapReduce\"] = input_collection_name\nmap_reduce_command[\"map\"] = mapper\nmap_reduce_command[\"reduce\"] = reducer\nmap_reduce_command[\"out\"] = output_collection_name\nmap_reduce_command[\"query\"] = query\n\nresult = Mongoc.command_simple(database, map_reduce_command)\nprintln(result)\n\nfor doc in Mongoc.find(database[\"order_totals\"])\n   println(doc)\nendThe result of the script above is:BSON(\"{ \"result\" : \"order_totals\", \"timeMillis\" : 135, \"counts\" : { \"input\" : 3, \"emit\" : 3, \"reduce\" : 1, \"output\" : 2 }, \"ok\" : 1.0 }\")\nBSON(\"{ \"_id\" : \"A123\", \"value\" : 750.0 }\")\nBSON(\"{ \"_id\" : \"B212\", \"value\" : 200.0 }\")"
},

{
    "location": "crud.html#",
    "page": "CRUD Operations",
    "title": "CRUD Operations",
    "category": "page",
    "text": ""
},

{
    "location": "crud.html#CRUD-Operations-1",
    "page": "CRUD Operations",
    "title": "CRUD Operations",
    "category": "section",
    "text": ""
},

{
    "location": "crud.html#Insert-1",
    "page": "CRUD Operations",
    "title": "Insert",
    "category": "section",
    "text": ""
},

{
    "location": "crud.html#API-1",
    "page": "CRUD Operations",
    "title": "API",
    "category": "section",
    "text": "Mongoc.insert_one(collection::Collection, document::BSON; options::Union{Nothing, BSON}=nothing)\n\nMongoc.insert_many(collection::Collection, documents::Vector{BSON}; bulk_options::Union{Nothing, BSON}=nothing, insert_options::Union{Nothing, BSON}=nothing)Mongoc.insert_one is equivalent to Base.push! for a collection. The same applies to Mongoc.insert_many in relation to Base.append!."
},

{
    "location": "crud.html#Examples-1",
    "page": "CRUD Operations",
    "title": "Examples",
    "category": "section",
    "text": "push!(collection, Mongoc.BSON(\"\"\"{ \"hello\" : \"world\" }\"\"\"))\n\nappend!(collection, [ Mongoc.BSON(\"\"\"{ \"first\" : 1, \"delete\" : true }\"\"\"), Mongoc.BSON(\"\"\"{ \"second\" : 2, \"delete\" : true }\"\"\"), Mongoc.BSON(\"\"\"{ \"third\" : 3, \"delete\" : false }\"\"\") ])"
},

{
    "location": "crud.html#Select-1",
    "page": "CRUD Operations",
    "title": "Select",
    "category": "section",
    "text": ""
},

{
    "location": "crud.html#API-2",
    "page": "CRUD Operations",
    "title": "API",
    "category": "section",
    "text": "find_one(collection::Collection, bson_filter::BSON=BSON(); options::Union{Nothing, BSON}=nothing) :: Union{Nothing, BSON}\n\nfind(collection::Collection, bson_filter::BSON=BSON(); options::Union{Nothing, BSON}=nothing) :: Cursor"
},

{
    "location": "crud.html#Examples-2",
    "page": "CRUD Operations",
    "title": "Examples",
    "category": "section",
    "text": "bson = Mongoc.find_one(collection, Mongoc.BSON(\"\"\"{ \"third\" : 3 }\"\"\"))\n\nfor doc in Mongoc.find(collection)\n	println(doc)\nend"
},

{
    "location": "crud.html#Update-1",
    "page": "CRUD Operations",
    "title": "Update",
    "category": "section",
    "text": ""
},

{
    "location": "crud.html#API-3",
    "page": "CRUD Operations",
    "title": "API",
    "category": "section",
    "text": "Mongoc.update_one(collection::Collection, selector::BSON, update::BSON; options::Union{Nothing, BSON}=nothing)\n\nMongoc.update_many(collection::Collection, selector::BSON, update::BSON; options::Union{Nothing, BSON}=nothing)"
},

{
    "location": "crud.html#Examples-3",
    "page": "CRUD Operations",
    "title": "Examples",
    "category": "section",
    "text": "selector = Mongoc.BSON(\"\"\"{ \"delete\" : false }\"\"\")\nupdate = Mongoc.BSON(\"\"\"{ \"\\$set\" : { \"delete\" : true, \"new_field\" : 1 } }\"\"\")\nMongoc.update_one(collection, selector, update)\n\nselector = Mongoc.BSON(\"\"\"{ \"delete\" : true }\"\"\")\nupdate = Mongoc.BSON(\"\"\"{ \"\\$set\" : { \"delete\" : false } }\"\"\")\nMongoc.update_many(collection, selector, update)"
},

{
    "location": "crud.html#Delete-1",
    "page": "CRUD Operations",
    "title": "Delete",
    "category": "section",
    "text": ""
},

{
    "location": "crud.html#API-4",
    "page": "CRUD Operations",
    "title": "API",
    "category": "section",
    "text": "Mongoc.delete_one(collection::Collection, selector::BSON; options::Union{Nothing, BSON}=nothing)\n\nMongoc.delete_many(collection::Collection, selector::BSON; options::Union{Nothing, BSON}=nothing)"
},

{
    "location": "crud.html#Examples-4",
    "page": "CRUD Operations",
    "title": "Examples",
    "category": "section",
    "text": "selector = Mongoc.BSON()\nselector[\"_id\"] = oid\nMongoc.delete_one(collection, selector)\n\n# deletes all elements in a collection\nMongoc.delete_many(collection, Mongoc.BSON()) # equivalent to `empty!(collection)`"
},

{
    "location": "api.html#",
    "page": "API Reference",
    "title": "API Reference",
    "category": "page",
    "text": ""
},

{
    "location": "api.html#Mongoc.QUERY_FLAG_AWAIT_DATA",
    "page": "API Reference",
    "title": "Mongoc.QUERY_FLAG_AWAIT_DATA",
    "category": "constant",
    "text": "Use with MONGOCQUERYTAILABLE_CURSOR. Block rather than returning no data. After a period, time out.\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.QUERY_FLAG_EXHAUST",
    "page": "API Reference",
    "title": "Mongoc.QUERY_FLAG_EXHAUST",
    "category": "constant",
    "text": "Stream the data down full blast in multiple “reply” packets. Faster when you are pulling down a lot of data and you know you want to retrieve it all.\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.QUERY_FLAG_NONE",
    "page": "API Reference",
    "title": "Mongoc.QUERY_FLAG_NONE",
    "category": "constant",
    "text": "Specify no query flags.\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.QUERY_FLAG_NO_CURSOR_TIMEOUT",
    "page": "API Reference",
    "title": "Mongoc.QUERY_FLAG_NO_CURSOR_TIMEOUT",
    "category": "constant",
    "text": "The server normally times out an idle cursor after an inactivity period (10 minutes). This prevents that.\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.QUERY_FLAG_OPLOG_REPLAY",
    "page": "API Reference",
    "title": "Mongoc.QUERY_FLAG_OPLOG_REPLAY",
    "category": "constant",
    "text": "Used internally by MongoDB.\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.QUERY_FLAG_PARTIAL",
    "page": "API Reference",
    "title": "Mongoc.QUERY_FLAG_PARTIAL",
    "category": "constant",
    "text": "Get partial results from mongos if some shards are down (instead of throwing an error).\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.QUERY_FLAG_SLAVE_OK",
    "page": "API Reference",
    "title": "Mongoc.QUERY_FLAG_SLAVE_OK",
    "category": "constant",
    "text": "Allow query of replica set secondaries.\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.QUERY_FLAG_TAILABLE_CURSOR",
    "page": "API Reference",
    "title": "Mongoc.QUERY_FLAG_TAILABLE_CURSOR",
    "category": "constant",
    "text": "Cursor will not be closed when the last data is retrieved. You can resume this cursor later.\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.BSON",
    "page": "API Reference",
    "title": "Mongoc.BSON",
    "category": "type",
    "text": "BSON is a wrapper for C struct bson_t.\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.BSONCode",
    "page": "API Reference",
    "title": "Mongoc.BSONCode",
    "category": "type",
    "text": "BSON element with JavaScript source code.\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.BSONError",
    "page": "API Reference",
    "title": "Mongoc.BSONError",
    "category": "type",
    "text": "Mirrors C struct bson_error_t and can be allocated in the stack.\n\nBSONError instances addresses are passed to libbson/libmongoc API using Ref(error), and are owned by the Julia process.\n\ntypedef struct {\n   uint32_t domain;\n   uint32_t code;\n   char message[504];\n} bson_error_t;\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.BSONIter",
    "page": "API Reference",
    "title": "Mongoc.BSONIter",
    "category": "type",
    "text": "BSONIter mirrors C struct bsonitert and can be allocated in the stack.\n\nAccording to libbson documentation, it is meant to be used on the stack and can be discarded at any time as it contains no external allocation. The contents of the structure should be considered private and may change between releases, however the structure size will not change.\n\nInspecting its size in C, we get:\n\nsizeof(bson_iter_t) == 80\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.BSONObjectId",
    "page": "API Reference",
    "title": "Mongoc.BSONObjectId",
    "category": "type",
    "text": "Mirrors C struct bson_oid_t.\n\nBSONObjectId instances addresses are passed to libbson/libmongoc API using Ref(oid), and are owned by the Julia process.\n\ntypedef struct {\n   uint8_t bytes[12];\n} bson_oid_t;\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.BSONType",
    "page": "API Reference",
    "title": "Mongoc.BSONType",
    "category": "type",
    "text": "BSONType mirrors C enum bsontypet.\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.Client",
    "page": "API Reference",
    "title": "Mongoc.Client",
    "category": "type",
    "text": "Client is a wrapper for C struct mongoc_client_t.\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.Collection",
    "page": "API Reference",
    "title": "Mongoc.Collection",
    "category": "type",
    "text": "Collection is a wrapper for C struct mongoc_collection_t.\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.Cursor",
    "page": "API Reference",
    "title": "Mongoc.Cursor",
    "category": "type",
    "text": "Cursor is a wrapper for C struct mongoc_cursor_t.\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.Database",
    "page": "API Reference",
    "title": "Mongoc.Database",
    "category": "type",
    "text": "Database is a wrapper for C struct mongoc_database_t.\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.QueryFlags",
    "page": "API Reference",
    "title": "Mongoc.QueryFlags",
    "category": "type",
    "text": "Mirrors C struct mongoc_query_flags_t.\n\nThese flags correspond to the MongoDB wire protocol. They may be bitwise or’d together. They may modify how a query is performed in the MongoDB server.\n\nFrom: http://mongoc.org/libmongoc/current/mongocqueryflags_t.html\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.URI",
    "page": "API Reference",
    "title": "Mongoc.URI",
    "category": "type",
    "text": "URI is a wrapper for C struct mongoc_uri_t.\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.as_json-Tuple{Mongoc.BSON}",
    "page": "API Reference",
    "title": "Mongoc.as_json",
    "category": "method",
    "text": "as_json(bson::BSON; canonical::Bool=false) :: String\n\nConverts a bson object to a JSON string.\n\nExample\n\njulia> document = Mongoc.BSON(\"{ \"hey\" : 1 }\")\nBSON(\"{ \"hey\" : 1 }\")\n\njulia> Mongoc.as_json(document)\n\"{ \"hey\" : 1 }\"\n\njulia> Mongoc.as_json(document, canonical=true)\n\"{ \"hey\" : { \"$numberInt\" : \"1\" } }\"\n\nC API\n\nbson_as_canonical_extended_json\nbson_as_relaxed_extended_json\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.command_simple-Tuple{Mongoc.Database,Mongoc.BSON}",
    "page": "API Reference",
    "title": "Mongoc.command_simple",
    "category": "method",
    "text": "command_simple(database::Database, command::Union{String, BSON}) :: BSON\n\nExecutes a command given by a JSON string or a BSON instance.\n\nIt returns the first document from the result cursor.\n\nExample\n\njulia> client = Mongoc.Client() # connects to localhost at port 27017\nClient(URI(\"mongodb://localhost:27017\"))\n\njulia> bson_result = Mongoc.command_simple(client[\"admin\"], \"{ \"ping\" : 1 }\")\nBSON(\"{ \"ok\" : 1.0 }\")\n\nC API\n\nmongoc_database_command_simple\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.find_one",
    "page": "API Reference",
    "title": "Mongoc.find_one",
    "category": "function",
    "text": "find_one(collection::Collection, bson_filter::BSON=BSON(); options::Union{Nothing, BSON}=nothing) :: Union{Nothing, BSON}\n\nExecute a query to a collection and returns the first element of the result set.\n\nReturns nothing if the result set is empty.\n\n\n\n\n\n"
},

{
    "location": "api.html#Mongoc.set_appname!-Tuple{Mongoc.Client,String}",
    "page": "API Reference",
    "title": "Mongoc.set_appname!",
    "category": "method",
    "text": "set_appname!(client::Client, appname::String)\n\nSets the application name for this client.\n\nThis string, along with other internal driver details, is sent to the server as part of the initial connection handshake.\n\nC API\n\nmongoc_client_set_appname.\n\n\n\n\n\n"
},

{
    "location": "api.html#API-Reference-1",
    "page": "API Reference",
    "title": "API Reference",
    "category": "section",
    "text": "Modules = [Mongoc]"
},

]}
