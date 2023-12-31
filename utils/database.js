import mongoose from 'mongoose'

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    let isConnected = false
    if (isConnected) {
        console.log('MongoDB is connected')
    } else {

        try {
            const db = mongoose.connect(process.env.MONGODB_URI, {
                dbName: 'recipe_rush',
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }).then(() => {
                console.log('MongoDB Connected...')
            })

        } catch (error) {
            console.log(error)
        }

        isConnected = true
    }
}


