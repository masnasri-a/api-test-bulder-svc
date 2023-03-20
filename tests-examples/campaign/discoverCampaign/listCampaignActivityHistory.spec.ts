import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint campaign listCampaignActivityHistory', () => {
    const auth = process.env.AUTH!

    test('1 - listCampaignActivityHistory without auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/campaign/listCampaignActivityHistory?campaignId=96');
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - listCampaignActivityHistory with auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/campaign/listCampaignActivityHistory?campaignId=96', { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
    });
});
