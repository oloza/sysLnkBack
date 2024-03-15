const{Schema,model} = require('mongoose');

const linkSchema=new Schema({
    nombre: String,
    url:    String,
    ambiente:{tipo:String,
             descripcion:String},
    fecha_alta:Date,
    fecha_modificacion:Date,
    fecha_baja:Date
})

module.exports=model('direccion_url',linkSchema);