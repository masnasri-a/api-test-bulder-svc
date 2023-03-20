import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint chats listMessageHistory', () => {
    const auth = process.env.AUTH!
    const expectKeyResult = ['items', 'lastKey']
    test('1 - listMessageHistory without auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/chats/listMessageHistory?roomName=I_102_C_216&lastId=I_102_C_216&messageCount=10&lastSortkey=2023-03-02T07:36:48.441Z%23leqsmptm');
        expect.soft(Issues.status()).toBe(401);

    });

    test('2 - listMessageHistory with auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/chats/listMessageHistory?roomName=I_102_C_216&lastId=I_102_C_216&messageCount=10&lastSortkey=2023-03-02T07:36:48.441Z%23leqsmptm', { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
    });
});
