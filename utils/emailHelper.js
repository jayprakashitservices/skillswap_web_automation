const { getEmailVerifyToken } = require('./mongoDBHelper');

async function verifyEmailWithRetry(page, email, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {

        const token = await getEmailVerifyToken(email);

        if (!token) {
            await page.waitForTimeout(2000);
            continue;
        }

        await page.goto(`${process.env.BASE_URL}/verify-email?token=${token}`);

        // ✅ Success check
        if (page.url().includes('/client/company-size')) {
            return true;
        }

        // ❌ Error check
        const isInvalid = await page.getByText(/invalid or expired token/i)
            .isVisible()
            .catch(() => false);

        if (isInvalid) {
            console.log(`Retry ${i + 1}: Token invalid, retrying... - emailHelper.js:26`);
            await page.waitForTimeout(2000);
        } else {
            return true;
        }
    }

    throw new Error('Email verification failed after retries');
}

module.exports = { verifyEmailWithRetry };