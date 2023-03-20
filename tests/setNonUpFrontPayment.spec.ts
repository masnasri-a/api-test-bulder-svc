import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint campaign setNonUpFrontPayment', () => {
    const auth = process.env.AUTH!
    const param = {}
    const expectKeyResult = ['campaignId', 'status']
    test('1 - setNonUpFrontPayment without auth', async ({ request }) => {
        const Issues = await request.put('https://api.estidar.com/api/v1/campaign/setNonUpFrontPayment?campaignId=208', { data: param });
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - setNonUpFrontPayment with auth', async ({ request }) => {
        const Issues = await request.put('https://api.estidar.com/api/v1/campaign/setNonUpFrontPayment?campaignId=208', { data: param, headers: { Authorization: `Bearer ${auth}`, } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
    });
});
