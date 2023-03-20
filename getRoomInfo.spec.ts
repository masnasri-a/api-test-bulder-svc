import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint chats getRoomInfo', () => {
    const auth = process.env.AUTH!
    const expectKeyResult = ['businessUserId', 'businessPartnerId', 'name', 'email']
    test('1 - getRoomInfo without auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/chats/getRoomInfo');
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(Issues.json())).toEqual(expectKeyResult);
    });

    test('1 - getRoomInfo with auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/chats/getRoomInfo', { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(Issues.json())).toEqual(expectKeyResult);
    });
});
