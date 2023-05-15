import { findHighestBid, getRelativeTime } from "./utils";

test("Returns highest value number when passed an array of objects with a price attribute.", () => {
    expect(findHighestBid([{price:32.5}, {price:32.4}, {price:1119.29}, {price:1119.28}, {price:1112}, {price:222.5}, {price:1119.2}])).toBe('$1119.29');
})

test("Returns 0 if passed an empty array.", () => {
    expect(findHighestBid([])).toBe("No Bids Available");
})

test("Returns 0 if improper array format is passed.", () => {
    expect(findHighestBid([1, 2, 3, 4])).toBe("No Bids Available");
})

test("Returns `Ended` when a the end date is after current date.", () => {
    expect(getRelativeTime(new Date(Date.now() - 86400000), new Date(Date.now()))).toBe("Ended")
})

test("Returns `1 Day 3 Hours 47 Minutes` when there is a difference of 100000000 milliseconds between two dates.", () => {
    expect(getRelativeTime(new Date(Date.now() + 100000000), new Date(Date.now()))).toBe("1 Day 3 Hours 47 Minutes")
}) 
