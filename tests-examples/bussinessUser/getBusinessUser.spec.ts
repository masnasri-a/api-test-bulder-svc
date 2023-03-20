import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint businessUser getBusinessUser', () => {
    const auth = process.env.AUTH!
    const expectKeyResult = ['id', 'businessUserId', 'businessPartnerId', 'name', 'email', 'phoneNumber', 'userType']
    test('1 - getBusinessUser without auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/businessUser/getBusinessUser');
        expect.soft(Issues.status()).toBe(401);

    });

    test('1 - getBusinessUser with auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/businessUser/getBusinessUser', { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
    });
});
