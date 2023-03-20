import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
let campaignId;
let listSubCampaign: any[] = []
test.describe('test endpoint campaign createCampaign', async () => {
    const auth = process.env.AUTH!
    const publics = process.env.PUBLIC!
    let param = { 'title': 'Test Campaign Nasri', 'productName': 'Test Product', 'categoryIds': ['9'], 'campaignImageLinkKey': 'Logo-lf1gn6o2.png', 'productFileLinkKeys': ['Logo-lf1gnnty.png'], 'description': 'Desc', 'objective': 'obj', 'referenceLink': 'ice.id', 'startTimeInMillis': 1696877325000, 'endTimeInMillis': 1697136525000 }
    const expectKeyResult = ['campaignId', 'createdByUserId', 'createdByUserType', 'createdByUserName', 'forBusinessUserId', 'forBusinessUserName', 'title', 'productName', 'campaignImageLink', 'campaignImageLinkKey', 'description', 'objective', 'referenceLink', 'startTimeInMillis', 'endTimeInMillis', 'createdTimeInMillis', 'totalPrice', 'totalTax', 'totalTaxDeduction', 'totalChargeablePriceWithTaxAndDeduction', 'invoiceNumber', 'orderNumber', 'proofOfPaymentFileLink', 'proofOfPaymentFileLinkKey', 'proofOfPaymentBankName', 'proofOfPaymentBankAccNumber', 'isProofOfPaymentValid', 'proofOfPaymentRejectionReason', 'proofOfPaymentUpdateTimeInMillis', 'status', 'rejectionReason', 'categories', 'productFileLinks', 'subCampaigns']
    test('1 - createCampaign without auth', async ({ request }) => {
        const Issues = await request.post('https://api.estidar.com/api/v1/campaign/createCampaign', { data: param });
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - createCampaign with auth', async ({ request }) => {
        const Issues = await request.post('https://api.estidar.com/api/v1/campaign/createCampaign', { data: param, headers: { Authorization: `Bearer ${auth}`, } });
        expect.soft(Issues.ok()).toBeTruthy();
        const jsonFile = await Issues.json()
        expect.soft(Object.keys(jsonFile)).toEqual(expectKeyResult);
        campaignId = jsonFile.campaignId
        console.log(campaignId);

    });

    test('1 - addSubCampaign without auth', async ({ request }) => {
        const paramAddCampaign = { 'campaignId': campaignId, 'serviceId': 63, 'isSubServiceSelected': false, 'subServiceId': null, 'quantity': 1 }

        const Issues = await request.post('https://api.estidar.com/api/v1/campaign/addSubCampaign', { data: paramAddCampaign });
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - addSubCampaign with auth', async ({ request }) => {
        const paramAddCampaign = { 'campaignId': await campaignId, 'serviceId': 63, 'isSubServiceSelected': false, 'subServiceId': null, 'quantity': 1 }
        const Issues = await request.post('https://api.estidar.com/api/v1/campaign/addSubCampaign', { data: paramAddCampaign, headers: { Authorization: `Bearer ${auth}`, } });
        expect.soft(Issues.ok()).toBeTruthy();
    });
    test('3 - addSubCampaign with auth', async ({ request }) => {
        const paramAddCampaign = { 'campaignId': campaignId, 'serviceId': 63, 'isSubServiceSelected': false, 'subServiceId': null, 'quantity': 1 }
        paramAddCampaign.serviceId = 110
        const Issues = await request.post('https://api.estidar.com/api/v1/campaign/addSubCampaign', { data: paramAddCampaign, headers: { Authorization: `Bearer ${auth}`, } });
        expect.soft(Issues.ok()).toBeTruthy();
    });

    test('4 - addSubCampaign with auth', async ({ request }) => {
        const paramAddCampaign = { 'campaignId': campaignId, 'serviceId': 63, 'isSubServiceSelected': false, 'subServiceId': null, 'quantity': 1 }
        paramAddCampaign.serviceId = 129
        const Issues = await request.post('https://api.estidar.com/api/v1/campaign/addSubCampaign', { data: paramAddCampaign, headers: { Authorization: `Bearer ${auth}`, } });
        expect.soft(Issues.ok()).toBeTruthy();
    });

    test('5 - getSubCampaign with auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/campaign/getCampaign?campaignId=' + await campaignId, { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
        const subCampaigns = await Issues.json()
        subCampaigns['subCampaigns'].map((detail: Object, index: number) => {
            const subs = detail['subCampaignId']
            listSubCampaign.push(subs)
        })
    });

    test('1 - removeSubCampaign without auth', async ({ request }) => {
        const Issues = await request.delete('https://api.estidar.com/api/v1/campaign/removeSubCampaign?subCampaignId=367');
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - removeSubCampaign with auth', async ({ request }) => {
        const Issues = await request.delete('https://api.estidar.com/api/v1/campaign/removeSubCampaign?subCampaignId=' + await listSubCampaign[2], { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
    });

    test('1 - setSubCampaignQuantity without auth', async ({ request }) => {
        const Issues = await request.put('https://api.estidar.com/api/v1/campaign/setSubCampaignQuantity?subCampaignId=3659&quantity=5', { data: param });
        expect.soft(Issues.status()).toBe(401);
    });

    // test('2 - setSubCampaignQuantity with auth', async ({ request }) => {
    //     const Issues = await request.put('https://api.estidar.com/api/v1/campaign/setSubCampaignQuantity?subCampaignId=' + await listSubCampaign[0] + '&quantity=2', { data: param, headers: { Authorization: `Bearer ${auth}`, } });
    //     expect.soft(Issues.ok()).toBeTruthy();
    // });

    test('1 - updateCampaign without auth', async ({ request }) => {
        const params = { 'campaignId': 277, 'title': 'Test Updated Campaign', 'productName': 'Name of the product - updated', 'categoryIds': [2], 'description': 'This is the description of this campaign. - updated', 'objective': 'This is the objective of this campaign. - updated', 'referenceLink': 'https://example.com/refLink', 'startTimeInMillis': 1702998120000, 'endTimeInMillis': 1703170920000 }
        const Issues = await request.put('https://api.estidar.com/api/v1/campaign/updateCampaign', { data: params });
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - updateCampaign with auth', async ({ request }) => {
        const params = { 'campaignId': await campaignId, 'title': 'Test Updated Campaign', 'productName': 'Name of the product - updated', 'categoryIds': [2], 'description': 'This is the description of this campaign. - updated', 'objective': 'This is the objective of this campaign. - updated', 'referenceLink': 'https://example.com/refLink', 'startTimeInMillis': 1702998120000, 'endTimeInMillis': 1703170920000 }
        const expectKeyResults = ['campaignId', 'createdByUserId', 'createdByUserType', 'createdByUserName', 'forBusinessUserId', 'forBusinessUserName', 'title', 'productName', 'campaignImageLink', 'campaignImageLinkKey', 'description', 'objective', 'referenceLink', 'startTimeInMillis', 'endTimeInMillis', 'createdTimeInMillis', 'totalPrice', 'totalTax', 'totalTaxDeduction', 'totalChargeablePriceWithTaxAndDeduction', 'invoiceNumber', 'orderNumber', 'proofOfPaymentFileLink', 'proofOfPaymentFileLinkKey', 'proofOfPaymentBankName', 'proofOfPaymentBankAccNumber', 'isProofOfPaymentValid', 'proofOfPaymentRejectionReason', 'proofOfPaymentUpdateTimeInMillis', 'status', 'rejectionReason', 'categories', 'productFileLinks', 'subCampaigns']
        const Issues = await request.put('https://api.estidar.com/api/v1/campaign/updateCampaign', { data: params, headers: { Authorization: `Bearer ${auth}`, } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResults);
    });

    test('2 - setNonUpFrontPayment with auth', async ({ request }) => {
        const expectKeyResults = ['campaignId', 'status']
        const Issues = await request.put('https://api.estidar.com/api/v1/campaign/setNonUpFrontPayment?campaignId=' + await campaignId);
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResults);
    });

    test('2 - setProofOfPayment with auth', async ({ request }) => {
        const params = { 'campaignId': await campaignId, 'bankId': 55, 'bankAccNumber': '12345678', 'proofOfPaymentImageLinkKey': 'shutterstock_1451974007-leff21pz.jpg' }
        const Issues = await request.put('https://api.estidar.com/api/v1/campaign/setProofOfPayment?platformSource=ICE_WEBSITE', { data: params, headers: { Authorization: `Bearer ${auth}`, } });
        expect.soft(Issues.ok()).toBeTruthy();
    });


    test(`2 - verify proof of payment`, async ({ request }) => {
        const urls = `https://internal-api.estidar.com/api/v1/campaign/verifyProofOfPayment?campaignId=${await campaignId}&isPaymentProofValid=true&rejectionReason=`
        const newIssue = await request.put(urls, { headers: { 'auth-token': publics, }, })
        console.log(newIssue.status());
        expect.soft(newIssue.ok()).toBeTruthy()
    })
    test(`2 - confirm subcampaign by influencer`, async ({ request }) => {
        const urls = `https://internal-api.estidar.com/api/v1/campaign/confirmSubCampaign?subCampaignId=${await listSubCampaign[0]}&isConfirmed=true`
        const newIssue = await request.put(urls
            , { headers: { 'auth-token': publics, }, })
        console.log(newIssue.status());
        expect.soft(newIssue.ok()).toBeTruthy()
    })

    test(`3 - confirm subcampaign by influencer`, async ({ request }) => {
        const newIssue = await request.put(`https://internal-api.estidar.com/api/v1/campaign/confirmSubCampaign?subCampaignId=${await listSubCampaign[1]}&isConfirmed=true`, { headers: { 'auth-token': publics } })
        expect.soft(newIssue.ok()).toBeTruthy()
    })

    test(`2 - set content`, async ({ request }) => {
        const newIssue = await request.post(`https://internal-api.estidar.com/api/v1/campaign/setContent?subCampaignId=${await listSubCampaign[0]}`, { headers: { 'auth-token': publics, }, data: ['SUBCAMPAIGN/471/DRAFT/1678735275262-nanas_whatsapp_logo_with_cat_studio_ghibli_comic_832eb1fc-3a9a-4afa-928b-af0d2236602a.png',], })
        expect.soft(newIssue.ok()).toBeTruthy()
    })

    test(`3 - set content`, async ({ request }) => {
        const newIssue = await request.post(`https://internal-api.estidar.com/api/v1/campaign/setContent?subCampaignId=${await listSubCampaign[1]}`, { headers: { 'auth-token': publics, }, data: ['SUBCAMPAIGN/471/DRAFT/1678735275262-nanas_whatsapp_logo_with_cat_studio_ghibli_comic_832eb1fc-3a9a-4afa-928b-af0d2236602a.png',], })
        expect.soft(newIssue.ok()).toBeTruthy()
    })

    test(`2 - verify content by influencer`, async ({ request }) => {
        const newIssue = await request.put(`https://api.estidar.com/api/v1/campaign/verifyContent?platformSource=ICE_WEBSITE&subCampaignId=${await listSubCampaign[0]}&isContentValid=true&rejectionReason=`, { headers: { Authorization: `Bearer ${auth}` } })
        expect.soft(newIssue.ok()).toBeTruthy()
    })
    test(`3 - verify content by influencer`, async ({ request }) => {
        const newIssue = await request.put(`https://api.estidar.com/api/v1/campaign//verifyContent?platformSource=ICE_WEBSITE&subCampaignId=${await listSubCampaign[1]}&isContentValid=true&rejectionReason=`, { headers: { Authorization: `Bearer ${auth}` } })
        expect.soft(newIssue.ok()).toBeTruthy()
    })

    test(`2 - set proof of post}`, async ({ request }) => {
        const newIssue = await request.post(`https://internal-api.estidar.com/api/v1/campaign/setProofOfPost?subCampaignId=${await listSubCampaign[0]}`, { headers: { 'auth-token': publics, }, data: ['SUBCAMPAIGN/471/DRAFT/1678735275262-nanas_whatsapp_logo_with_cat_studio_ghibli_comic_832eb1fc-3a9a-4afa-928b-af0d2236602a.png',], })
        expect.soft(newIssue.ok()).toBeTruthy()
    })
    test(`3 - set proof of post}`, async ({ request }) => {
        const newIssue = await request.post(`https://internal-api.estidar.com/api/v1/campaign/setProofOfPost?subCampaignId=${await listSubCampaign[1]}`, { headers: { 'auth-token': publics, }, data: ['SUBCAMPAIGN/471/DRAFT/1678735275262-nanas_whatsapp_logo_with_cat_studio_ghibli_comic_832eb1fc-3a9a-4afa-928b-af0d2236602a.png',], })
        expect.soft(newIssue.ok()).toBeTruthy()
    })
    test(`2 - verify proof of post`, async ({ request }) => {
        const newIssue = await request.put(
            `https://api.estidar.com/api/v1/campaign/verifyProofOfPost?platformSource=ICE_WEBSITE&subCampaignId=${await listSubCampaign[0]}&isProofOfPostValid=true&rejectionReason=`,
            { headers: { Authorization: `Bearer ${auth}`, }, }
        )
        expect.soft(newIssue.ok()).toBeTruthy()
    })
    test(`3 - verify proof of post`, async ({ request }) => {
        const newIssue = await request.put(
            `https://api.estidar.com/api/v1/campaign/verifyProofOfPost?platformSource=ICE_WEBSITE&subCampaignId=${await listSubCampaign[1]}&isProofOfPostValid=true&rejectionReason=`,
            { headers: { Authorization: `Bearer ${auth}`, }, }
        )
        expect.soft(newIssue.ok()).toBeTruthy()
    })
    test(`2 - set proof of insight`, async ({ request }) => {
        const newIssue = await request.post(`https://internal-api.estidar.com/api/v1/campaign/setProofOfInsight?subCampaignId=${await listSubCampaign[0]}`, { headers: { 'auth-token': publics, }, data: ['SUBCAMPAIGN/474/INSIGHT/1678736270855-bg.png',], })
        expect.soft(newIssue.ok()).toBeTruthy()
    })
    test(`3 - set proof of insight`, async ({ request }) => {
        const newIssue = await request.post(`https://internal-api.estidar.com/api/v1/campaign/setProofOfInsight?subCampaignId=${await listSubCampaign[1]}`, { headers: { 'auth-token': publics, }, data: ['SUBCAMPAIGN/474/INSIGHT/1678736270855-bg.png',], })
        expect.soft(newIssue.ok()).toBeTruthy()
    })
    test(`2 - verify proof of insight`, async ({ request }) => {
        const newIssue = await request.put(`https://api.estidar.com/api/v1/campaign/verifyProofOfInsight?platformSource=ICE_WEBSITE&subCampaignId=${await listSubCampaign[0]}&isProofOfInsightValid=true&rejectionReason=`, { headers: { Authorization: `Bearer ${auth}`, }, })
        expect.soft(newIssue.ok()).toBeTruthy()
    })
    test(`3 - verify proof of insight`, async ({ request }) => {
        const newIssue = await request.put(`https://api.estidar.com/api/v1/campaign/verifyProofOfInsight?platformSource=ICE_WEBSITE&subCampaignId=${await listSubCampaign[1]}&isProofOfInsightValid=true&rejectionReason=`, { headers: { Authorization: `Bearer ${auth}`, }, })
        expect.soft(newIssue.ok()).toBeTruthy()
    })
});
