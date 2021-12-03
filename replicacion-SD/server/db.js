const mongoose = require("mongoose");

module.exports = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(
            "mongodb+srv://sdproyect1:sdproyect1@cluster0.osxht.mongodb.net/todo-app",
            connectionParams
        );
        console.log("Conectado a la base.");
    } catch (error) {
        console.log("No se pud conectar a la base.", error);
    }
};
