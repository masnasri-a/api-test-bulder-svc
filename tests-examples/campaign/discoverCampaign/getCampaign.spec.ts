import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint campaign getCampaign', () => {
const auth = process.env.AUTH!

const expectKeyResult = ['campaignId', 'createdByUserId', 'createdByUserType', 'forBusinessUserId', 'forBusinessUserName', 'title', 'productName', 'campaignImageLink', 'campaignImageLinkKey', 'description', 'objective', 'referenceLink', 'startTimeInMillis', 'endTimeInMillis', 'createdTimeInMillis', 'totalPrice', 'totalTax', 'totalTaxDeduction', 'totalChargeablePriceWithTaxAndDeduction', 'invoiceNumber', 'orderNumber', 'proofOfPaymentFileLink', 'proofOfPaymentFileLinkKey', 'proofOfPaymentBankName', 'proofOfPaymentBankAccNumber', 'isProofOfPaymentValid', 'proofOfPaymentRejectionReason', 'proofOfPaymentUpdateTimeInMillis', 'status', 'rejectionReason', 'categories', 'productFileLinks', 'subCampaigns', 'createdByUserName']
test('1 - getCampaign without auth', async ({ request }) => {
const Issues = await request.get('https://api.estidar.com/api/v1/campaign/getCampaign?campaignId=372');
expect.soft(Issues.status()).toBe(401);
});

test('2 - getCampaign with auth', async ({ request }) => {
const Issues = await request.get('https://api.estidar.com/api/v1/campaign/getCampaign?campaignId=372',{headers:{Authorization: `Bearer ${auth}`}});
expect.soft(Issues.ok()).toBeTruthy();
expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
});});
