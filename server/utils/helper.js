function computePrice(checkin, checkout, roomRate) {
    const start = new Date(checkin)
    const end = new Date(checkout)
    const timeDifference = end.getTime() - start.getTime()
    const days = Math.ceil(timeDifference / (1000 * 3600 * 24))
    const rate = Number(roomRate)

    if (days < 1) {
        return rate
    }
    return rate * days
}

function validateAdultsAndKids({ adults, kids }) {
    this.adults = 1
    this.kids = 0

    parseInt(adults) < 1
        ? (this.adults = 1)
        : parseInt(adults) > 1
            ? (this.adults = parseInt(adults))
            : (this.adults = 1)

    parseInt(kids) < 0
        ? (this.kids = 0)
        : parseInt(kids) > 0
            ? (this.kids = parseInt(kids))
            : this.kids

    return { adults: this.adults, kids: this.kids }
}

module.exports = {
    computePrice,
    validateAdultsAndKids,
}
