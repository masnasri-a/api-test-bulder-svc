import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint campaign listCampaigns', () => {
    const auth = process.env.AUTH!

    const expectKeyResult = ['totalResults', 'pageSize', 'currentPage', 'campaigns']
    test('1 - listCampaigns without auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/campaign/listCampaigns?page=1&pageSize=10');
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - listCampaigns with auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/campaign/listCampaigns?page=1&pageSize=10', { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
    });
});
