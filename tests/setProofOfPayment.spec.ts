import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint campaign setProofOfPayment', () => {
    const auth = process.env.AUTH!
    const param = { 'campaignId': 551, 'bankId': 55, 'bankAccNumber': '12345678', 'proofOfPaymentImageLinkKey': 'shutterstock_1451974007-leff21pz.jpg' }
    const expectKeyResult = []
    test('1 - setProofOfPayment without auth', async ({ request }) => {
        const Issues = await request.put('https://api.estidar.com/api/v1/campaign/setProofOfPayment?platformSource=ICE_WEBSITE', { data: param });
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - setProofOfPayment with auth', async ({ request }) => {
        const Issues = await request.put('https://api.estidar.com/api/v1/campaign/setProofOfPayment?platformSource=ICE_WEBSITE', { data: param, headers: { Authorization: `Bearer ${auth}`, } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
    });
});
