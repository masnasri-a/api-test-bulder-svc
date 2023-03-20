import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint util generatePublicUploadUrl', () => {
const auth = process.env.AUTH!
const param = {'fileKey': 'assets/image.png', 'contentType': 'image/jpeg'}
test('1 - generatePublicUploadUrl without auth', async ({ request }) => {
const Issues = await request.post('https://api.estidar.com/api/v1/util/generatePublicUploadUrl', {data: param});
expect.soft(Issues.status()).toBe(200);
});

test('2 - generatePublicUploadUrl with auth', async ({ request }) => {
const Issues = await request.post('https://api.estidar.com/api/v1/util/generatePublicUploadUrl', {data: param,headers:{Authorization: `Bearer ${auth}`,}});
expect.soft(Issues.ok()).toBeTruthy();
});});
