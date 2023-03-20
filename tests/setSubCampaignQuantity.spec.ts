import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint campaign setSubCampaignQuantity', () => {
    const auth = process.env.AUTH!
    const param = { 'campaignId': 539, 'serviceId': 18, 'isSubServiceSelected': False, 'subServiceId': None, 'quantity': 1 }
    const expectKeyResult = []
    test('1 - setSubCampaignQuantity without auth', async ({ request }) => {
        const Issues = await request.put('https://api.estidar.com/api/v1/campaign/setSubCampaignQuantity?subCampaignId=3659&quantity=5', { data: param });
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - setSubCampaignQuantity with auth', async ({ request }) => {
        const Issues = await request.put('https://api.estidar.com/api/v1/campaign/setSubCampaignQuantity?subCampaignId=3659&quantity=5', { data: param, headers: { Authorization: `Bearer ${auth}`, } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
    });
});
