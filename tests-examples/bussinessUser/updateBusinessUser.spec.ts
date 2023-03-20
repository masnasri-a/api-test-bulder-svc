import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint businessUser updateBusinessUser', () => {
    const auth = process.env.AUTH!
    const param = { 'name': 'nasri adzlani' }
    const expectKeyResult = ['businessUserId', 'businessPartnerId', 'name', 'email', 'phoneNumber']
    test('1 - updateBusinessUser without auth', async ({ request }) => {
        const Issues = await request.put('https://api.estidar.com/api/v1/businessUser/updateBusinessUser?platformSource=ICE_WEBSITE', { data: param });
        expect.soft(Issues.status()).toBe(401);

    });

    test('1 - updateBusinessUser with auth', async ({ request }) => {
        const Issues = await request.put('https://api.estidar.com/api/v1/businessUser/updateBusinessUser?platformSource=ICE_WEBSITE', { data: param, headers: { Authorization: `Bearer ${auth}`, } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
    });
});
