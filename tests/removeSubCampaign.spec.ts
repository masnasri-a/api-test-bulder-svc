import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint campaign removeSubCampaign', () => {
const auth = process.env.AUTH!
const param = {'campaignId': 539, 'serviceId': 18, 'isSubServiceSelected': False, 'subServiceId': None, 'quantity': 1}
const expectKeyResult = []
test('1 - removeSubCampaign without auth', async ({ request }) => {
const Issues = await request.delete('https://api.estidar.com/api/v1/campaign/removeSubCampaign?subCampaignId=367');
expect.soft(Issues.status()).toBe(401);
});

test('2 - removeSubCampaign with auth', async ({ request }) => {
const Issues = await request.delete('https://api.estidar.com/api/v1/campaign/removeSubCampaign?subCampaignId=367',{headers:{Authorization: `Bearer ${auth}`}});
expect.soft(Issues.ok()).toBeTruthy();
expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
});});
