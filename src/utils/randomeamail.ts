const letters = "abcd31fghijkl43mnoprstw1592"

export const random = {
    email(amount: number, prefixLength = 10): Array<string> {
        const postFixes = ["@hotmail.com", "@gmail.com", "@wp.pl", "yahoo.com"]
        const emails = new Array<string>()

        for (let i = 0; i <= amount; i++) {
            const postFix = postFixes[Math.ceil(Math.random()*3)]
            let preFix = ""

            while (preFix.length < prefixLength) {
                preFix += letters[Math.ceil(Math.random()*3)]
            }

            emails.push(preFix + postFix)
        }

        return emails
    }
}
