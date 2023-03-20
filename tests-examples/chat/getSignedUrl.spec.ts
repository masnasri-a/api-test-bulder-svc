import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint chats getSignedUrl', () => {
    const auth = process.env.AUTH!
    test('1 - getSignedUrl without auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/chats/getSignedUrl?key=I_191_C_184/chat-80b81a5gl.jpeg');
        expect.soft(Issues.status()).toBe(401);

    });

    test('2 - getSignedUrl with auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/chats/getSignedUrl?key=I_191_C_184/chat-80b81a5gl.jpeg', { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
    });
});
