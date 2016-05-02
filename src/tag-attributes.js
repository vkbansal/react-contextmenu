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