import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint chats generateUploadUrl', () => {
    const auth = process.env.AUTH!
    const param = { 'roomName': 'I_102_C_216', 'fileExtension': 'jpeg' }
    const expectKeyResult = ['uploadUrl', 'fileKey']
    test('1 - generateUploadUrl without auth', async ({ request }) => {
        const Issues = await request.post('https://api.estidar.com/api/v1/chats/generateUploadUrl', { data: param });
        expect.soft(Issues.status()).toBe(200);

    });

    test('2 - generateUploadUrl with auth', async ({ request }) => {
        const Issues = await request.post('https://api.estidar.com/api/v1/chats/generateUploadUrl', { data: param, headers: { Authorization: `Bearer ${auth}`, } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
    });
});
