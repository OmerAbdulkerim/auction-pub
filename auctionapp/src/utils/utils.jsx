const findHighestBid = (bids, product = {}) => {
    if (bids.length === 0) return '$'.concat(product.price);

    const maxRes = bids.map(bid => bid.price).reduce((bidA, bidB) => {
        return Math.max(bidA, bidB);
    })

    return isNaN(maxRes) ? "No Bids Available" : `$${maxRes}`;
};

const getRelativeTime = (d1, d2 = new Date()) => {
    const diffMs = Date.parse(d1) - d2;

    if (diffMs < 0 || d1 < d2) return "Ended";
    
    let diffDays = Math.floor(diffMs / 86400000);
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

    
    const daysString = diffDays < 1 ? '' : (diffDays + ((diffDays > 1 && diffDays % 10 !== 1)? " Days " : " Day "));
    const hoursString = diffHrs < 1 ? '' : (diffHrs + ((diffHrs > 1 && diffHrs % 10 !== 1) ? " Hours " : " Hour "));
    const minsString = diffMins < 1 ? '' : (diffMins + ((diffMins > 10 && diffMins % 10 !== 1) ? " Minutes" : " Minute"));
        
    return (daysString + hoursString + minsString);
}

const isAuctionOngoing = (startDate, endDate, now = new Date()) => {
    const diffMs = Date.parse(endDate) - now;
    const diffMsStart = Date.parse(startDate) - now;
        
    return !(diffMs < 0 || endDate < now || startDate > now || diffMsStart > 0);
}


const extractDate = (bids) => {
    const newBids = bids.map(el => {
        const newDate = new Date(el.createdAt);
        const newDateString = newDate.toLocaleString('en-UK', {day: 'numeric', month: 'long', year: 'numeric'})
        return {...el, createdAt: newDateString}
    }) 
    return newBids;
}

const hasBid = (id, bids) => {
    if (bids.length === 0) return false;
    const has = bids.filter(el => el.userId === id)[0];
    return has.length !== 0;
}

const decodeJWT = (jwtToken) => {
    if (jwtToken) {
        const base64Url = jwtToken.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split("")
                .map((el) => {
                    return (
                        "%" + ("00" + el.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );
        return JSON.parse(jsonPayload);
    } return null;
}

export {
    findHighestBid,
    getRelativeTime,
    extractDate,
    hasBid,
    isAuctionOngoing,
    decodeJWT
};
