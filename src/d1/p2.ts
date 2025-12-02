function solve(path: string): number {
    const fs = require("fs");
    const lines = fs.readFileSync(path, "utf8").trim().split("\n");
    let pos = 50;
    let ans = 0;

    for (const line of lines) {
        const num = Number(line.slice(1));
        let curr = 0;

        if ((line[0]!) === "L") {
            curr = pos - num;
        } else {
            curr = pos + num;
        }

        if (pos > 0 && curr <= 0) {
            ans++;
        }

        if (curr < 0) {
            ans += Math.floor(-curr / 100);
            pos = 100 - (-curr % 100);
        } else {
            ans += Math.floor(curr / 100);
            pos = curr % 100;
        }

        if (pos === 100) {
            pos = 0;
        }
    }

    return ans;
}

const answer = solve(process.argv[2]!);

console.log(answer);
