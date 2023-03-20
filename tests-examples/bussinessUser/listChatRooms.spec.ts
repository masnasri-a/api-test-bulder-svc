import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint businessUser listChatRooms', () => {
    const auth = process.env.AUTH!
    test('1 - listChatRooms without auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/businessUser/listChatRooms');
        expect.soft(Issues.status()).toBe(401);

    });

    test('1 - listChatRooms with auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/businessUser/listChatRooms', { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
    });
});
