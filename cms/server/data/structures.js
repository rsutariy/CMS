const mongoCollections = require("../config/mongoCollections");
const structures = mongoCollections.structures;

const users=mongoCollections.users;
const uuid = require('uuid/v4');

let exportedMethods = {
    getAllStructures() {
        return structures().then((structuresCollection) => {
            return structuresCollection.find({}).project({ _id: 1, name: 1, slug:1, description:1, pagesize:1, fields:1 }).toArray()
        });
    },
    
    getStructureBySlug(slug) {
        if(typeof slug !== "string") return Promise.reject("No Slug provided");

        return structures().then((structuresCollection) => {
            return structuresCollection.findOne({slug: slug}).then((structure) => {
                if(!structure) throw("Structure not found");
                return structure;
            });
        });  
    },

    getStructureByID(id) {
        if(!id) return Promise.reject("No ID provided");
        return structures().then((structureCollection) => {
            return structureCollection.findOne({_id: id}).then((structure) => {
                if(!structure) throw("Structure not found");
                return structure;
            });
        });  
    },

    getAllEntriesByStructureSlugName(slug){
        return structures().then((structuresCollection) => {
            return structuresCollection.findOne({ slug: slug }).then((entry) => {
                if (!entry) throw "Entry not found";
                let result = entry.entries;
                return result;
            });
        });
    },

    addStructure(name, slug, description, pagesize, fields) {
        return structures().then((structuresCollection) => {
            return structuresCollection.findOne({slug:slug}).then((existingInformation)=>{
                if(existingInformation)
                    throw("Structure with slug is already inserted");
                else
                {
                    let newStructure = {
                        _id: uuid(),
                        name: name,
                        slug: slug,
                        description: description,
                        pagesize:pagesize,
                        entries:[],
                        fields: fields
                    };
                   
                    return structuresCollection.insertOne(newStructure).then((newInsertInformation) => { 
                        return newInsertInformation.insertedId;

                    }).then((newId) => {
                        return this.getStructureByID(newId);
                    });
                }
            }); 
        });
    },

    editStructure(name, slug, description, pagesize, fields) {
        return this.getStructureBySlug(slug).then((currentStructure) => {
            let updatedStructure = {
                name: name,
                slug: currentStructure.slug,
                description: description,
                pagesize:pagesize,
                entries:[],
                fields: fields
            };
            return structures().then((structuresCollection) => {
                return structuresCollection.updateOne({ slug: slug }, updatedStructure).then(() => {
                    return this.getStructureBySlug(slug);
                });
            });
        });
    },

    deleteStructure(slug) {
        return structures().then((structuresCollection) => {
            return structuresCollection.removeOne({ slug: slug }).then((deletionInfo) => {
                
            });
        });
    },
    
    addStructureEntries(structure_slug,title,slug,url, blurb,author,created_date,comments) {
        return structures().then((structuresCollection) => {
            entryID = uuid()
            let newEntryObject = {
                _id: entryID,
                title: title,
                slug:slug,
                url:url,
                blurb:blurb,
                author:author,
                created_date:new Date(),
                comments:[]
            };

            return structuresCollection.updateOne({ slug: structure_slug }, { $push: { "entries": newEntryObject } }).then(function () {
            });
        });
    },

    editStructureEntries(structure_slug,title,slug,url, blurb,author,created_date,comments) {
        return structures().then((structuresCollection) => {
            entryID = uuid()
            let newEntryObject = {
                _id: entryID,
                title: title,
                slug:slug,
                url:url,
                blurb:blurb,
                author:author,
                created_date:new Date(),
                comments:[]
            };

            return structuresCollection.updateOne({ slug: structure_slug }, { $push: { "entries": newEntryObject } }).then(function () {
            });
        });
    },

    

    // getEntryByEntryID(id) {
    //     id = String(id);
    //     return structures().then((structuresCollection) => {
    //         return structuresCollection.findOne({ $where: "this.entries._id = '" + id + "'" }).then((structure) => {
    //             if (!structure) throw "Structure_Entry not found";
    //             let result = structure.entries.filter(function (obj) {
    //                 return obj._id == id;
    //             })[0];
    //             return result;
    //         });
    //     });
    // },

    getEntryByEntrySlugName(slug) {
        return structures().then((structuresCollection) => {
            return structuresCollection.findOne({ $where: "this.entries.slug = '" + slug + "'" }).then((structure) => {
                if (!structure) throw "Structure_Entry not found";
                
                let result = structure.entries.filter(function (obj) {
                    return obj.slug == slug;
                })[0];
               // console.log(result);
                return result;
            });
        });
    },
 
}

module.exports = exportedMethods;


// exportedMethods.getAllStructures().then(function (data) {
//     console.log(data);
// });

// let fields=
// [{ label: 'Name', type: 'small-text-input', number: 1 },
// { label: 'Number', type: 'number-input', number: 2 },
// { label: 'CheckBox', type: 'checkbox', number: 3 }];

// exportedMethods.addStructure("Struct1", "st1", "Structure 1", 10, fields).then(function(data){
//     console.log(data);
// });

// let fields=
// [{ label: 'Text Area', type: 'text-area', number: 1 },
// { label: 'Link', type: 'link', number: 2 }];


// exportedMethods.addStructure("Struct2", "st2", "Structure 2", 5,fields).then(function(data){
//     console.log(data);
// });

// let fields=
// [{ label: 'Name', type: 'small-text-input', number: 1 },
// { label: 'Number', type: 'number-input', number: 2 },
// { label: 'CheckBox', type: 'checkbox', number: 3 }];

// exportedMethods.addStructure("Struct3", "st3", "Structure 3", 6,fields).then(function(data){
//     console.log(data);
// });

// let fields=
// [{ label: 'Text Area', type: 'text-area', number: 1 },
// { label: 'Link', type: 'link', number: 2 }];

// exportedMethods.addStructure("Struct4", "st4", "Structure 4 ", 6, fields).then(function(data){
//     console.log(data);
// });

// exportedMethods.deleteStructure("st4");

// // 

// exportedMethods.addStructureEntries("st1","Struct1: Entry1","st1entry1", "Structure 1 In Entry 1","Test1").then(function(data){
//     //console.log(data);
// });

// exportedMethods.addStructureEntries("st1","Struct1: Entry2","st1entry2", "Structure 1 In Entry 2","Test2").then(function(data){
//     //console.log(data);
// });

// exportedMethods.addStructureEntries("st2","Struct2: Entry1","st2entry1", "Structure 2 In Entry 1","Test1").then(function(data){
//     //console.log(data);
// });

// exportedMethods.addStructureEntries("st2","Struct2: Entry2","st2entry2", "Structure 2 In Entry 2","Test2").then(function(data){
//     //console.log(data);
// });
// exportedMethods.addStructureEntries("st2","Struct2: Entry3","st2entry3", "Structure 2 In Entry 3","Test3").then(function(data){
//     //console.log(data);
// });

// exportedMethods.addStructureEntries("st3","Struct3: Entry1","st3entry1", "Structure 3 In Entry 1","Test1").then(function(data){
//     //console.log(data);
// });



// exportedMethods.editStructure("st4",data)





