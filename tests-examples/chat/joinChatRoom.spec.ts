import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint chats joinChatRoom', () => {
    const auth = process.env.AUTH!
    const expectKeyResult = ['token', 'userId', 'userProfileImage', 'roomId', 'roomName', 'lastMessages', 'roomStatus', 'messageLastKey', 'subCampaignCount', 'userProfileUrl']
    test('1 - joinChatRoom without auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/chats/joinChatRoom?roomName=I_69_C_140&userName=nasri adzlani');
        expect.soft(Issues.status()).toBe(401);
    });

    test('1 - joinChatRoom with auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/chats/joinChatRoom?roomName=I_69_C_140&userName=nasri adzlani', { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
    });
});
