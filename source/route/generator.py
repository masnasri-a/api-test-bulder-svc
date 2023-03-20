from fastapi import APIRouter
from model import base
from fastapi.responses import FileResponse
from generator.generator import generate_node
import json, os
app = APIRouter()

@app.post('/generate_base')
def generate_base(model:base.Base):
    data = {}
    endpoint = model.endpoint
    endpoint_only = endpoint.split('?')
    endpoint_split = endpoint_only[0].split('/')
    test_name = endpoint_split[-1]
    prefix_name = endpoint_split[-2]
    data['endpoint'] = endpoint
    data['test_name'] = test_name
    data['prefix_name'] = prefix_name
    method = model.method
    data['method'] = method.name
    param = model.param
    data['param'] = param
    expectKey = model.expectSuccess
    listExpectTrue = []
    if isinstance(data, str):
        json_data = json.loads(expectKey)
        listExpectTrue = list(json_data.keys())
    else:
        listExpectTrue = list(expectKey.keys())
    data['expectKeyResult'] = listExpectTrue
    data['function_type'] = model.function_type
    print(data)
    if os.path.exists("tests/"+data.get('test_name')+".spec.ts"):
        os.remove("tests/"+data.get('test_name')+".spec.ts")
    generate_node(data)
    return FileResponse("tests/"+data.get('test_name')+".spec.ts",media_type="application/octet-stream", filename=data.get('test_name')+".spec.ts")