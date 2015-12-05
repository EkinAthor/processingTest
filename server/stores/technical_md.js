//import { normalize, Schema, arrayOf } from 'normalizr';

export const data = [
{technicalMetadata: {
    'info': {
      'gid':'1234567890',                          //unique global ID of document
      'version':'12',
      'uid':'u0987654321',                        //unique user ID
      'created':'2015-04-05 19:05:32',            //date of upload/processing
      'label': 'the best file ever',
      'name':'randomfile.csv',                //filename taken from source
      'type':'text'
    },
    'source':                                //Taken from current .metadata file in DQC. Maybe it should be backward compatibile :)
    {
      'implementation' : 'com.ataccama.storage.file.vintage',
      'location': 'web URL/fileUpload/gdrive URL/dropbox URL/..',
      'source': 'c:/abc/def',
      'encoding':'UTF-8',                 //obvious - encoding of the whole document. There can be only one in each document.
      'fieldSeparator':';',               //field separator. Will apply only to text files.
      'stringQualifierEscapeSequence':'', //applicable to text files only
      'numberOfLinesInHeader':'1',        //applicable to text files only
      'numberOfLinesInFooter':'1',        //applicable to text files only
      'recordSeparator':'\r\n',           //new line character
      'lineWithColumnNames':'1',          //applicable to text files only.
      'recordLength':'',
      'ignoredRowRegEx':'',
      'escapeSequence':'',
      'fixedSizes':''
    },
    'columns':[
      {
        'name': 'Field_0',
        'dataType': 'String',
        'label': 'First Name',
        'eid': '1234567890_asd1231251'
      },
      {
        'name': 'Field_1',
        'dataType': 'Integer',
        'label': 'Age',
        'eid': '1234567890_asd1231252'
      }
    ]
},
businessMetadata: {
// add more info, profiling results
  'gid': '1234567890',
  'techId': '5628a7e0c1377f2a05f7246e',
  'lineCount':10666,
  'other': {
    'state':'processing' //indicates states in which this document is
    },  
  'elements': //add gid and version
    [
      {
        'data_type':'string',  //standard java type
        'label':'src_name',                 //name of the element. Sometimes parse from data, sometimes generated. Every element should have label
        'eid':'1234567890_asd1231251',      //gid + element id. Every element of every document should have unique ID for rerferences. We want to link together documents with same elements, etc.
        'parentId':'1234567890',            //for json/xml and maybe other purposes. Element can reference to its parent. Every element has at least one parent - the document
        'nullCount': {
          'null': 666,
          'nonNull': 10000
        },
        'patterns':[
          {
            'pattern':'W W',
            'count':'89940',
          'distinctCount':'85380'
          },
          {
            'pattern':'L. W',
            'count':'49370',
            'distinctCount':'47190'
          }
        ],
        'masking':[
          {
            'mask':'L. LLLLLL',
            'count':'11253',
            'percentage':'8.08'
          },
          {
            'mask':'L. LLLLLLL',
            'count':'11001',
            'percentage':'7.9'
          },
          {
            'mask':'L. LLLLLLLL',
            'count':'7639',
            'percentage':'5.48'
          }
        ],
        'business_type':[                   //contains results of business rules evaluation. Includes all matches above given threshold
          {
            'type':'First Names',           //name of the 'type', expressed in business language
            'ruleid':'213123sada1312',      //id of rule/expression/whatever used to evalute this rule
            'probability':'94.3123'         //expreses confidence of cooltool
          },
          {
            'type':'Car brands',
            'ruleid':'413das3421',
            'probability':'15.232'
          }
        ]
    },
    {
        'data_type':'integer',  //standard java type
        'label':'src_name',                 //name of the element. Sometimes parse from data, sometimes generated. Every element should have label
        'eid':'1234567890_asd1231252',      //gid + element id. Every element of every document should have unique ID for rerferences. We want to link together documents with same elements, etc.
        'parentId':'1234567890',            //for json/xml and maybe other purposes. Element can reference to its parent. Every element has at least one parent - the document
        'nullCount': {
          'null': 10000,
          'nonNull': 666
        },
        'patterns':[
          {
            'pattern':'W W',
            'count':'89940',
          'distinctCount':'85380'
          },
          {
            'pattern':'L. W',
            'count':'49370',
            'distinctCount':'47190'
          }
        ],
        'masking':[
          {
            'mask':'L. LLLLLL',
            'count':'11253',
            'percentage':'8.08'
          },
          {
            'mask':'L. LLLLLLL',
            'count':'11001',
            'percentage':'7.9'
          },
          {
            'mask':'L. LLLLLLLL',
            'count':'7639',
            'percentage':'5.48'
          }
        ],
        'business_type':[                   //contains results of business rules evaluation. Includes all matches above given threshold
          {
            'type':'First Names',           //name of the 'type', expressed in business language
            'ruleid':'213123sada1312',      //id of rule/expression/whatever used to evalute this rule
            'probability':'94.3123'         //expreses confidence of cooltool
          },
          {
            'type':'Car brands',
            'ruleid':'413das3421',
            'probability':'15.232'
          }
        ]
    },
    {
        'data_type':'integer',  //standard java type
        'label':'src_name',                 //name of the element. Sometimes parse from data, sometimes generated. Every element should have label
        'eid':'1234567890_asd1231252',      //gid + element id. Every element of every document should have unique ID for rerferences. We want to link together documents with same elements, etc.
        'parentId':'1234567890',            //for json/xml and maybe other purposes. Element can reference to its parent. Every element has at least one parent - the document
        'nullCount': {
          'null': 10000,
          'nonNull': 666
        },
        'patterns':[
          {
            'pattern':'W W',
            'count':'89940',
          'distinctCount':'85380'
          },
          {
            'pattern':'L. W',
            'count':'49370',
            'distinctCount':'47190'
          }
        ],
        'masking':[
          {
            'mask':'L. LLLLLL',
            'count':'11253',
            'percentage':'8.08'
          },
          {
            'mask':'L. LLLLLLL',
            'count':'11001',
            'percentage':'7.9'
          },
          {
            'mask':'L. LLLLLLLL',
            'count':'7639',
            'percentage':'5.48'
          }
        ],
        'business_type':[                   //contains results of business rules evaluation. Includes all matches above given threshold
          {
            'type':'First Names',           //name of the 'type', expressed in business language
            'ruleid':'213123sada1312',      //id of rule/expression/whatever used to evalute this rule
            'probability':'94.3123'         //expreses confidence of cooltool
          },
          {
            'type':'Car brands',
            'ruleid':'413das3421',
            'probability':'15.232'
          }
        ]
    },
    {
        'data_type':'integer',  //standard java type
        'label':'src_name',                 //name of the element. Sometimes parse from data, sometimes generated. Every element should have label
        'eid':'1234567890_asd1231252',      //gid + element id. Every element of every document should have unique ID for rerferences. We want to link together documents with same elements, etc.
        'parentId':'1234567890',            //for json/xml and maybe other purposes. Element can reference to its parent. Every element has at least one parent - the document
        'nullCount': {
          'null': 10000,
          'nonNull': 666
        },
        'patterns':[
          {
            'pattern':'W W',
            'count':'89940',
          'distinctCount':'85380'
          },
          {
            'pattern':'L. W',
            'count':'49370',
            'distinctCount':'47190'
          }
        ],
        'masking':[
          {
            'mask':'L. LLLLLL',
            'count':'11253',
            'percentage':'8.08'
          },
          {
            'mask':'L. LLLLLLL',
            'count':'11001',
            'percentage':'7.9'
          },
          {
            'mask':'L. LLLLLLLL',
            'count':'7639',
            'percentage':'5.48'
          }
        ],
        'business_type':[                   //contains results of business rules evaluation. Includes all matches above given threshold
          {
            'type':'First Names',           //name of the 'type', expressed in business language
            'ruleid':'213123sada1312',      //id of rule/expression/whatever used to evalute this rule
            'probability':'94.3123'         //expreses confidence of cooltool
          },
          {
            'type':'Car brands',
            'ruleid':'413das3421',
            'probability':'15.232'
          }
        ]
    },
    {
        'data_type':'integer',  //standard java type
        'label':'src_name',                 //name of the element. Sometimes parse from data, sometimes generated. Every element should have label
        'eid':'1234567890_asd1231252',      //gid + element id. Every element of every document should have unique ID for rerferences. We want to link together documents with same elements, etc.
        'parentId':'1234567890',            //for json/xml and maybe other purposes. Element can reference to its parent. Every element has at least one parent - the document
        'nullCount': {
          'null': 10000,
          'nonNull': 666
        },
        'patterns':[
          {
            'pattern':'W W',
            'count':'89940',
          'distinctCount':'85380'
          },
          {
            'pattern':'L. W',
            'count':'49370',
            'distinctCount':'47190'
          }
        ],
        'masking':[
          {
            'mask':'L. LLLLLL',
            'count':'11253',
            'percentage':'8.08'
          },
          {
            'mask':'L. LLLLLLL',
            'count':'11001',
            'percentage':'7.9'
          },
          {
            'mask':'L. LLLLLLLL',
            'count':'7639',
            'percentage':'5.48'
          }
        ],
        'business_type':[                   //contains results of business rules evaluation. Includes all matches above given threshold
          {
            'type':'First Names',           //name of the 'type', expressed in business language
            'ruleid':'213123sada1312',      //id of rule/expression/whatever used to evalute this rule
            'probability':'94.3123'         //expreses confidence of cooltool
          },
          {
            'type':'Car brands',
            'ruleid':'413das3421',
            'probability':'15.232'
          }
        ]
    }
  ]
}

}
];

var input = [{
      id: 1,
      slug: 'some-article',
      title: 'Some Article',
      isFavorite: false,
      type: {id: 'or'}
    },
    {
      id: 3,
      slug: 'some-article3',
      title: 'Some Article3',
      isFavorite: false,
      type: {id: 'and'}
    },
    {
      id: 5,
      slug: 'some-article5',
      title: 'Some Article5',
      isFavorite: false,
      type: {id: 'and'}
    }
    ];


/*
const article = new Schema('articles', {idAttribute: 'slug'});
const type = new Schema('types');

article.define({type: type});




console.log(normalize(input,arrayOf(article)));              */