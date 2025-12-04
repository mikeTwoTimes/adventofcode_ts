import * as fs from "fs";

type Range = {
    first: number;
    last: number;
};

function parse(input: string): Range[] {
    return input
        .trimEnd()
        .split(",")
        .map((field): Range => {
            const [a, b] = field.split("-").map(Number) as [number, number];
            return { first: a, last: b };
        });
}

function skipPower(power: number): number {
    return Math.pow(10, power) + Math.pow(10, Math.floor((power - 1) / 2));
}

function maxOfPower(power: number): number {
    return Math.pow(10, power) - 1;
}

function invalidMultOfPower(power: number): number {
    return Math.pow(10, Math.floor(power / 2)) + 1;
}

function find(range: Range): number {
    let power = Math.floor(Math.log10(range.first)) + 1;
    let next = 0;
    let curr = 0;
    let max = 0;
    let sum = 0;

    if (power % 2 !== 0) {
        curr = skipPower(power);
        power++;
        next = invalidMultOfPower(power);
        max = maxOfPower(power);
    } else {
        next = invalidMultOfPower(power);
        curr = next * Math.ceil(range.first / next);
        max = maxOfPower(power);
    }

    while (curr <= range.last) {
        sum += curr;
        curr += next;

        if (curr > max) {
            power++;
            curr = skipPower(power);
            power++;
            next = invalidMultOfPower(power);
            max = maxOfPower(power);
        }
    }

    return sum;
}

function solve(ranges: Range[]): number {
    let ans = 0;

    for (const range of ranges) {
        ans += find(range);
    }

    return ans;
}

const ranges = parse(fs.readFileSync(process.argv[2]!, "utf8"));
const answer = solve(ranges);

console.log("Answer:", answer);
