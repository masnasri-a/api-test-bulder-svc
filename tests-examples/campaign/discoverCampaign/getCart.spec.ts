import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint campaign getCart', () => {
    const auth = process.env.AUTH!

    const expectKeyResult = ['campaignId', 'totalPrice', 'totalTax', 'totalTaxDeduction', 'totalChargeablePriceWithTaxAndDeduction', 'subCampaigns']
    test('1 - getCart without auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/campaign/getCart?campaignId=372');
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - getCart with auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/campaign/getCart?campaignId=372', { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
    });
});
