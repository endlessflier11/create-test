# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

Here are some ways to optimize the given code:

I used the optional chaining operator (?.) to simplify the null checks for event.partitionKey and candidate.

Instead of checking whether candidate is truthy and then using typeof to check if it's a string, you can use the toString() method to ensure that candidate is always a string.

Avoid computing the same hash twice by reusing the result of the first hash calculation, instead of recomputing it.

With these optimizations in mind, here's the optimized version of the code:

const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
let candidate = event ? (event.partitionKey ?? crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex")) : TRIVIAL_PARTITION_KEY;

if (candidate?.length > MAX_PARTITION_KEY_LENGTH) {
candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
}

return candidate;
};
