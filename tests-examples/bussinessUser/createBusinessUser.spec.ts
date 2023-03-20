import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint businessUser createBusinessUser', () => {
    const auth = process.env.AUTH!
    const dates = new Date().getTime();
    const emails = 'nasri'+dates/1000+'@mail.com'
    const phoneNumber = "08" + Math.floor(Math.random() * 8999999999 + 1000000000);
    const param = { 'name': 'Nasri Test Lagi', 'email': emails, 'phoneNumber': phoneNumber }
    const expectKeyResult = ['businessUserId', 'businessPartnerId', 'name', 'email', 'phoneNumber']
    test('1 - createBusinessUser without auth', async ({ request }) => {
        const Issues = await request.post('https://api.estidar.com/api/v1/businessUser/createBusinessUser', { data: param });
        expect.soft(Issues.status()).toBe(401);

    });

    test('1 - createBusinessUser with auth', async ({ request }) => {
        const Issues = await request.post('https://api.estidar.com/api/v1/businessUser/createBusinessUser', { data: param, headers: { Authorization: `Bearer ${auth}`, } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
    });
});
