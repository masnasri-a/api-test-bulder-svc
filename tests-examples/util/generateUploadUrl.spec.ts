import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint util generateUploadUrl', () => {
    const auth = process.env.AUTH!
    const param = { 'fileKey': 'temporary/cat-2.jpeg', 'contentType': 'image/jpeg' }
    test('1 - generateUploadUrl without auth', async ({ request }) => {
        const Issues = await request.post('https://api.estidar.com/api/v1/util/generateUploadUrl', { data: param });
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - generateUploadUrl with auth', async ({ request }) => {
        const Issues = await request.post('https://api.estidar.com/api/v1/util/generateUploadUrl', { data: param, headers: { Authorization: `Bearer ${auth}`, } });
        expect.soft(Issues.ok()).toBeTruthy();
    });
});
