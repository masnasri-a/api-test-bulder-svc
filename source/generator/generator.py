def generate_node(data:dict):
    file = open("tests/"+data.get('test_name')+".spec.ts","a+")
    file.write('import { test, expect } from "@playwright/test";')
    file.write('\n')
    if data.get('function_type'):
        file.write('export default function createTests() {')
        file.write('\n')
    file.write("test.describe.configure({ mode: 'serial' });")
    file.write('\n')
    file.write("test.describe('test endpoint "+data.get('prefix_name')+" "+data.get('test_name')+"', () => {")
    file.write('\n')  
    file.write('const auth = process.env.AUTH!')  
    file.write('\n')
    if data.get('method') != "get" or data.get('method') != "delete":
        file.write('const param = '+str(data.get('param')))  
    file.write('\n')  
    file.write('const expectKeyResult = '+str(data.get('expectKeyResult')))  
    file.write('\n')  
    file.write("test('1 - "+data.get('test_name')+" without auth', async ({ request }) => {")
    file.write('\n')
    if data.get('method') == "get":
        file.write("const Issues = await request.get('"+data.get('endpoint')+"');")  
    if data.get('method') == "post":
        file.write("const Issues = await request.post('"+data.get('endpoint')+"', {data: param});")  
    if data.get('method') == "put":
        file.write("const Issues = await request.put('"+data.get('endpoint')+"', {data: param});")  
    if data.get('method') == "delete":
        file.write("const Issues = await request.delete('"+data.get('endpoint')+"');")  
    file.write('\n')  
    file.write('expect.soft(Issues.status()).toBe(401);')  
    file.write('\n')  
    file.write('});')  
    file.write('\n')  
    file.write('\n') 
    file.write("test('2 - "+data.get('test_name')+" with auth', async ({ request }) => {")
    file.write('\n')
    if data.get('method') == "get":
        file.write("const Issues = await request.get('"+data.get('endpoint')+"',{headers:{Authorization: `Bearer ${auth}`}});")  
    if data.get('method') == "post":
        file.write("const Issues = await request.post('"+data.get('endpoint')+"', {data: param,headers:{Authorization: `Bearer ${auth}`,}});")  
    if data.get('method') == "put":
        file.write("const Issues = await request.put('"+data.get('endpoint')+"', {data: param,headers:{Authorization: `Bearer ${auth}`,}});")  
    if data.get('method') == "delete":
        file.write("const Issues = await request.delete('"+data.get('endpoint')+"',{headers:{Authorization: `Bearer ${auth}`}});")  
    file.write('\n')  
    file.write('expect.soft(Issues.ok()).toBeTruthy();')  
    file.write('\n')  
    file.write('expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);')  
    file.write('\n')  
    file.write('});')   
    file.write('});')  
    if data.get('function_type'):
        file.write('}')  
    file.write('\n')  
    print(data)
    pass