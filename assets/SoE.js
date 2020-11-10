function SoE(num) {
    // Sieve of Eratosthenes algorithm to find all primes under num
    const sieve = []
    const upperLimit = Math.sqrt(num)
    const primes = [];

    // Make an array from 0 to num
    for (let i = 0; i < num; i++) {
        sieve.push(true);
    }

    // Remove multiples of primes starting from 2, 3, 5,...
    for (let i = 2; i <= upperLimit; i++) {
        if (sieve[i]) {
            for (let j = i * i; j < num; j += i) {
                sieve[j] = false;
            }
        }
    }

    // All sieve[i] set to true are primes
    for (let i = 2; i < num; i++) {
        if(sieve[i]) {
            primes.push(i);
        }
    }

    return primes;
};