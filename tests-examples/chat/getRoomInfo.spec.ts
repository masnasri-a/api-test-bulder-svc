import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint chats getRoomInfo', () => {
    const auth = process.env.AUTH!
    const expectKeyResult = ['id', 'status']
    test('1 - getRoomInfo without auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/chats/getRoomInfo?roomName=I_102_C_216');
        expect.soft(Issues.status()).toBe(200);

    });

    test('2 - getRoomInfo with auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/chats/getRoomInfo?roomName=I_102_C_216', { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
    });
});
