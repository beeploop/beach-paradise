class tokenLifetime {
    constructor() {
        this.startTime = Date.now()
        this.DELAY = 1000 * 60 * 60 * 24
    }

    printLifetime() {
        console.log('this is a new lifetime')
        console.log('born in: ', this.startTime)
        console.log(`reservation will expire in ${this.DELAY} if not confirmed`)
    }

    async countLife() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.printLifetime()
                const timeOfDeath = Date.now() - this.startTime
                console.log(
                    `died after ${Math.floor(timeOfDeath / 1000)} seconds`
                )
                return resolve(true)
            }, this.DELAY)
        })
    }
}

module.exports = {
    tokenLifetime,
}
