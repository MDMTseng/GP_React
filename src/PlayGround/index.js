/*
export {default as PromiseMess} from './PromiseMess';
export {default as func} from './func';*/

//import PromiseMess from './PromiseMess';
/*import func from './func';*/
//import Redux_ from './redux/redux';



import {Validator} from 'jsonschema';
console.log(Validator);


var v = new Validator();
var instance1 = [
    {
        "id": 2,
        "name": "An ice sculpture",
        "price": 12.50,
        "tags": ["cold", "ice"],
        "dimensions": {
            "length": 7.0,
            "width": 12.0,
            "height": 9.5
        },
        "warehouseLocation": {
            "latitude": -78.75,
            "longitude": 20.4
        }
    },
    {
        "id": 3,
        "name": "A blue mouse",
        "price": 25.50,
        "tags": ["cold"],
        "dimensions": {
            "length": 3.1,
            "width": 1.0,
            "height": 1.0
        },
        "warehouseLocation": {
            "latitude": 54.4,
            "longitude": -32.7
        }
    }
];

let schema_dimensions={
    "type": "object",
    "properties": {
        "length": {"type": "number"},
        "width": {"type": "number"},
        "height": {"type": "number"}
    },
}
let schema_price={
    "type": "number",
    "minimum": 0,
    "exclusiveMinimum": true
}
let schema_tags={
    "type": "array",
    "items": {
        "type": "string"
    },
    "minItems":2,
    "uniqueItems": true
}
var schema = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "id": {
                "type": "number"
            },
            "name": {
                "type": "string"
            },
            "price": schema_price,
            "tags": schema_tags,
            "dimensions": schema_dimensions,
            "warehouseLocation": {
            }
        },
        "required": ["id", "name", "price","warehouseLocation"]
    }
};
console.log(v.validate(instance1, schema));
