from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

fake_users_db = {
    "test@datagenie.ai": {
        "email": "test@datagenie.ai",
        "password": "password123"
    }
}

class User(BaseModel):
    email: str
    password: str

@app.post("/token")
async def login(user: User):
    if user.email not in fake_users_db or user.password != fake_users_db[user.email]["password"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    return {"access_token": "fake-jwt-token", "token_type": "bearer"}

@app.get("/protected")
async def protected_route(token: str = Depends(oauth2_scheme)):
    return {"message": "This is a protected route"}

@app.get("/posts")
async def get_posts():
    return [
        {"id": 1, "title": "First Memory", "image_url": "https://picsum.photos/200/300"},
        {"id": 2, "title": "Vacation", "image_url": "https://picsum.photos/200/301"},
        {"id": 3, "title": "Family Dinner", "image_url": "https://picsum.photos/200/302"}
    ]