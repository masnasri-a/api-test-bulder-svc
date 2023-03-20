import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint campaign listSubCampaignActivityHistory', () => {
    const auth = process.env.AUTH!
    test('1 - listSubCampaignActivityHistory without auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/campaign/listSubCampaignActivityHistory?subCampaignId=474');
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - listSubCampaignActivityHistory with auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/campaign/listSubCampaignActivityHistory?subCampaignId=474', { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
    });
});
