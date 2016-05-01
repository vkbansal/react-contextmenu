module.exports.toAttributeArray = function(attributes){

    var attributeArray = [];
    for(var key in attributes){
        if(attributes.hasOwnProperty(key)){
            attributeArray[key] = attributes[key];
        }
    }
    return attributeArray;
};

module.exports.getClassNames = function(attributes){

    var classNames = "";
    for(var key in attributes){
        if(attributes.hasOwnProperty(key)){
            if(key == "className"){
                classNames = classNames + " " + attributes[key];
            }
        }
    }
    return classNames;
};