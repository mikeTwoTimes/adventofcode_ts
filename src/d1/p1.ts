import fs from "fs"

function solve(input: string): number {
    const lines = input.trim().split("\n");
    let pos = 50;
    let ans = 0;

    for (const line of lines) {
        const num = Number(line.slice(1));

        if ((line[0]!) === "L") {
            pos -= num;
        } else {
            pos += num;
        }

        if (pos < 0 || pos > 99) {
            pos %= 100;
        }

        if (pos === 0) {
            ans++;
        }
    }

    return ans;
}

const answer = solve(fs.readFileSync(process.argv[2]!, "utf8"));

console.log(answer);
