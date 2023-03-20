from pydantic import BaseModel, Field
from typing import Optional, Union
from enum import Enum

class Method(str, Enum):
    get='get'
    post='post' 
    put='put'
    delete='delete'

class ResponseType(str, Enum):
    json='json'
    string='str'

class Base(BaseModel):
    function_type:bool
    endpoint:str = Field(..., example="https://api.estidar.com/api/v1/chats/getRoomInfo")
    method:Method
    response_type:ResponseType
    param:Optional[Union[str, dict]] = Field(..., description="param or body")
    expectSuccess: Union[str, dict] = Field(..., example='{"businessUserId":0,"businessPartnerId":0,"name":"Tokopedia","email":"tokopedia@tokopedia.com"}')
    