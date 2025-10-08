/*** Created by Lawrencium_X on 10/7/2025.*/

var filesystem = require('fs');
var path = require('path');
var models = {};
var relationships = {};

var singleton = function singleton(){
    var Sequelize = require("sequelize");
    var sequelize = null;
    var modelsPath = "";

    this.setup = function (path, database, username, password, obj){
        modelsPath = path;

        sequelize = new Sequelize(database, username, password, obj);

        this.seqObj = sequelize;
        init();
    }

    this.model = function (name){
        return models[name];
    }

    this.Seq = function (){
        return Sequelize;
    }

    function init() {
        var models_path = path.join("models");
        filesystem.readdirSync(models_path).forEach(function(name){
            var object = require("./" + name);
            var options = object.options || {}
            var modelName = name.replace(/\.js$/i, "");
            models[modelName] = sequelize.define(modelName, object.model, options);

            if("relations" in object){
                relationships[modelName] = object.relations;
            }
        });

        for(var name in relationships){
            var relation = relationships[name];
            for(var i=0;i<relation.length;i++){
                var relationDetails = relation[i];
                for(var relName in relationDetails){
                    if(relName == "options")
                        continue;

                    var options = relationDetails["options"] ? relationDetails["options"] : {};
                    var related = relationDetails[relName];
                    models[name][relName](models[related], options);
                }
            }
        }

    }

    if(singleton.caller != singleton.getInstance){
        throw new Error("This object cannot be instantiated");
    }
}

singleton.instance = null;

singleton.getInstance = function(){
    if(this.instance === null){
        this.instance = new singleton();
    }
    return this.instance;
}

module.exports = singleton.getInstance();

