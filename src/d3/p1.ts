import * as fs from "fs";

function solve(input: string[]): number {
    let answer = 0;

    for (const banks of input) {
        let left = '';
        let right = '';
        let k = 0;

        for (let i = 0; i < banks.length - 1; i++) {
            if (banks[i] > left) {
                left = banks[i];
                k = i;
            }
        }

        for (let j = banks.length - 1; j > k; j--) {
            if (banks[j] > right) {
                right = banks[j];
            }
        }

        answer += parseInt(left + right);
    }

    return answer;
}

const input = fs.readFileSync(process.argv[2], "utf8").trimEnd().split("\n");
const answer = solve(input);

console.log("Answer:", answer);
