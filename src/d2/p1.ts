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

function find(range: Range): number {
    let n = Math.floor(Math.log10(range.first)) + 1;
    let m = 0;
    let x = 0;
    let max = 0;
    let sum = 0;

    if (n % 2 !== 0) {
        x = Math.pow(10, n) + Math.pow(10, Math.floor((n - 1) / 2));
        n++;
        m = Math.pow(10, Math.floor(n / 2)) + 1;
        max = Math.pow(10, n);
    } else {
        m = Math.pow(10, Math.floor(n / 2)) + 1;
        x = m * Math.ceil(range.first / m);
        max = Math.pow(10, n);

        if (x >= max) {
            n++;
            x = Math.pow(10, n) + Math.pow(10, Math.floor((n - 1) / 2));
            n++;
            m = Math.pow(10, Math.floor(n / 2)) + 1;
            max = Math.pow(10, n);
        }
    }

    while (x <= range.last) {
        sum += x;
        x += m;

        if (x >= max) {
            n++;
            x = Math.pow(10, n) + Math.pow(10, Math.floor((n - 1) / 2));
            n++;
            m = Math.pow(10, Math.floor(n / 2)) + 1;
            max = Math.pow(10, n);
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
