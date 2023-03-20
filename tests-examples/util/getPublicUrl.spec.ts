import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint util getPublicUrl', () => {
    const auth = process.env.AUTH!
    test('1 - getPublicUrl without auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/util/getPublicUrl?key=cat-1.jpeg');
        expect.soft(Issues.status()).toBe(200);
    });

    test('2 - getPublicUrl with auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/util/getPublicUrl?key=cat-1.jpeg', { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
    });
});
