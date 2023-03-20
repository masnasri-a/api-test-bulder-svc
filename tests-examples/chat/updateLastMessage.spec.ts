import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint chats updateLastMessage', () => {
    const auth = process.env.AUTH!
    const param = { 'lastMessage': 'hello', 'messageType': 'text', 'lastMessageTimeInMillis': 122, 'influencerId': 102, 'campaignId': 216 }
    const expectKeyResult = ['lastMessage', 'messageType', 'lastMessageTimeInMillis', 'campaignId']
    test('1 - updateLastMessage without auth', async ({ request }) => {
        const Issues = await request.post('https://api.estidar.com/api/v1/chats/updateLastMessage', { data: param });
        expect.soft(Issues.status()).toBe(200);

    });

    test('2 - updateLastMessage with auth', async ({ request }) => {
        const Issues = await request.post('https://api.estidar.com/api/v1/chats/updateLastMessage', { data: param, headers: { Authorization: `Bearer ${auth}`, } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
    });
});
