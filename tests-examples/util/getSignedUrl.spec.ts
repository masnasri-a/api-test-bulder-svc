import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint util getSignedUrl', () => {
    const auth = process.env.AUTH!

    test('1 - getSignedUrl without auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/util/getSignedUrl?key=temporary/cat-2.jpeg');
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - getSignedUrl with auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/util/getSignedUrl?key=temporary/cat-2.jpeg', { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
    });
});
