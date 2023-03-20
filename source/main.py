from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from route import generator
import uvicorn

app = FastAPI()

@app.get('/', include_in_schema=False)
def redirect():
    return RedirectResponse('/docs')


app.include_router(generator.app, prefix="/generate", tags=['gen'])
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=9100, reload=True)