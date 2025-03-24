const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://satyamb971:KJjkxxZRNc2vGyrC@cluster0.sat7v.mongodb.net/"
          , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB Connected Successfully!");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB; // ✅ Export function correctly
